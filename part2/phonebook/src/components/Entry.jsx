import phonebookService from '../services/persons'

const Entry = (props) => {
    const handleDelete = () => {
    if (window.confirm(`Delete ${props.name}?`)){
        return (
            phonebookService
        .remove(props.id)
        .then(props.handleRemove)
        )
    }
}
    return (
        <p>
            {props.name} {props.number} <button onClick={handleDelete}>Delete</button>
        </p>
    )
}

export default Entry