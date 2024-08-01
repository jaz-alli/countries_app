import React from "react"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import { IconButton, Box } from "@chakra-ui/react"
import { StarIcon } from "@chakra-ui/icons"

function CountryList({
	filteredCountries,
	favourites,
	handleFavouritesClick,
	setSelectedCountry,
	onOpenCountryDetails,
}) {
	function FavouritesCell(params) {
		return (
			<Box>
				<IconButton
					as={StarIcon}
					variant="unstyled"
					color={favourites.includes(params.data.name.common) ? "teal" : "gray"}
					size="xs"
					cursor="pointer"
					onClick={() => {
						handleFavouritesClick(params.data.name.common)
					}}
				/>
			</Box>
		)
	}

	function FlagCell(params) {
		return (
			<Box marginTop="5px">
				<img src={params.value} alt={params.data.flags.alt} width="30px" />
			</Box>
		)
	}

	function showCountryDetails(params) {
		setSelectedCountry(params.data)
		onOpenCountryDetails()
	}

	const columnDefs = [
		{
			width: 50,
			cellRenderer: FavouritesCell,
		},
		{
			headerName: "Name",
			field: "name.common",
			flex: 1,
			minWidth: 200,
			filter: true,
			onCellClicked: (params) => {
				showCountryDetails(params)
			},
			cellStyle: { cursor: "pointer" },
		},
		{
			headerName: "Population",
			field: "population",
			flex: 1,
			minWidth: 200,
			filter: true,
			valueFormatter: (params) => params.value.toLocaleString(),
			onCellClicked: (event) => {
				showCountryDetails(event)
			},
			cellStyle: { cursor: "pointer" },
		},
		{
			headerName: "Languages",
			field: "languages",
			valueGetter: (params) =>
				Object.values(params.data.languages || {}).join(", "),
			flex: 1,
			minWidth: 200,
			filter: true,
			onCellClicked: (event) => {
				showCountryDetails(event)
			},
			cellStyle: { cursor: "pointer" },
		},
		{
			headerName: "Currencies",
			field: "currencies",
			valueGetter: (params) =>
				Object.values(params.data.currencies || {})
					.map(
						(currency) =>
							currency.name.charAt(0).toUpperCase() +
							currency.name.slice(1) +
							" (" +
							currency.symbol +
							")"
					)
					.join(", "),
			flex: 1,
			minWidth: 200,
			filter: true,
			onCellClicked: (event) => {
				showCountryDetails(event)
			},
			cellStyle: { cursor: "pointer" },
		},
		{
			headerName: "Flag",
			field: "flags.png",

			cellRenderer: FlagCell,
			onCellClicked: (event) => {
				showCountryDetails(event)
			},
			cellStyle: { cursor: "pointer" },
		},
	]

	return (
		<Box className="ag-theme-quartz" marginX="10px" height="500px">
			<AgGridReact
				columnDefs={columnDefs}
				rowData={filteredCountries}
				pagination={true}
				paginationPageSize={20}
				paginationPageSizeSelector={[20, 50, 100]}
			/>
		</Box>
	)
}

export default CountryList
