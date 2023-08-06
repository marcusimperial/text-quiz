import { AiOutlinePlayCircle, AiOutlineSearch } from 'react-icons/ai';
import { useApp } from '../context/Context';

const Home = () => {

    const { setGame } = useApp();

    const playActivityOne = () => setGame({ active: true, activity: 'Activity One', complete: false });
    const playActivityTwo = () => setGame({ active: true, activity: 'Activity Two', complete: false });

    return (
        <div className="grid items-center justify-items-center gap-3">
            <div className="flex text-yellow items-center place-content-center flex-wrap">
                <AiOutlineSearch size="100px" />
                <h1 className="text-9xl text-center">FIND THE ERROR!</h1>
            </div>
            <div className="flex items-center place-content-center flex-wrap gap-3 p-2">
                <div onClick={playActivityOne} className="flex flex-wrap place-content-center items-center bg-blue text-yellow rounded-xl p-4 gap-2 select-none hover:scale-[0.98]">
                    <AiOutlinePlayCircle size="50px" />
                    <h1 className="text-5xl text-center">PLAY ACTIVITY ONE</h1>
                </div>
                <div onClick={playActivityTwo} className="flex flex-wrap place-content-center items-center bg-blue text-yellow rounded-xl p-4 gap-2 select-none hover:scale-[0.98]">
                    <AiOutlinePlayCircle size="50px" />
                    <h1 className="text-5xl text-center">PLAY ACTIVITY TWO</h1>
                </div>
            </div>
        </div>
    )
};

export default Home;