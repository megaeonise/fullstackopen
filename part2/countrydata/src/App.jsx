import { useEffect, useState } from "react"
import axios from 'axios'
import Display from "./components/Display"
const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  useEffect(()=>{
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {setCountries(response.data)})
  }, [])


  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
  return <div>
    <div> find countries <input value={filter} onChange={handleFilter}/> </div>
    <Display countries={countries} filter={filter}/>
    
    </div>
}

export default App