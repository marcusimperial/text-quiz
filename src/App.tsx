import { useApp } from './context/Context'
import Home from './components/Home';
import Question from './components/Question';
import Score from './components/Score';

const App = () => {
    
    const { game } = useApp();

    return (
        <div className="grid items-center justify-items-center min-h-screen md:h-screen bg-[url('./assets/669.jpg')] bg-center bg-cover overflow-auto p-4">
            { !game?.active ? <Home /> : (!game?.complete ? <Question /> : <Score />) }
        </div>  
    )
};

export default App;