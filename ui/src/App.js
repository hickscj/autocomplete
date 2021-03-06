import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Results from './Results';
import './index.scss';

const App = () => {
    const [words, setWords] = useState([]);

    const requestSearch = async (evt) => {
        if(evt.keyCode >= 65 && evt.keyCode <= 90) {
            const searchText = document.getElementById('searchText').value;
            if(searchText.length > 0) {
                try {
                    const res = await fetch(`http://localhost:3000/api/v1/search?q=${searchText}`);
                    const parsed = await res.json();
                    setWords(parsed);
                } catch(err) {
                    const errorParts = err.message.split(' ');
                    console.error(`Error fetching... ${err}`);
                    if(errorParts.includes('NetworkError')) {
                        setWords([{
                            _id: 0,
                            word: 'There was an error connecting.\n Did you remember to start the API server?'
                        }]);
                    }
                }
            }
        }
        if(evt.key === "Escape" || evt.key === "Enter") setWords([]);
    };

    return (
        <React.StrictMode>
        <div id="container">
            <div></div>
            <div id="autocomplete-form">
                <div>Start typing...</div>
                <form autoComplete="off">
                    <input 
                        type="text" 
                        name="searchText" 
                        onKeyUp={requestSearch}
                        id="searchText"/>
                    <Results words={ words } />
                </form>
            </div>
            <div></div>
        </div>
        </React.StrictMode>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));