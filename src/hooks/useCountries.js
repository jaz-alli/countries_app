import { useState, useEffect } from "react"

const BASE_URL = "https://restcountries.com/v3.1"
const fields = [
	"name",
	"flags",
	"population",
	"region",
	"languages",
	"currencies",
	"capital",
	"timezones",
	"area",
]

const useCountries = () => {
	const [countries, setCountries] = useState([])
	const [error, setError] = useState(null)

	useEffect(() => {
		fetchCountries()
	}, [])

	const fetchCountries = async () => {
		try {
			const response = await fetch(`${BASE_URL}/all?fields=${fields.join(",")}`)
			if (!response.ok) throw new Error("Failed to fetch countries")
			const data = await response.json()
			setCountries(data)
		} catch (error) {
			setError(error.message)
		}
	}

	return { countries, error }
}

export default useCountries
