function spotifyAPI() {
    var spotify_creds = new Object();

    spotify_creds.id = prompt("Enter your Spotify Client ID");
    spotify_creds.secret = prompt("Enter your Spotify Client Secret");
    spotify_creds.redirect = prompt("Enter your Spotify redirect URI");

    return spotify_creds;
};
