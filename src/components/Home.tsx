import { AiOutlinePlayCircle, AiOutlineSearch, AiOutlineSetting } from 'react-icons/ai';
import { useApp } from '../context/Context';
import mp3 from '../assets/thinking-time-148496.mp3';

const Home = () => {

    const { setGame, clicked, setClicked, limit, setLimit } = useApp();

    const playActivityOne = () => setGame({ active: true, activity: 'Activity One', complete: false, retry: false, questions: [] });
    const playActivityTwo = () => setGame({ active: true, activity: 'Activity Two', complete: false, retry: false, questions: [] });

    const audio = new Audio(mp3);
    audio.loop = true;

    const playAudio = () => {
        if (clicked) return;
        audio.play();
        setClicked(true);
    };


    return (
        <div onClick={playAudio} className="grid items-center justify-items-center gap-3">
            <div className="flex text-yellow items-center place-content-center flex-wrap">
                <AiOutlineSearch size="100px" />
                <h1 className="text-8xl md:text-9xl text-center">FIND THE ERROR!</h1>
            </div>
            <div className="flex items-center place-content-center flex-wrap gap-3 p-2">
                <div onClick={playActivityOne} className="flex flex-wrap place-content-center items-center bg-blue text-yellow rounded-xl p-4 gap-2 select-none hover:scale-[0.98]">
                    <AiOutlinePlayCircle size="50px" />
                    <h1 className="text-4xl md:text-5xl text-center">PLAY ACTIVITY ONE</h1>
                </div>
                <div onClick={playActivityTwo} className="flex flex-wrap place-content-center items-center bg-blue text-yellow rounded-xl p-4 gap-2 select-none hover:scale-[0.98]">
                    <AiOutlinePlayCircle size="50px" />
                    <h1 className="text-4xl md:text-5xl text-center">PLAY ACTIVITY TWO</h1>
                </div>
            </div>

            <div className="flex items-center place-content-center flex-wrap gap-3 p-2">
                <div onClick={() => setLimit(30)} className={`flex flex-wrap place-content-center items-center ${limit === 30 ? 'bg-black text-pink' : 'border-2 border-pink text-black'} rounded-xl p-3 gap-1 select-none hover:scale-[0.98]`}>
                    <AiOutlineSetting size="40px" />
                    <h1 className="text-3xl md:text-4xl text-center">SLOW</h1>
                </div>
                <div onClick={() => setLimit(15)} className={`flex flex-wrap place-content-center items-center ${limit === 15 ? 'bg-black text-pink' : 'border-2 border-pink text-black'} rounded-xl p-3 gap-1 select-none hover:scale-[0.98]`}>
                    <AiOutlineSetting size="40px" />
                    <h1 className="text-3xl md:text-4xl text-center">NORMAL</h1>
                </div>
                <div onClick={() => setLimit(5)} className={`flex flex-wrap place-content-center items-center ${limit === 5 ? 'bg-black text-pink' : 'border-2 border-pink text-black'} rounded-xl p-3 gap-1 select-none hover:scale-[0.98]`}>
                    <AiOutlineSetting size="40px" />
                    <h1 className="text-3xl md:text-4xl text-center">SPEED</h1>
                </div>
            </div>
        </div>
    )
};

export default Home;