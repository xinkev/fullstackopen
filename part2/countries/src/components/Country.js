import React from "react"

export const Country = ({ country }) => {
  console.log(country)
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
    </div>
  )
}
