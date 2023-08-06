import { ReactNode, Dispatch, SetStateAction } from "react";

export type props = {
    children?: ReactNode
}

export type GameData = {
    active: boolean,
    activity: string,
    complete: boolean
}

export type QuestionData = {
    round_title?: string,
    is_correct?: boolean,
    stimulus?: string,
    order?: number,
    user_answers?: Array<string>,
    feedback?: string,
    questions?: Array<QuestionData>
}

export type AppContext = {
    game: GameData,
    setGame: Dispatch<SetStateAction<GameData>>,
    questions: Array<QuestionData>,
    setQuestions: Dispatch<SetStateAction<Array<QuestionData>>>,
    question: QuestionData,
    setQuestion: Dispatch<SetStateAction<object>>,
}