

# Jammming

Jammming is a web application built using React that allows users to search for songs on Spotify, create a playlist, and save it to their personal Spotify account. This project integrates with the Spotify Web API to perform song searches and manage playlists.

## Features
- Search Spotify for songs, albums, or artists.
- Create and manage a custom playlist.
- Save your playlist to your Spotify account.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/jammming.git
   cd jammming
   ```

2. **Install dependencies:**
   Run the following command to install all required dependencies:
   ```bash
   npm install
   ```

3. **Create `.env` file for environment variables**:
   You need to create a `.env` file in the root of your project and add your Spotify API credentials:
   ```bash
   REACT_APP_SPOTIFY_CLIENT_ID=yourSpotifyClientId
   REACT_APP_SPOTIFY_REDIRECT_URI=http://localhost:3000/
   ```

4. **Start the application:**
   Run the app locally with:
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view it.

## Spotify API Integration

To use this project with your own Spotify account, follow these steps:
1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications) and create a new application.
2. Copy your Client ID from the dashboard.
3. Set the redirect URI in the Spotify dashboard to `http://localhost:3000/` (or the production URI if deployed).
4. Add your Client ID and redirect URI to the `.env` file as described above.

## Usage

- **Search for Songs**: Use the search bar to find songs by name, artist, or album.
- **Add to Playlist**: Click the "+" button to add a song to your playlist.
- **Remove from Playlist**: Click the "-" button to remove a song from the playlist.
- **Save Playlist**: After creating your playlist, click the "SAVE TO SPOTIFY" button to save it to your Spotify account.
Here is an example of an interface for this app:
![alt text](https://github.com/Annabel-13/jamming/screenshots/jam1.png)
