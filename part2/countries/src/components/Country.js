import React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
export const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${apiKey}&units=metric`
    axios.get(url).then((response) => {
      setWeather(response.data)
    })
  }, [])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>
        capital {country.capital[0]}
        <br />
        area {country.area}
      </p>
      <strong>languages:</strong>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
      {!weather ? null : (
        <div>
          <h2>Weather in {country.name.common}</h2>
          <div>temperature {weather.main.temp} Celcius</div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
          <div>wind {weather.wind.speed} m/s</div>
        </div>
      )}
    </div>
  )
}
