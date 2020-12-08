let sheet = SpreadsheetApp.getActiveSheet();

function getArtistIDs(){
  /** 
  Grabs artist names from col 1 and finds Spotify Artist IDs, writes to Spotify ID col
   *
  BREAK OUT TO HELPER FUNCTIONS
   *
  return None
   */
  let artistList = artistBuild(sheet);
  let artistIDList = [];
  for (i=0; i < artistList.length; i++){
    let artistJSON = querySpot(artistList[i].name.split(" ").join("+"), "artist");
    if (artistJSON.artists.items == undefined | artistJSON.artists.items.length == 0){
      artistIDList.push("N/A")
      artistList[i].spotID = "N/A";}
    else{
    let artistID = artistJSON.artists.items[0].id;
    artistList[i].spotID = artistJSON.artists.items[0].id;
    artistIDList.push(artistID);}
    };
  writeColumn(artistIDList, 9);
};

function riyl(){
  /*
  Gets top three similar artists from Spotify Artist ID and adds them to RIYL column
  *
  NOT FINISHED
  *  
  return None
  */
  let artistList = artistBuild(sheet);
  for (i=0; i < artistList.length; i++){
    let riyl = [];
    let riylIn = [];
    if (artistList[i].spotID == "N/A"){
    }else{
      riyl = artistSpot(artistList[i].spotID, "related-artists");
      for (e=0; e < riyl.artists.length; e++){
        if (e > 2){
          break;
        }else{
          riylIn.push(riyl.artists[e].name);
        }
      }
    };
    artistList[i].riyl1 = riylIn[0];
    artistList[i].riyl2 = riylIn[1];
    artistList[i].riyl3 = riylIn[2];
    let last_row = sheet.getActiveRange().getLastRow();
    let first_row = last_row - sheet.getActiveRange().getHeight() + 1;
    let j = 0;
    for (t=first_row; t <= last_row; t++){
      sheet.getRange(t, 6).setValue(artistList[j].riyl1);
      sheet.getRange(t, 7).setValue(artistList[j].riyl2);
      sheet.getRange(t, 8).setValue(artistList[j].riyl3)}
      j++;
    }
};

function writeColumn(data, col){
  /* 
  Writes data gathered from apis to respective columns
  *  
  return None
  */
  let last_row = sheet.getActiveRange().getLastRow();
  let first_row = last_row - sheet.getActiveRange().getHeight() + 1;
  let j = 0;
  for (i=first_row; i <= last_row && j < data.length; i++){
    sheet.getRange(i,col).setValue(data[j]);
    j++;
  }
};

function Geocoder(){
  let address_list = sheet.getActiveRange()
                          .getValues();
  let geocodes = []
  let address;
  for (i = 0; i < address_list.length; i++){
    let response = Maps.newGeocoder()
                       .geocode(address_list[i]);
    let lat = response.results[0].geometry.location.lat;
    let lng = response.results[0].geometry.location.lng;
    geocodes.push([lat,lng]);
  };
  let last_row = sheet.getActiveRange().getLastRow();
  let first_row = last_row - sheet.getActiveRange().getHeight() + 1;
  sheet.setActiveSelection("G" + (first_row) + ":H" + (last_row))
       .setValues(geocodes);
};

function place_to_address(){
  let location_list = sheet.getActiveRange()
                           .getValues();
  let address_list = [];
  for (i = 0; i < location_list.length; i++){
    let response = Maps.newGeocoder().setRegion('au')
                       .geocode(location_list[i][0]
                       .concat(", ",location_list[i][3]));
    if (typeof response === "undefined" || 
        typeof response.results[0] === "undefined" || 
        typeof response.results[0].formatted_address === "undefined"){
      address_list.push(['']);
      console.log("failed to find address");
    }else{
      address_list.push([response.results[0].formatted_address]);
    }
  }
  let last_row = sheet.getActiveRange().getLastRow();
  let first_row = last_row - sheet.getActiveRange().getHeight() + 1;
  sheet.setActiveSelection("B" + (first_row) + ":B" + (last_row))
       .setValues(address_list);
};

function runNightly(){
  getArtistIDs();
  riyl();
};

function exceltoGEOJSON(){
  let excellist = sheet.getActiveRange().getValues()
  for (i = 0; i < excellist.length; i++){
    let geojson = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [excellist[i][6], excellist[i][7]]
      },
      "properties": {
        "name": excellist[i][0]
      }
    };
  };
};
