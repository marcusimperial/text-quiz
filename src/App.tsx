import { useApp } from './context/Context'
import Home from './components/Home';
import Question from './components/Question';
import Score from './components/Score';

const App = () => {
    
    const { game } = useApp();
    
    // app displays screen based on the game's app state rather than via router 
    // cases in which /question is called w/o game init results in redundant state checking

    return (
        <div className="grid items-center justify-items-center min-h-screen md:h-screen bg-[url('./assets/669.jpg')] bg-center bg-cover overflow-auto p-4">
            { !game?.active ? <Home /> : (!game?.complete ? <Question /> : <Score />) }
        </div>  
    )
};

export default App;