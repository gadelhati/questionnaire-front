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
    }, [])
    const changeQuestions = (data: Question[]) => {
        setQuestions(data)
        setQuestion(data[Math.floor(Math.random() * data.length)])
    }
    const changeQuestion = () => {
        setQuestion(questions[Math.floor(Math.random() * questions.length)])
        clear()
    }
    const selectAnswer = async (event: ChangeEvent<HTMLInputElement>) => {
        // disable()
        if (event.target.value === question.answer) {
            setQuestions([...questions.filter((question) => question.question.replace(/[\?\s]/g, '-') !== event.target.name),
            { ...question, answered: true }
            ])
        } else {
            setQuestions([...questions.filter((question) => question.question.replace(/[\?\s]/g, '-') !== event.target.name),
            { ...question, answered: false }
            ])
        }
    }
    // const selected = () => {
    //     // const radios = document.querySelectorAll(`input[name="${question.question.replace(/[\?\s]/g, '-')}]"`)
    //     // radios.forEach((radio)=>{
    //     //     console.log((radio as HTMLInputElement).checked )
    //     // })
    //     const radioButtons = document.querySelectorAll(`input[name="${question.question.replace(/[\?\s]/g, '-')}]"`)
    //     console.log('2', radioButtons)
    //     for (const radioButton of radioButtons) {
    //         if ((radioButton as HTMLInputElement).checked) {
    //             console.log(radioButton.value)
    //             break
    //         }
    //     }
    // }
    const clear = () => {
        const radios = document.querySelectorAll(`input[name="${question.question.replace(/[\?\s]/g, '-')}"]`)
        radios.forEach(radio => (radio as HTMLInputElement).checked = false)
    }
    const disable = () => {
        const radios = document.querySelectorAll(`input[name="${question.question.replace(/[\?\s]/g, '-')}"]`)
        console.log(radios)
        radios.forEach(radio => (radio as HTMLInputElement).disabled = true)
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
                <fieldset>
                    <legend>{question.question}</legend>
                    <>{question.answers.map((answer: string) => {
                        return <li key={answer}>
                            <input type="radio" id={answer} name={question.question.replace(/[\?\s]/g, '-')} value={answer} onClick={selectAnswer} />
                            <label htmlFor={answer}>{answer}</label>
                        </li>
                    })}</>
                </fieldset>
                <button onClick={() => setShow(!show)}>spoiler</button>
                {/* <button onClick={selected}>selected</button> */}
                <footer style={{ display: show ? "flex" : "none" }}>
                    <button>{questions.filter((hit) => hit.answered !== undefined).length}/{questions.length}</button>
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