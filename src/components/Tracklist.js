import React from 'react';
import Track from './Track';
import '../styles/Tracklist.css';

function Tracklist({ tracks, onAdd, onRemove, isRemoval }) {
    return (
        <div className="Tracklist">
            {tracks && tracks.length > 0 ? (
                tracks.map(track => (
                    <Track
                        key={track.id}
                        track={track}
                        onAdd={onAdd}
                        onRemove={onRemove}
                        isRemoval={isRemoval}
                    />
                ))
            ) : (
                <p>No tracks available</p>  // Display message when no tracks are available
            )}
        </div>
    );
}

export default Tracklist;
