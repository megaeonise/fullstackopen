import Entry from "./Entry"

const Display = (props) => {
    const includesFilter = (country) => {
        return country.name.common.toLowerCase().includes(props.filter.toLowerCase())
    }
    const countries = props.countries.filter(includesFilter)
    

    if(countries.length>10){
        return <p>Too many matches, specify another filter</p>
    }
    else if(countries.length===1){
        return countries.map(country=> <Entry key={country.altSpellings[0]} flag={country.flags} 
            languages={country.languages} name={country.name.common} capital={country.capital} 
            area={country.area} lat={country.capitalInfo.latlng[0]} lng={country.capitalInfo.latlng[1]}/>)
    }
    else {
        return countries.map(country=> <p key={country.altSpellings[0]}>{country.name.common} <button onClick={() => props.handleShow(country)}>Show</button></p>)
    }
}
export default Display