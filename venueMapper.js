function Geocoder() {
  let address_list = sheet.getActiveRange().getValues();
  let geocodes = [];
  let address;
  for (i = 0; i < address_list.length; i++) {
    let response = Maps.newGeocoder().geocode(address_list[i]);
    let lat = response.results[0].geometry.location.lat;
    let lng = response.results[0].geometry.location.lng;
    geocodes.push([lat, lng]);
  }
  let last_row = sheet.getActiveRange().getLastRow();
  let first_row = last_row - sheet.getActiveRange().getHeight() + 1;
  sheet
    .setActiveSelection("G" + first_row + ":H" + last_row)
    .setValues(geocodes);
}

function place_to_address() {
  let location_list = sheet.getActiveRange().getValues();
  let address_list = [];
  for (i = 0; i < location_list.length; i++) {
    let response = Maps.newGeocoder()
      .setRegion("au")
      .geocode(location_list[i][0].concat(", ", location_list[i][3]));
    if (
      typeof response === "undefined" ||
      typeof response.results[0] === "undefined" ||
      typeof response.results[0].formatted_address === "undefined"
    ) {
      address_list.push([""]);
      console.log("failed to find address");
    } else {
      address_list.push([response.results[0].formatted_address]);
    }
  }
  let last_row = sheet.getActiveRange().getLastRow();
  let first_row = last_row - sheet.getActiveRange().getHeight() + 1;
  sheet
    .setActiveSelection("B" + first_row + ":B" + last_row)
    .setValues(address_list);
}

function exceltoGEOJSON() {
  let excellist = sheet.getActiveRange().getValues();
  for (i = 0; i < excellist.length; i++) {
    let geojson = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [excellist[i][6], excellist[i][7]],
      },
      properties: {
        name: excellist[i][0],
      },
    };
  }
}
