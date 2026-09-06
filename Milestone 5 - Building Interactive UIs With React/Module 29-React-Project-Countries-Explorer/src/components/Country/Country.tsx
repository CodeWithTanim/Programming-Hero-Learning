import { useState } from "react"
import type CountryType from "../../Type"
import './Country.css'
import type { BootstrapScriptDescriptor } from "react-dom/static"

export interface CountryProps {
    country: CountryType
    handleVisitedCountry: (country: CountryType) => void, handleVisitedFlag: (flag: string) => void
}

export default function Country({ country, handleVisitedCountry, handleVisitedFlag}: CountryProps) {
    const [visited, setVisited] = useState<boolean>(false);


    const handleVisited = () => {
        // setVisited(true);

        // if (visited === true) {
        //     setVisited(false);
        // } else {
        //     setVisited(true);
        // }

        setVisited(!visited)
        handleVisitedCountry(country);
    }


    
    const countryStyle = {
        backgroundColor: visited ? 'lightgreen' : 'white'
    }

    return (
        <div className={`country ${visited ? 'country-visited': ''}`}>
            <h3>{country.name.common}</h3>
            <img src={country.flags.flags.png} alt="country.flags.flag.alt" />
            <p className={`${visited && 'population-known'}`}>Polulation: {country.population.population.toLocaleString()}</p>
            <p>Capital: {country.capital.capital.join(", ")}</p>
            <button onClick={handleVisited}>
                {visited ? 'Visited' : 'Mark as Visited'}
            </button>
            <button onClick={() => handleVisitedFlag(country.flags.flags.png)}>Add Flag as Visited</button>
        </div>
    )
}
