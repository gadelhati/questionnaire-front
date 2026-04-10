import { ChangeEvent, useEffect, useState } from "react"
// import rdm from "../assets/rdm.json"
// import pmn from "../assets/pmn.json"
import direito from "../assets/direito.json"
// import cav from "../assets/cav.json"
// import justica from "../assets/justica.json"
// import marinha from "../assets/marinha.json"
import { initialQuestion, Question } from "../component/Question"
import './questionnaire.css'

export const Questionnaire = () => {
    const [questions, setQuestions] = useState<Question[]>(direito)
    const [question, setQuestion] = useState<Question>(initialQuestion)
    const [show, setShow] = useState<boolean>(false)

    useEffect(() => {
        changeQuestion()
    }, [])
    const changeQuestions = (data: Question[]) => {
        // Preserva o estado de 'answered' se já existir para questões com o mesmo texto
        const updatedData = data.map(newQuestion => {
            const existingQuestion = questions.find(q => q.question === newQuestion.question);
            return existingQuestion ? existingQuestion : newQuestion;
        });
        
        setQuestions(updatedData)
        // Seleciona uma questão não respondida quando muda o conjunto de dados
        const unansweredQuestions = updatedData.filter(q => q.answered === undefined);
        if (unansweredQuestions.length > 0) {
            setQuestion(unansweredQuestions[Math.floor(Math.random() * unansweredQuestions.length)]);
        } else {
            setQuestion(updatedData[Math.floor(Math.random() * updatedData.length)]);
        }
    }
    const changeQuestion = () => {
        // Tenta primeiro pegar questões não respondidas
        const unansweredQuestions = questions.filter(q => q.answered === undefined);
        
        if (unansweredQuestions.length > 0) {
            const randomIndex = Math.floor(Math.random() * unansweredQuestions.length);
            setQuestion(unansweredQuestions[randomIndex]);
        } else {
            // Se todas foram respondidas, pega qualquer uma
            setQuestion(questions[Math.floor(Math.random() * questions.length)]);
        }
        clear()
    }
    const selectAnswer = async (event: ChangeEvent<HTMLInputElement>) => {
        disable()
        correct()
        const questionName = event.target.name;
        
        setQuestions(prevQuestions => 
            prevQuestions.map(q => {
                // Encontra a questão correspondente pelo name transformado
                if (q.question.replace(/[\?\s\(\)\\n]/g, '-') === questionName) {
                    return {
                        ...q,
                        answered: event.target.value === q.answer
                    }
                }
                return q;
            })
        )
    }
    
    const resetProgress = () => {
        const resetQuestions = questions.map(q => ({
            question: q.question,
            answers: q.answers,
            answer: q.answer
            // Remove a propriedade 'answered'
        }));
        setQuestions(resetQuestions);
        // Seleciona uma questão aleatória das questões resetadas
        const randomIndex = Math.floor(Math.random() * resetQuestions.length);
        setQuestion(resetQuestions[randomIndex]);
        clear();
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
                        {/* <button onClick={() => changeQuestions(rdm)}>rdm</button> */}
                        {/* <button onClick={() => changeQuestions(pmn)}>pmn</button> */}
                        <button onClick={() => changeQuestions(direito)}>direito</button>
                        {/* <button onClick={() => changeQuestions(cav)}>cav</button>
                        <button onClick={() => changeQuestions(justica)}>justica</button>
                        <button onClick={() => changeQuestions(marinha)}>marinha</button> */}
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
                    <button onClick={() => setShow(!show)} className="details">!</button>
                    {questions.filter(q => q.answered === undefined).length > 0 ? (
                        <button onClick={changeQuestion}>Próxima</button>
                    ) : (
                        <div>
                            Concluído: {Math.round((questions.filter(q => q.answered === true).length / questions.length) * 100)}% de acertos
                        </div>
                    )}
                </center>
                <footer style={{ display: show ? "flex" : "none" }}>
                    <button>respondidas {questions.filter((hit) => hit.answered !== undefined).length}/{questions.length}</button>
                    <button>acertos {questions.filter((hit) => hit.answered === true).length}</button>
                    <button>erros {questions.filter((miss) => miss.answered === false).length}</button>
                    <button onClick={resetProgress}>Reset</button>
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