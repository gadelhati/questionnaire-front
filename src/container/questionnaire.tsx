import { ChangeEvent, useEffect, useState } from "react"
// import naruto from "../assets/naruto.json"
// import novela from "../assets/novela.json"
import marinha from "../assets/marinha.json"
import { initialQuestion, Question } from "../component/Question"
import './questionnaire.css'

export const Questionnaire = () => {
    const [questions, setQuestions] = useState<Question[]>(marinha)
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
        disable()
        correct()
        if (event.target.value === question.answer) {
            setQuestions([...questions.filter((question) => question.question.replace(/[\?\s\(\)\\n]/g, '-') !== event.target.name),
            { ...question, answered: true }
            ])
        } else {
            setQuestions([...questions.filter((question) => question.question.replace(/[\?\s\(\)\\n]/g, '-') !== event.target.name),
            { ...question, answered: false }
            ])
        }
    }
    const disable = () => {
        const radios = document.querySelectorAll(`input[name="${question.question.replace(/[\?\s\(\)\\n]/g, '-')}"]`)
        radios.forEach(radio => (radio as HTMLInputElement).disabled = true)
    }
    const correct = () => {
        const radios = document.querySelectorAll(`input[name="${question.question.replace(/[\?\s\(\)\\n]/g, '-')}"]`)
        radios.forEach(radio => {
            if ((radio as HTMLInputElement).value === question.answer) {
                radio.classList.add('correct')
            }
        })
    }
    const clear = () => {
        const radios = document.querySelectorAll(`input[name="${question.question.replace(/[\?\s\(\)\\n]/g, '-')}"]`)
        radios.forEach(radio => {
            (radio as HTMLInputElement).checked = false;
            (radio as HTMLInputElement).disabled = false;
            (radio as HTMLInputElement).classList.remove('correct');
        })
    }
    // const reorder = (array: string[]) => {
    //     for (let i = array.length - 1; i > 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1));
    //         [array[i], array[j]] = [array[j], array[i]];
    //     }
    //     return array
    // }
    return (
        <section>
            <article>
                <header>
                    <center>
                        {/* <button onClick={() => changeQuestions(naruto)}>naruto</button>
                        <button onClick={() => changeQuestions(novela)}>novela</button> */}
                        <button onClick={() => changeQuestions(marinha)}>marinha</button>
                        {/* <select name="data" onChange={(event)=>changeQuestions} id="data">
                            <option aria-value={naruto}>Naruto</option>
                            <option aria-value={novela}>Novela</option>
                        </select> */}
                    </center>
                </header>
                <fieldset>
                    <legend>{question.question}</legend>
                    <ul>{question.answers.map((answer: string) => {
                        return <li key={answer}>
                            <input hidden type="radio" id={answer} name={question.question.replace(/[\?\s\(\)\\n]/g, '-')} value={answer} onChange={selectAnswer} />
                            <label htmlFor={answer}>{answer}</label>
                        </li>
                    })}</ul>
                </fieldset>
                <center>
                    <button onClick={() => setShow(!show)} className="details">⚙</button>
                    <button onClick={changeQuestion}>próxima</button>
                </center>
                <footer style={{ display: show ? "flex" : "none" }}>
                    <button>respondidas {questions.filter((hit) => hit.answered !== undefined).length}/{questions.length}</button>
                    <button>acertos {questions.filter((hit) => hit.answered === true).length}</button>
                    <button>erros {questions.filter((miss) => miss.answered === false).length}</button>
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