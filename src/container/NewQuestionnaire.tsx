import { ChangeEvent, useState } from "react"
import marinha from "../assets/marinha.json"
import { Question } from "../component/Question"
import './questionnaire.css'

export const NewQuestionnaire = () => {
    const [questions,] = useState<Question[]>(marinha)
    const [show, setShow] = useState<boolean>(false)

    const createFile = () => {
        const blob = new Blob([JSON.stringify(questions)], {type: "application/json"});
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.download = 'questions.json'
        link.href = url
        link.click()
    }
    const handle = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("insert:", event)
    }
    return (
        <section>
            <article>
                <header>
                    <button onClick={createFile}>download</button>
                    <button onClick={() => setShow(!show)} className="details">show</button>
                </header>
                <footer style={{ display: show ? "flex" : "none" }}>
                    <input type="text" name={""} value={""} onChange={handle} placeholder="question" />
                    {/* <label> a </label> */}
                    <input type="text" name={""} value={""} onChange={handle} placeholder="answer a" />
                    {/* <label> b </label> */}
                    <input type="text" name={""} value={""} onChange={handle} placeholder="answer b" />
                    {/* <label> c </label> */}
                    <input type="text" name={""} value={""} onChange={handle} placeholder="answer c" />
                    {/* <label> d </label> */}
                    <input type="text" name={""} value={""} onChange={handle} placeholder="answer d" />
                    {/* <label> e </label> */}
                    <input type="text" name={""} value={""} onChange={handle} placeholder="answer e" />
                </footer>
            </article>
        </section>
    )
}