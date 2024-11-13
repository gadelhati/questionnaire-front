import { ChangeEvent, useState } from "react"
import { initialQuestion, Question } from "../component/Question"
import './questionnaire.css'

export const NewQuestionnaire = () => {
    const [questions, setQuestions] = useState<Question[]>([])
    const [question, setQuestion] = useState<Question>({ ...initialQuestion, answers: Array(4).fill("") })

    const createFile = () => {
        const blob = new Blob([JSON.stringify(questions)], { type: "application/json" });
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.download = 'questions.json'
        link.href = url
        link.click()
    }
    const handle = (event: ChangeEvent<HTMLInputElement>) => {
        setQuestion({ ...question, [event.target.name]: event.target.value })
    }
    const handleArray = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const updatedAnswers = [...question.answers]
        updatedAnswers[index] = event.target.value
        setQuestion({ ...question, answers: updatedAnswers })
    }
    const addQuestion = () => {
        setQuestions([...questions, question])
    }
    return (
        <section>
            <article>
                <footer>
                    <input type="text" name={"question"} value={question.question} onChange={handle} placeholder="question" />
                    {question.answers.map((answer: string, index: number) => {
                        return <input type="text" key={"answer"+index} name={"answers"} value={answer} onChange={(event) => handleArray(event, index)} placeholder={`answer ${index}`} />
                    })}
                    <button onClick={addQuestion}>add Question</button>
                    <button onClick={createFile}>download</button>
                </footer>
            </article>
        </section>
    )
}