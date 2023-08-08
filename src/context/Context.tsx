import { useContext, createContext, useEffect, useState } from "react";
import { props, GameData, QuestionData, AppContext, Payload } from './types';
import { fetchData } from "./requests";

const defaultGame = { active: false, activity: '', complete: false, retry: false, questions: [] };

const defaultValues = {
    game: defaultGame, setGame: () => {},
    questions: [], setQuestions: () => {},
    question: {}, setQuestion: () => {},
    clicked: false, setClicked: () => {},
    limit: 15, setLimit: () => {},
    round: '', setRound: () => {},

}

const AppValues = createContext<AppContext>(defaultValues);
export const useApp = () => useContext(AppValues);

const Context = ({ children }: props) => {

    const getData = () => {
        try {
            const data = localStorage.getItem('quizapp-data');
            if (data) return { ...JSON.parse(data) };
        } catch { 
            return { status: false }; 
        }
    };

    const [payload, setPayload] = useState<Payload>(getData());
    const [game, setGame] = useState<GameData>(defaultGame);
    const [questions, setQuestions] = useState<Array<QuestionData>>([]);
    const [question, setQuestion] = useState<QuestionData>({});
    const [clicked, setClicked] = useState<boolean>(defaultValues?.clicked);
    const [limit, setLimit] = useState<number>(defaultValues?.limit);
    const [round, setRound] = useState<string>(defaultValues?.round);

    useEffect(() => {
        if (payload?.status) return;
        (async () => {
            const data = await fetchData();
            if (!data?.status) return;
            console.log('data retrieved', data);
            localStorage.setItem('quizapp-data', JSON.stringify({ ...data }));
            setPayload({ ...data });
        })();
    }, []);

    useEffect(() => {
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
    }, [game?.active, game?.retry, game?.questions]);

    useEffect(() => {
        if (!questions?.length) return setQuestion({});
        // set question based on order, starting as 0
        // we should be unable to match with whatever question is current
        let arr = [ ...questions ];
        if (question?.order) arr = arr.filter(({ order }) => order !== question?.order);
        let nextQuestion = arr?.find(({ order }) => order === (question?.order || 0) + 1);
        if (game?.retry) nextQuestion = arr?.find(({ user_answers }) => (!user_answers?.length));
        // retry func already filters incorrect questions to []; we're looking for no ans
        if (!nextQuestion) {
            setGame({ ...game, complete: true });
            setQuestion({});
            return;
        }
        // if not, conclude the game
        if (question?.round_title !== nextQuestion?.round_title) setRound(nextQuestion?.round_title || '');
        setQuestion({ ...nextQuestion });
    }, [questions]);

    useEffect(() => {
        if (!question?.user_answers?.length) return;
        // we are considering answers that have no input
        // problem arises when the question is still wrong, because upper useeffect considers it as "next question"
        const index = questions?.findIndex(({ order }) => order === question?.order);
        if (!(index >= 0)) return;
        let arr = [ ...questions ];
        arr[index] = { ...question };
        setQuestions([ ...arr ]);
    }, [question]);
    
    const values = { 
        game, setGame, 
        questions, setQuestions, 
        question, setQuestion,
        clicked, setClicked, 
        limit, setLimit,
        round, setRound 
    };

    return (<AppValues.Provider value={values}>{children}</AppValues.Provider>)
};

export default Context;