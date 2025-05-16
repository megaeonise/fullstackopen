import { useState, useEffect } from "react";
import type { DiaryEntry } from "./types";
import { createEntry } from "./diaryService";
import axios from "axios";

export const NewEntry = ({diaries, setDiaries} : {diaries: DiaryEntry[], setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>}) => {
    const [date, setDate] = useState<string>('')
    const [weather, setWeather] = useState<string>('')
    const [visibility, setVisibility] = useState<string>('')
    const [comment, setComment] = useState<string>('')
    const [error, setError] = useState<string>('')
    const today = new Date().toISOString().split('T', 1)[0]
    useEffect(()=>{
        setDate(today)
    }, [])
    
    // const [newDiary, setNewDiary] = useState<NewDiaryEntry>({date: date, weather: weather, visibility: visibility, comment: comment});
    const entryCreation = (event: React.SyntheticEvent) => {
        event.preventDefault()
        if(date!== ''){
            // setNewDiary({date: date, weather: weather, visibility: visibility, comment: comment})
            createEntry({date: date, weather: weather, visibility: visibility, comment: comment}).then(data=>{
                setDiaries(diaries.concat({...data, id: diaries.length+1}))
            }).catch((error: unknown)=>{
                if (axios.isAxiosError(error)) {
                    const errorMessage = error.response
                    console.log(error)
                    setError(errorMessage?.data)
                }
                setTimeout(()=>{
                    setError('')
                }, 2000)
            })
            setDate(today)
            setComment('')
            // setNewDiary({date: '', weather: '', visibility: '', comment: ''})
        }
        else{
            window.alert("Cannot submit empty entry")
        }
    }

    return (
        <form onSubmit={entryCreation}>
            <h2>Add new entry</h2>
            <h3 style={{color: "red"}}>{error}</h3>
            <p>date: &nbsp;<input type="date" value={date} onChange={(event)=>setDate(event.target.value)}></input></p>
            <p>visibility: &nbsp;                
                great<input type="radio" name="visibility" onChange={()=>setVisibility('great')}></input>
                &nbsp;  good<input type="radio" name="visibility" onChange={()=>setVisibility('good')}></input>
                &nbsp;  ok<input type="radio" name="visibility" onChange={()=>setVisibility('ok')}></input>
                &nbsp;  poor<input type="radio" name="visibility" onChange={()=>setVisibility('poor')}></input>
            </p>
            <p>weather:  &nbsp;
                sunny<input type="radio" name="weather" onChange={()=>setWeather('sunny')}></input>
                &nbsp;  rainy<input type="radio" name="weather" onChange={()=>setWeather('rainy')}></input>
                &nbsp;  cloudy<input type="radio" name="weather" onChange={()=>setWeather('cloudy')}></input>
                &nbsp;  stormy<input type="radio" name="weather" onChange={()=>setWeather('stormy')}></input>
                &nbsp;  windy<input type="radio" name="weather" onChange={()=>setWeather('windy')}></input>
            </p>
            <p>comment: &nbsp;<input value={comment} onChange={(event)=>setComment(event.target.value)}></input></p>
            <button>add</button>
        </form>
    )
}