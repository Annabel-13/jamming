import React from 'react';
import Tracklist from './Tracklist';
import Track from './Track';
import '../styles/SearchResults.css';

function SearchResults({ searchResults, onAdd }) {
    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <Tracklist tracks={searchResults} onAdd={onAdd} isRemoval={false}/>
            <div>
                {searchResults.map(track => (
                    <Track key={track.id} track={track}/>
                ))}
            </div>
        </div>
    );
}

export default SearchResults;
