import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import './styles/App.css';

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID; // Your Spotify Client ID
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET; // Your Spotify Client Secret
const redirectUri = 'http://localhost:3000/'; // Your redirect URI
const scopes = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  const addTrack = (track) => {
    if (!playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter(savedTrack => savedTrack.id !== track.id));
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  // Function to save the playlist to Spotify
  const savePlaylist = async () => {
    if (!playlistName || playlistTracks.length === 0) {
      console.log('No playlist name or no tracks to save.');
      return;
    }

    const trackURIs = playlistTracks.map(track => track.uri);

    if (trackURIs.length > 0) {
      // Simulate success after saving
      setSuccessMessage(`Playlist ${playlistName} has been successfully saved!`);

      // Reset the playlist after saving
      setPlaylistTracks([]);
      setPlaylistName('New Playlist');

      // Clear the success message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000);
    }

    try {
      // Step 1: Create a new playlist
      const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: playlistName,
          description: 'Created via Jammming',
          public: false, // Playlist privacy setting
        }),
      });

      if (!createPlaylistResponse.ok) {
        throw new Error('Failed to create playlist');
      }

      const playlistData = await createPlaylistResponse.json();
      const playlistId = playlistData.id; // Newly created playlist ID

      // Step 2: Add tracks to the playlist
      const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uris: trackURIs,
        }),
      });

      if (!addTracksResponse.ok) {
        throw new Error('Failed to add tracks to playlist');
      }

      console.log('Playlist saved successfully!');
      setPlaylistTracks([]); // Clear the playlist after saving
      setPlaylistName('New Playlist'); // Optionally reset playlist name
    } catch (error) {
      console.error('Error saving playlist:', error);
    }
  };

  const search = async (term) => {
    if (!term) {
      console.log("Please enter a search term.");
      return;
    }

    console.log(`Searching for: ${term}`);

    try {
      const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const tracks = data.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists.map(artist => artist.name).join(', '),
        album: track.album.name,
        uri: track.uri,
      }));

      setSearchResults(tracks);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    }
  };

  const handleLogin = () => {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    const exchangeCodeForAccessToken = async (code) => {
      try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri,
            client_id: clientId,
            client_secret: clientSecret,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.access_token;
      } catch (error) {
        console.error('Error exchanging code for access token:', error);
        setError('Failed to get access token');
      }
    };

    const getUserProfile = async (token) => {
      try {
        const response = await fetch('https://api.spotify.com/v1/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to fetch user profile');
      }
    };

    const fetchUserProfile = async () => {
      if (code) {
        const token = await exchangeCodeForAccessToken(code);
        setAccessToken(token);

        if (token) {
          const userProfile = await getUserProfile(token);
          if (userProfile) {
            setUserName(userProfile.display_name);
            setUserId(userProfile.id);
          }
        }
      }
    };

    fetchUserProfile();
  }, []);

  return (
      <div className="mainBox">
        <header>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          {!accessToken ? (
              <button onClick={handleLogin}>Login with Spotify</button>
          ) : (
              <div>
                <h2>Your Name: {userName || 'Loading...'}</h2>
                {successMessage && <p className="success-message">{successMessage}</p>}
              </div>
          )}
        </header>

        <div className="App">
          <SearchBar onSearch={search} />
          <div className="App-playlist">
            <SearchResults searchResults={searchResults} onAdd={addTrack} />
            <Playlist
                playlistName={playlistName}
                playlistTracks={playlistTracks}
                onRemove={removeTrack}
                onNameChange={updatePlaylistName}
                onSave={savePlaylist}
            />
          </div>
        </div>
      </div>
  );
}

export default App;
