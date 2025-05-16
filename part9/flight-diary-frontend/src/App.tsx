import { useState, useEffect } from "react";
import type { DiaryEntry } from "./types";
import { getAllEntries } from "./diaryService";
import { NewEntry } from "./newEntry";

const App = () => {

  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllEntries().then(data=>{
      setDiaries(data)
    })
  }, [])

  return (
    <div>
      <NewEntry diaries={diaries} setDiaries={setDiaries}/>
      <h2>Diary entries:</h2>
      {diaries.map(diary => 
        <ul key={diary.id}>
          <h3>Date: {diary.date}</h3>
          <p>Weather: {diary.weather}
          <br></br>Visibility: {diary.visibility}
          <br></br>Comment: {diary.comment}</p>
        </ul>
      )}
    </div>
  );
};

export default App;