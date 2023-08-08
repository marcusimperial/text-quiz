import { AiOutlineLineChart, AiTwotoneHome, AiOutlineRedo } from 'react-icons/ai';
import { useApp } from '../context/Context';
import { QuestionData } from '../context/types';

const Score = () => {

    const { game, setGame, questions } = useApp();
    
    const resetGame = () => setGame({ active: false, complete: false, activity: '', retry: false, questions: [] });
    // reseting game back to initial state 
    
    const retryMistakes = () => {
        const retryQuesitons = questions.map(question => {
            if (question?.user_answers?.[0] !== question?.is_correct) return { ...question, user_answers: [] };
            // if a question is incorrect OR is null, reset the ans array
            return { ...question };
        });
         // mapping a new set of questions to retry 
        if (!(retryQuesitons.find(({ user_answers, is_correct}) => user_answers?.[0] !== is_correct))) return resetGame();
        // if there are no questions to retry, reset the game => returns to home 
        setGame({ active: true, complete: false, activity: game?.activity, retry: true, questions: retryQuesitons });
        // initialize updated game with pre-filled questions
    };

    const groupQuestions = (data: Array<QuestionData> = questions, key: string = 'round_title') => {
        return data.reduce((prev: any, curr: any) => {
            let property = curr[key];
            if (!prev[property]) prev[property] = [];
            prev[property].push(curr);
            return prev;
        }, {})
        // grouping the 1D array based on key 'round_title' in order to display based on round
    };

    return (
        <div className="grid p-3 bg-yellow/90 text-blue rounded-xl gap-4 p-8">
            <div className="flex items-center place-content-center gap-3 p-3">
                <AiOutlineLineChart size="60px" />
                <h1 className="text-6xl text-blue text-center">RESULTS</h1>
            </div>

            {
                Object.entries<any>(groupQuestions(questions)).map(([ groupName, groupValues ], i: number) => (
                    <div className="grid gap-1" key={`r${i}`}>
                        <h1 className="text-4xl text-black">{groupName.toUpperCase()}</h1>
                        {
                            
                            groupValues.map(({ order, is_correct, user_answers }: QuestionData, i: number) => (
                                <div key={`q${i}`} className="grid md:grid-flow-col justify-items-center md:justify-between border-2 border-blue p-2 rounded-lg">
                                    <h1 className="text-4xl justify-self-center">QUESTION {order}</h1>
                                    <h1 className="text-4xl">{ is_correct === user_answers?.[0] ? 'CORRECT' : ( user_answers?.[0] === null ? 'NO ANS' : 'INCORRECT') }</h1>
                                </div>
                            ))
                        }
                    </div>
                ))
            }

            <div className="grid gap-1">
                <div onClick={resetGame} className="flex flex-wrap items-center place-content-center text-yellow bg-blue p-3 gap-3 rounded-lg select-none hover:scale-[0.98]">
                    <AiTwotoneHome size="50px" />
                    <h1 className="text-4xl md:text-5xl text-center">BACK TO HOME</h1>
                </div>

                <div onClick={retryMistakes} className="flex flex-wrap items-center place-content-center text-black border-2 border-black p-2 gap-3 rounded-lg select-none hover:scale-[0.98]">
                    <AiOutlineRedo size="40px" />
                    <h1 className="text-3xl md:text-4xl text-center">RETRY MISTAKES</h1>
                </div>
            </div>

        </div>
    )
};

export default Score;