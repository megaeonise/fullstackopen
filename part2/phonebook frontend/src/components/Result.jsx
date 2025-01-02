import Entry from './Entry'

const Result = ( props ) => {
    const includesQuery = (person) => {
      return person.name.toLowerCase().includes(props.query.toLowerCase()) 
    }
    if(props.query===''){
      return props.persons.map(person=> <Entry key={person.id} name={person.name} number={person.number} id={person.id} handleRemove={props.handleRemove}/>)
    }
    else{
      return props.persons.filter(includesQuery).map(person=> <Entry key={person.id} name={person.name} number={person.number} id={person.id} handleRemove={props.handleRemove}/>)
    }
    

}

export default Result
