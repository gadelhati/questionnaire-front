import { ChangeEvent, useEffect, useState } from "react"
import naruto from "../assets/naruto.json"
import novela from "../assets/novela.json"
import { initialQuestion, Question } from "../component/Question"
import './questionnaire.css'

export const Questionnaire = () => {
    const [questions, setQuestions] = useState<Question[]>(naruto)
    const [question, setQuestion] = useState<Question>(initialQuestion)
    const [show, setShow] = useState<boolean>(false)

    useEffect(() => {
        changeQuestion()
    }, [question])
    const changeQuestions = (data: Question[]) => {
        setQuestions(data)
        setQuestion(data[Math.floor(Math.random() * data.length)])
    }
    const changeQuestion = () => {
        setShow(false)
        setQuestion(questions[Math.floor(Math.random() * questions.length)])
        // const radios = document.getElementsByName(question.question)
        // radios.forEach(radio => radio.checked = false)
    }
    const selectAnswer = async (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.value === question.answer) {
            setQuestions([...questions.filter((question) => question.question !== event.target.name),
                {...question, answered: true }
            ])
        } else {
            setQuestions([...questions.filter((question) => question.question !== event.target.name),
                {...question, answered: false }
            ])
        }
    }
    return (
        <section>
            <article>
            <button onClick={() => changeQuestions(naruto)}>naruto</button>
            <button onClick={() => changeQuestions(novela)}>novela</button>
            {/* <select name="data" onChange={(event)=>changeQuestions} id="data">
                <option aria-value={naruto}>Naruto</option>
                <option aria-value={novela}>Novela</option>
            </select> */}
            <button onClick={changeQuestion}>skip</button>
            <button onClick={() => setShow(true)}>check</button>
            <fieldset>
                <legend>{question.question}</legend>
                <>{question.answers.map((answer: string) => {
                    return <li>
                        <input type="radio" id={answer} name={question.question} value={answer} onChange={selectAnswer} />
                        <label htmlFor={answer}>{answer}</label>
                    </li>
                })}</>
                <>{JSON.stringify(question.answered)}</>
                <>{question.answer}</>
            </fieldset>
            <footer style={{ display: show ? "flex" : "none" }}>
                <button>{questions.filter((hit) => hit.answered !== undefined ).length}/{questions.length}</button>
                <button>{questions.filter((hit) => hit.answered === true).length}</button>
                <button>{questions.filter((miss) => miss.answered === false).length}</button>
            </footer>
            {/* <fieldset>
                {questions.map((element: Question) => {
                    return <>
                        <legend>{element.question}</legend>
                        {element.answer.map((answer: string) => {
                            return <li>
                                <input type="radio" id={answer} name={element.question} />
                                <label htmlFor={answer}>{answer}</label>
                            </li>
                        })}</>
                })}
            </fieldset> */}
            </article>
        </section>
    )
}