import React from 'react';
import s from './App.module.css';
import SimpleDNDcards from "./SimpleDNDCARDS/SimpleDNDcards";
import Trello from "./TRELLO/Trello";


function App() {

    return (
        <div className={s.App}>
            {/*<SimpleDNDcards />*/}
            <Trello />
        </div>
    );
}

export default App;
