import { useState, useEffect } from "react"
import { Countries } from "./components/Countries"
import axios from "axios"

const App = () => {
  const [query, setQuery] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get(
        "https://restcountries.com/v3.1/all?fields=name,flags,area,capital,languages,latlng"
      )
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  const handleQueryChange = (e) => {
    setQuery(e.target.value)
  }

  const filteredCountries = () => {
    return countries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    )
  }

  return (
    <div className="App">
      <div>
        find countries <input value={query} onChange={handleQueryChange} />
        <Countries
          countries={filteredCountries()}
          onClickShow={setQuery}
        />
      </div>
    </div>
  )
}

export default App
