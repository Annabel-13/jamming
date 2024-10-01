import React, { useState } from 'react';
import '../styles/SearchBar.css';

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        if (searchTerm) {
            onSearch(searchTerm);
            setSearchTerm(''); // Clear input after searching
        }
    };

    const handleTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch(); // Trigger search on Enter key press
        }
    };

    return (
        <div className="SearchBar">
            <input
                type="text"
                placeholder="Enter A Song, Album, or Artist"
                value={searchTerm}
                onChange={handleTermChange}
                onKeyPress={handleKeyPress} // Add key press handling
            />
            <button
                className="SearchButton"
                onClick={handleSearch}
                disabled={!searchTerm} // Disable button if input is empty
            >
                SEARCH
            </button>
        </div>
    );
}

export default SearchBar;
