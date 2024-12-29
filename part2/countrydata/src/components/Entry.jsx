const Entry = (props) => {
    const languageList = Object.entries(props.languages)
    console.log(props.flag)
    return (
        <>
        <h1>{props.name}</h1>
        <p>capital {props.capital}</p>
        <p>area {props.area}</p>
        <h3>languages:</h3>
        <ul>
            {languageList.map(language=> <li key={language[0]}>{language[1]}</li>)}
        </ul>
        <img src={props.flag.png} alt={props.flag.alt}/>
        </>
    )
}

export default Entry