import { AiOutlineCheck, AiOutlineClose, AiOutlinePlayCircle } from 'react-icons/ai';
import { useApp } from '../context/Context';

const Question = () => {

    const { game, question, setQuestion } = useApp();
    const markCorrect = () => setQuestion({ ...question, user_answers: [ true ] });
    const markIncorrect = () => setQuestion({ ...question, user_answers: [ false ] });

    const start = question?.stimulus?.split('*')?.[0]?.trim()?.toUpperCase();
    const emphasis = question?.stimulus?.split('*')?.[1]?.trim()?.toUpperCase();
    const end = question?.stimulus?.split('*')?.[2]?.trim()?.toUpperCase();

    return (
        <div className="grid items-center justify-items-center gap-2 w-full">

            <div className="flex flex-wrap place-content-center w-full items-center rounded-xl bg-yellow/90 text-blue p-4 gap-1">
                <AiOutlinePlayCircle size="60px" />
                <h1 className="text-6xl text-center">{game?.activity?.toUpperCase()} {question?.round_title?.toUpperCase()}</h1>
            </div>

            <div className="grid w-full items-center justify-items-center bg-blue/30 text-black/90 rounded-lg gap-10 p-4">
                <h1 className="text-4xl">QUESTION {question?.order}</h1>
                <div className="flex flex-wrap items-center place-content-center gap-3">
                    <h1 className="text-6xl text-center">{start}</h1>
                    <h1 className="text-6xl text-yellow/90 text-center">{emphasis}</h1>
                    <h1 className="text-6xl text-center">{end}</h1>
                </div>
                <div className="flex flex-wrap items-center place-content-center gap-3">
                    <div onClick={markCorrect} className="flex items-center p-3 gap-1 bg-yellow text-blue rounded-xl select-none hover:scale-[0.98]">
                        <AiOutlineCheck size="40px" />
                        <h1 className="text-5xl">CORRECT</h1>
                    </div>
                    <div onClick={markIncorrect} className="flex items-center p-2 gap-1 border-4 border-blue text-yellow rounded-lg select-none hover:scale-[0.98]">
                        <AiOutlineClose size="40px" />
                        <h1 className="text-5xl">INCORRECT</h1>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default Question;