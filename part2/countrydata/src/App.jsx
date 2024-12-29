import { useEffect, useState } from "react"
import axios from 'axios'
const App = () => {
  const [countries, setCountries] = useState([])
  useEffect(()=>{
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {setCountries(response.data)})
  }, [])
  console.log(countries)
  return <div>
    <h1>meow</h1>
    
    </div>
}

export default App