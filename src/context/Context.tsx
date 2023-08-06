import { useContext, createContext, useEffect, useState } from "react";
import { props, GameData, QuestionData, AppContext } from './types';
import payload from "./payload";

const defaultGame = { active: false, activity: '', complete: false };

const defaultValues = {
    game: defaultGame,
    setGame: () => {},
    questions: [],
    setQuestions: () => {},
    question: {},
    setQuestion: () => {},
}

const AppValues = createContext<AppContext>(defaultValues);
export const useApp = () => useContext(AppValues);

const Context = ({ children }: props) => {

    const [game, setGame] = useState<GameData>(defaultGame);
    const [questions, setQuestions] = useState<Array<QuestionData>>([]);
    const [question, setQuestion] = useState<QuestionData>({});

    useEffect(() => {
        if (!game?.active) return setQuestions([]);
        // generate list of questions based on data
        const activity = payload?.activities?.find(({ activity_name }) => activity_name === game?.activity);
        if (!activity?.questions) return;
        const questionSet: Array<QuestionData> = activity?.questions || [];
        let arr = [];
        for (const item of questionSet) {
            if (item?.round_title) for (const question of item?.questions || []) arr.push({
                ...question, round_title: item?.round_title
            });
            else arr.push({ round_title: "Round 1", ...item });
        };
        for (let i = 0; i < arr.length; i++) arr[i].order = i + 1;
        console.log('q set', arr);
        setQuestions([ ...arr ]);
    }, [game?.active]);

    useEffect(() => {
        if (!questions?.length) return setQuestion({});
        // set question based on order, starting as 0
        const firstQuestion = questions?.find(({ order }) => order === (question?.order || 0) + 1);
        if (firstQuestion) return setQuestion({ ...firstQuestion }); 
        setGame({ ...game, complete: true });
        // if not, conclude the game
    }, [questions]);

    useEffect(() => {
        if (!question?.user_answers?.length) return;
        // update questions array
        const index = questions?.findIndex(({ order }) => order === question?.order);
        if (!(index >= 0)) return;
        questions[index] = question;
        setQuestions([ ...questions ]);
    }, [question]);
    
    const values = { game, setGame, questions, setQuestions, question, setQuestion };

    return (<AppValues.Provider value={values}>{children}</AppValues.Provider>)
};

export default Context;