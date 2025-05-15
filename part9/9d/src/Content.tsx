import { assertNever } from "./helpers"
import { type CoursePart } from "./types"

const Part = ({courseParts}: {courseParts : CoursePart []}) => {
    return (<>
    {courseParts.map((part)=>{
      switch (part.kind) {
        case "basic":
          return (
          <div key={part.name}>
          <BasePart part={part} />
          <p><i>{part.description}</i></p>
          </div>
        )
        case "group":
          return (
          <div key={part.name}>
          <BasePart part={part} />
          <p>group project count: {part.groupProjectCount}</p>
          </div>
        )
        case "background":
          return (
          <div key={part.name}>
          <BasePart part={part} />
          <p>see the following: <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a></p>
          </div>
        )
        case "special":
          return (
          <div key={part.name}>
          <BasePart part={part} />
          <p>required skills: {part.requirements.join(', ')}</p>
          </div>
        )
        default:
          return assertNever(part);
      }
    })}
  </>)
}

const BasePart = ({part}: {part: CoursePart}) => {
  return (
  <>
    <p key={part.name}> <b>
    {part.name} {part.exerciseCount}
    </b>
    </p>
  </>
)}

export const Content = ({courseParts}: {courseParts : CoursePart []}) => {
    return (
        <Part courseParts={courseParts} />
    )
}