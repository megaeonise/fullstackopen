import { useState } from 'react'
import phonebookService from '../services/persons'

const Entry = (props) => {
    const [person, setPerson] = useState(props)
    const handleDelete = () => {
    if (window.confirm(`Delete ${props.name}?`)){
        return (
            phonebookService
        .remove(person.id)
        .then(setPerson(''),
        props.handleRemove(`${props.name}'s entry has been deleted`, props.name)
    )
        )
    }

}   
    if(person!==''){
    return (
        <p>
            {person.name} {person.number} <button onClick={handleDelete}>Delete</button>
        </p>
    )}
}

export default Entry