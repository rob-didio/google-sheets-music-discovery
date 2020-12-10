function runSpotSidebar() {
  /*
    Opens a Spotify Play Button of top tracks from highlighted Artist row
  */
  let artist = SpreadsheetApp.getActiveRange().getValues();
  let artistID = artist[0][8];
  let artistName = artist[0][0];
  let frame = `<iframe src="https://open.spotify.com/embed/artist/${artistID}" width="290" height="550" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
  let content = HtmlService.createHtmlOutput(frame).setTitle(
    `Spotify Top Tracks - ${artistName}`
  );
  SpreadsheetApp.getUi().showSidebar(content);
}

function runBandcampSidebar() {
  /*
    Opens a Bandcamp embed in sidebar from URL
    *
    BROKEN because bandcamp does weird URLs/Embeds. Find a solution.
  */
  let bcURL = SpreadsheetApp.getCurrentCell().getDisplayValue();
  let frame = "".concat(
    '<iframe style="border: 0; width: 290px; height: 470px;" src="https://bandcamp.com/EmbeddedPlayer/album=3634738664/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/" seamless><a href="' +
      bcURL +
      '"></a></iframe>'
  );
  let content = HtmlService.createHtmlOutput(frame).setTitle("Bandcamp");
  SpreadsheetApp.getUi().showSidebar(content);
}
