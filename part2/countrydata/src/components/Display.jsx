import Entry from "./Entry"

const Display = (props) => {
    const includesFilter = (country) => {
        return country.name.common.toLowerCase().includes(props.filter.toLowerCase())
    }
    const countries = props.countries.filter(includesFilter)
    
    const handleShow = (country) => {
        console.log('whats thepoint')
        return <Entry key={country.altSpellings[0]} flag={country.flags} languages={country.languages} name={country.name.common} capital={country.capital} area={country.area}/>
    }
    if(countries.length>10){
        return <p>Too many matches, specify another filter</p>
    }
    else if(countries.length===1){
        return countries.map(country=> <Entry key={country.altSpellings[0]} flag={country.flags} languages={country.languages} name={country.name.common} capital={country.capital} area={country.area}/>)
    }
    else {
        return countries.map(country=> <p key={country.altSpellings[0]}>{country.name.common} <button onClick={() => handleShow(country)}>Show</button></p>)
    }
}
export default Display