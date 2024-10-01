import React from 'react';
import '../styles/Track.css';

function Track({ track, onAdd, onRemove, isRemoval }) {
    // Function to handle adding track
    const handleAddTrack = () => {
        if (onAdd) {
            onAdd(track);
        }
    };

    // Function to handle removing track
    const handleRemoveTrack = () => {
        if (onRemove) {
            onRemove(track);
        }
    };

    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{track.name}</h3>
                <p>{track.artist} | {track.album}</p>
            </div>
            {isRemoval ? (
                <button className="Track-action" onClick={handleRemoveTrack}>-</button>
            ) : (
                <button className="Track-action" onClick={handleAddTrack}>+</button>
            )}
        </div>
    );
}

export default Track;
