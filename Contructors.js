function artistBuild(sheet) {
  let range = sheet.getActiveRange().getValues();
  let artistList = [];
  for (i = 0; i < range.length; i++) {
    let artist = {
      name: range[i][0],
      music: range[i][1],
      notes: range[i][2],
      rating: range[i][3],
      listeners: range[i][4],
      riyl1: range[i][5],
      riyl2: range[i][6],
      riyl3: range[i][7],
      spotID: range[i][8],
    };
    console.log(`New artist added: " ${artist.name}`);
    artistList.push(artist);
  }
  return artistList;
}
