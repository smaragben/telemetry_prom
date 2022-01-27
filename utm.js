var xlsx = require("xlsx");
var utmObj = require('utm-latlng')
var utm = new utmObj();
var maxx = 0, maxy = 0, minx = 750000, miny = 1000000000;
var wb = xlsx.readFile("public/gpsdata.xlsx");
var sheet = wb.Sheets["ntua"];
var data = xlsx.utils.sheet_to_json(sheet);
var arrayx = [],  arrayy= [], i= 0, size = 0;
var newData = data.map(function(record) {
    var coordxy = utm.convertLatLngToUtm(record.lan, record.lon, 4);
    var xaxis = coordxy.Easting;
    var yaxis = coordxy.Northing;
    arrayx[i] = xaxis;
    arrayy[i] = yaxis;
    if(maxx < xaxis) maxx = xaxis;
    if(minx > xaxis) minx = xaxis;
    if(maxy < yaxis) maxy = yaxis;
    if(miny > yaxis) miny = yaxis;
    record.x = xaxis;
    record.y = yaxis;
    i++;
    return record;
});
size = i;
while(i>0) {
    arrayx[i] = ((arrayx[i] - minx)*450)/(maxx-minx);
    arrayy[i] = ((arrayy[i] - miny)*250/(maxy-miny));
    i--;
}
arrayx[0] = ((arrayx[0] - minx)*450)/(maxx-minx);
arrayy[0] = ((arrayy[0] - miny)*250/(maxy-miny));
console.log(maxx, " " + minx + " " + miny + " " + maxy + " ");
console.log(maxx - minx);
console.log(maxy- miny);
console.log(arrayx);
console.log(arrayy);
var newWB = xlsx.utils.book_new();
var newWS = xlsx.utils.json_to_sheet(newData);
xlsx.utils.book_append_sheet(newWB, newWS, "NEWDATA");

xlsx.writeFile(newWB, "Newdatafile.xlsx");
var newdata = xlsx.utils.sheet_to_;

module.exports = {arrayx, arrayy, size};
