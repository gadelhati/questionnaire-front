export interface Question {
    question: string,
    answers: string[],
    answer: string,
    answered?: boolean,
}

export const initialQuestion: Question = {
    question: "",
    answers: [],
    answer: "",
}