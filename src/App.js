import './App.css';

import { Home } from 'pages';

function App() {
    return (
        <div className="App">
            <div className={"pageHeader"}>
                <div className={"pageTitle"}>
                    LEADERBOARD
                </div>
            </div>
            <div className={"pageCont"}>
                <Home />
            </div>
        </div>
    );
}

export default App;
