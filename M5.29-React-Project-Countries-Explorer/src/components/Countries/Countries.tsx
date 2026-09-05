import { use, useState } from "react"
import type CountryType from "../../Type"
import Country from "../Country/Country";
import './Countries.css'

export interface CountriesProps {
    countriesPromise: Promise<CountryType[]>
}

export default function Countries({ countriesPromise }: CountriesProps) {

    const countreis = use(countriesPromise);
    const [visitedCountries, setVisitedCountrioes] = useState<CountryType[]>([])

    const handleVisitedCountry = (country: CountryType): void => {

        // Bad way to check objectt/array check.
        // if (visitedCountries.includes(country)) {

        // Good way to check:
        const exists = visitedCountries.find(cnty => cnty.ccn3.ccn3 === country.ccn3.ccn3)

        if (exists) {
            const remainingCountries = visitedCountries.filter(cnty => cnty.ccn3.ccn3 !== country.ccn3.ccn3)
            
            setVisitedCountrioes(remainingCountries);
        } else {
            const newVisitedCountries = [...visitedCountries, country];
            setVisitedCountrioes(newVisitedCountries);
        }

        }

    const [visitedFlags, setVisitedFlags] = useState<string[]>([])

    const handleVisitedFlag = (flag: string): void => {
        console.log('flag visited', flag);

        if (visitedFlags.includes(flag)) {
            const remainingFlags = visitedFlags.filter(flg => flg !== flag);
            setVisitedFlags(remainingFlags)
        } else {
            const newVisitedFlags = [...visitedFlags, flag];
            setVisitedFlags(newVisitedFlags)
        }

    }

    // console.log(countreis);

    return (
        <div>
            <h2>Countries: {countreis.length}</h2>
            <h4>Visited Countries: {visitedCountries.length}</h4>
            <h4>Visited Flags: {visitedFlags.length}</h4>
            <div>
                <ul>
                    {visitedCountries.map(Country => <li key={Country.ccn3.ccn3}>{Country.name.common}</li>)}
                </ul>
            </div>
            <div className="visited-flags">
                {
                    visitedFlags.map((flag, index) => <img key={index} src={flag} alt="Visited Flag"/>)
                }
            </div>
            <div className="countries">
                {
                    countreis.map(country => <Country key={country.ccn3.ccn3} country={country} handleVisitedCountry={handleVisitedCountry} handleVisitedFlag={handleVisitedFlag} ></Country>)
                }
            </div>

        </div>
    )
}