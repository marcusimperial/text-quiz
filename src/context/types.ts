import { ReactNode, Dispatch, SetStateAction } from "react";

export type props = {
    children?: ReactNode
}

export type QuestionData = {
    round_title?: string,
    is_correct?: boolean,
    stimulus?: string,
    order?: number,
    user_answers?: Array<any>,
    feedback?: string,
    questions?: Array<QuestionData>
}

export type GameData = {
    active: boolean,
    activity: string,
    complete: boolean,
    retry: boolean,
    questions: Array<QuestionData>
}

export type AppContext = {
    game: GameData,
    setGame: Dispatch<SetStateAction<GameData>>,
    questions: Array<QuestionData>,
    setQuestions: Dispatch<SetStateAction<Array<QuestionData>>>,
    question: QuestionData,
    setQuestion: Dispatch<SetStateAction<object>>,
    clicked: boolean,
    setClicked: Dispatch<SetStateAction<boolean>>
}