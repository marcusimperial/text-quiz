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
    payload: { status: false }

}

const AppValues = createContext<AppContext>(defaultValues);
export const useApp = () => useContext(AppValues);

const Context = ({ children }: props) => {

    const getData = () => {
        try {
            const data = sessionStorage.getItem('quizapp-data');
            // attempting to retrieve cache 
            if (data) return { ...JSON.parse(data) };
        } catch { 
            // if data is corrupted, return default
            return { ...defaultValues?.payload }; 
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
            if (!data?.status) return window.location.reload();
            // if request fails, reload website (assumes it's only a network err)
            sessionStorage.setItem('quizapp-data', JSON.stringify({ ...data }));
            setPayload({ ...data });
            // onsuccess, set payload data 
        })();
    }, []);

    useEffect(() => {
        if (!game?.active) return setQuestions([]);
        // if a game is inactive, return with empty arr 
        if (game?.questions?.length) return setQuestions([ ...game?.questions ]);
        // if a game has preset questions, return with those instead 
        const activity = payload?.activities?.find(({ activity_name }) => activity_name === game?.activity);
        if (!activity?.questions) return;
        // find selected activity
        const questionSet: Array<QuestionData> = activity?.questions || [];
        let arr = [];
        // convert the 2D array within the payload data into a 1D array 
        for (const item of questionSet) {
            if (item?.round_title) for (const question of item?.questions || []) arr.push({
                ...question, round_title: item?.round_title
            });
            // if an item within the arr has questions within it, push the inner items to the new arr
            else arr.push({ round_title: "Round 1", ...item });
            // if not, retain the item but append "Round 1" for consistency (conforms the more complex state)
        };
        for (let i = 0; i < arr.length; i++) arr[i].order = i + 1;
        // reorder the new array, preserving the initial round sorting 
        // for instance, Round 1 Question 3 MUST go before Round 2 Question 1, and so forth 
        setQuestions([ ...arr ]);
    }, [game?.active, game?.retry, game?.questions]);

    useEffect(() => {
        if (!questions?.length) return setQuestion({});
        // if no questions, return with empty question object
        let arr = [ ...questions ];
        if (question?.order) arr = arr.filter(({ order }) => order !== question?.order);
        // if a question is in active state, filter it from the arr to prevent processing it further
        let nextQuestion = arr?.find(({ order }) => order === (question?.order || 0) + 1);
        // the next question by default will be the next order (+ 1)
        if (game?.retry) nextQuestion = arr?.find(({ user_answers }) => (!user_answers?.length));
        // if the game is in retry mode, overwrite the next question based on the next question w/o answer
        if (question?.round_title !== nextQuestion?.round_title) setRound(nextQuestion?.round_title || '');
        // if the current and next question's rounds are differnet, set a new round to display 
        if (nextQuestion) return setQuestion({ ...nextQuestion });
        // if we've found another question, return with question
        setGame({ ...game, complete: true });
        setQuestion({});
        // else, conclude the game and reset question object
        // retry func already filters incorrect questions to []; we're looking for no ans
    }, [questions]);

    useEffect(() => {
        if (!question?.user_answers?.length) return;
        // if there are no answers to process, return 
        const index = questions?.findIndex(({ order }) => order === question?.order);
        // retrieve question index based on order
        if (!(index >= 0)) return;
        // if no index is found, return 
        let arr = [ ...questions ];
        arr[index] = { ...question };
        setQuestions([ ...arr ]);
        // updating the questions arr @ question index (usually with an answer)
    }, [question]);
    
    const values = { 
        game, setGame, questions, setQuestions, 
        question, setQuestion, clicked, setClicked, 
        limit, setLimit, round, setRound, payload 
    };

    return (<AppValues.Provider value={values}>{children}</AppValues.Provider>)
};

export default Context;