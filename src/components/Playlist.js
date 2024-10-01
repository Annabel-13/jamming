import React from 'react';
import Tracklist from './Tracklist';
import '../styles/Playlist.css';

function Playlist({ playlistName, playlistTracks, onRemove, onNameChange, onSave }) {
    // Handle changes to the playlist name input
    const handleNameChange = (event) => {
        onNameChange(event.target.value);
    };

    return (
        <div className="Playlist">
            {/* Input to rename the playlist */}
            <input
                value={playlistName}
                onChange={handleNameChange}
                placeholder="Enter Playlist Name"
            />

            {/* Display the list of tracks in the playlist */}
            <Tracklist
                tracks={playlistTracks}
                onRemove={onRemove}
                isRemoval={true}
            />

            {/* Button to save the playlist to Spotify */}
            <button
                className="Playlist-save"
                onClick={onSave}
                disabled={playlistTracks.length === 0}  // Disable button if no tracks to save
            >
                SAVE TO SPOTIFY
            </button>
        </div>
    );
}

export default Playlist;
