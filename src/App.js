import { useState, useEffect } from "react"
import { useDisclosure, Box, Text } from "@chakra-ui/react"
import CountryDetailsModal from "./components/CountryDetailsModal"
import CountryList from "./components/CountryList"
import MenuBar from "./components/MenuBar"
import useCountries from "./hooks/useCountries"

function App() {
	const { countries, error } = useCountries()
	const [searchTerm, setSearchTerm] = useState("")
	const [filteredCountries, setFilteredCountries] = useState([])
	const [selectedCountry, setSelectedCountry] = useState(null)
	const [showFavourites, setShowFavourites] = useState(false)

	const [favourites, setFavourites] = useState(
		JSON.parse(localStorage.getItem("favourites") || "[]")
	)

	const {
		isOpen: isOpenCountryDetails,
		onOpen: onOpenCountryDetails,
		onClose: onCloseCountryDetails,
	} = useDisclosure()

	useEffect(() => {
		if (searchTerm === "") {
			setFilteredCountries(countries)
		}
	}, [searchTerm, countries])

	useEffect(() => {
		setFilteredCountries(countries)
	}, [countries])

	useEffect(() => {
		setFilteredCountries(
			countries.filter(
				(country) =>
					country.name.common
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					Object.values(country.languages || {}).some((language) =>
						language.toLowerCase().includes(searchTerm.toLowerCase())
					) ||
					Object.values(country.currencies || {}).some((currency) =>
						currency.name.toLowerCase().includes(searchTerm.toLowerCase())
					)
			)
		)
	}, [searchTerm, countries])

	function filterFavouriteCountries() {
		if (!showFavourites) {
			setShowFavourites(true)
			setFilteredCountries(
				countries.filter((country) => favourites.includes(country.name.common))
			)
		} else {
			setShowFavourites(false)
			setFilteredCountries(countries)
		}
	}

	function handleFavouritesClick(countryName) {
		const favourites = JSON.parse(localStorage.getItem("favourites") || "[]")
		if (!favourites.includes(countryName)) {
			favourites.push(countryName)
			localStorage.setItem("favourites", JSON.stringify(favourites))
		} else {
			const index = favourites.indexOf(countryName)
			if (index > -1) {
				favourites.splice(index, 1)
				localStorage.setItem("favourites", JSON.stringify(favourites))
			}
		}
		setFavourites(favourites)
	}

	function onSearchTermChange(event) {
		setSearchTerm(event.target.value)
	}

	return (
		<Box>
			{error ? (
				<Text>There was an error loading countries.</Text>
			) : (
				<Box marginTop="48px">
					<Box marginRight="20px" marginLeft="20px" maxW="1400px" margin="auto">
						<MenuBar
							onSearchTermChange={onSearchTermChange}
							searchTerm={searchTerm}
							filterFavouriteCountries={filterFavouriteCountries}
							showFavourites={showFavourites}
						/>
						<CountryList
							filteredCountries={filteredCountries}
							favourites={favourites}
							handleFavouritesClick={handleFavouritesClick}
							setSelectedCountry={setSelectedCountry}
							onOpenCountryDetails={onOpenCountryDetails}
						/>
						{selectedCountry && (
							<CountryDetailsModal
								isOpen={isOpenCountryDetails}
								onClose={onCloseCountryDetails}
								selectedCountry={selectedCountry}
								handleFavouritesClick={handleFavouritesClick}
								favourites={favourites}
							/>
						)}
					</Box>
				</Box>
			)}
		</Box>
	)
}

export default App
