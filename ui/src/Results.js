import React, { useEffect, useState } from 'react';

const Results = ({ words }) => {
    const [theWords, setTheWords] = useState([]);

    const handleSelection = (evt) => {
        if(evt.key === "Enter") {
            document.getElementById('searchText').value = evt.target.textContent;
            setTheWords([])
        }
        if(evt.key === "Escape") {
            document.getElementById('searchText').value = '';
        }
    }

    useEffect( () => {
        setTheWords(words);
    }, [words]);

    return (
        <ul id="results">
        { theWords.map( (obj) => 
            <li 
                onKeyUp={handleSelection}
                key={obj._id} 
                tabIndex="0">{ obj.word }</li>
        )}
        </ul>
    );
};

export default Results;