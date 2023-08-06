import { useContext, createContext, useEffect, useState } from "react";
import { props, GameData, QuestionData, AppContext } from './types';
import payload from "./payload";

const defaultGame = { active: false, activity: '', complete: false, retry: false, questions: [] };

const defaultValues = {
    game: defaultGame,
    setGame: () => {},
    questions: [],
    setQuestions: () => {},
    question: {},
    setQuestion: () => {},
    clicked: false,
    setClicked: () => {}
}

const AppValues = createContext<AppContext>(defaultValues);
export const useApp = () => useContext(AppValues);

const Context = ({ children }: props) => {

    const [game, setGame] = useState<GameData>(defaultGame);
    const [questions, setQuestions] = useState<Array<QuestionData>>([]);
    const [question, setQuestion] = useState<QuestionData>({});
    const [clicked, setClicked] = useState<boolean>(false);

    useEffect(() => {
        console.log('called!');
        if (!game?.active) return setQuestions([]);
        // if a game already has questions, insteasd initialize with it
        if (game?.questions?.length) return setQuestions([ ...game?.questions ]);
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
        setQuestions([ ...arr ]);
    }, [game?.active]);

    useEffect(() => {
        if (!questions?.length) return setQuestion({});
        // set question based on order, starting as 0
        if (game?.retry) {
            const nextQuestion = questions?.find(({ user_answers }) => (!user_answers?.[0]));
            if (nextQuestion) return setQuestion({ ...nextQuestion });
        } else {
            const nextQuestion = questions?.find(({ order }) => order === (question?.order || 0) + 1);
            if (nextQuestion) return setQuestion({ ...nextQuestion });
        }
        setGame({ ...game, complete: true, questions });
        // if not, conclude the game
    }, [questions]);

    useEffect(() => {

        if (!question?.user_answers?.length) return;

        // issue: there's input already but game is in retry moade
        console.log(question?.user_answers?.length)
        if (game?.retry && question?.user_answers?.length < 2) return;
        // if game is in retry mode and question is still wrong, return;
        // prevent question processing if game is in retry mode
        // only process if question array has 2 answers, in which case -> 

        // expectation is there's an updated key
        // update questions array
        const index = questions?.findIndex(({ order }) => order === question?.order);
        if (!(index >= 0)) return;
        console.log('index', index);
        let arr = [ ...questions ];
        arr[index] = { ...question };
        console.log('setting questions', questions);
        setQuestions([ ...arr ]);
    }, [question]);
    
    const values = { game, setGame, questions, setQuestions, question, setQuestion, clicked, setClicked };

    return (<AppValues.Provider value={values}>{children}</AppValues.Provider>)
};

export default Context;