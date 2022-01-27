const csv= require('csv-parser')
const fs = require('fs')
const {InfluxDB} = require('@influxdata/influxdb-client')
const utm = require('./utm.js')
var serialport = require("serialport")

const results = []

const arrayx = utm.arrayx;
const arrayy = utm.arrayy;

function datacsv() {
  fs.createReadStream('Endurance_Germany.csv')
    .pipe(csv({}))
    .on('data', (data) => results.push(data))
    .on('end', ()=>{
      console.log(results.length)
      console.log(results[1751])
      function parser(dat) {

        var time, parts, timet, prevt, prevtime, delay, prevtimestr, timestr, minstr
        prevtimestr = dat[0]["Time"]
        parts = prevtimestr.split(":")
        prevtime = Number(parts[1])*60
        minstr = parts[2].split(".")
        prevtime += Number(minstr[0])
        var i=0;
        function myloop() {

          timestr = dat[i]["Time"]
          parts = timestr.split(":")
          time = Number(parts[1])*60
          minstr = parts[2].split(".")
          time += Number(minstr[0])

          delay = time- prevtime
          timet = time
          prevt = prevtime
          prevtime = time
          i+=50

          setTimeout(function() {
            console.log(prevt)
            console.log(timet)

            console.log(i-50)
            console.log(delay)
            if(delay !=0){
              parse(results[i-50])
              console.log("nnn")}
              myloop()
              console.log("here")},delay*1000);




        }
        myloop();

      }
      parser(results)

    })

}

const token = 'Fa9zr40yFZB1BCGScZpG7vxQ7_cesi7NxzDvghWy514glpY1cb8HKHZrRON6npwW53bjxC6p8WAIJdoCSNOxxA=='
const org = 'prom'
/*var myPort = new serialport('/dev/ttyUSB0', {
    baudRate:9600,
    parser: new serialport.parsers.Readline('\r\n')
});*/
const client = new InfluxDB({url: 'http://localhost:8086', token: token})

const {Point} = require('@influxdata/influxdb-client')
Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };
if(!Date.now) Date.now = function() { return new Date(); }
Date.time = function() { return Date.now().getUnixTime(); }

var bucket = 'tel'
var writeApi = client.getWriteApi(org, bucket)
writeApi.useDefaultTags({host: 'host1'})
var point = new Point('mem')
  .floatField('used_percent', 23.43234543)
writeApi.writePoint(point)
var mes = 0;
/*myPort.on('open', ()=>{
console.log("port is open")
});*/
bucket = 'ard'
writeApi = client.getWriteApi(org, bucket)

function parse(dict) {
  writeApi = client.getWriteApi(org, bucket)

    var date = Date.now() // or: new Date().getTime()
//      console.log(date)
    const utcDate1 = new Date(Date.UTC(96, 1, 2, 3, 4, 5));
//    console.log(utcDate1)
var parsedUnixTime = new Date('Mon, 25 Dec 1995 13:30:00 GMT').getUnixTime();
//console.log(parsedUnixTime)

  point = new Point('sensors')
      .floatField('VELOCITYX', dict["ACCEL_Y"])
    writeApi.writePoint(point)
    point = new Point('sensors')
      .floatField('VELOCITYY', dict["VELOCITY_Y"])
    writeApi.writePoint(point)
    point = new Point('sensors')
      .floatField('VELOCITYZ', dict["VELOCITY_Z"])
    writeApi.writePoint(point)
    writeApi
      .close()
      .then(() => {
          console.log('FINISHED')
      })

}



function testgps() {
    console.log("here")
    io.sockets.emit('livegpsdata',arrayx[60], arrayy[60])
    console.log(arrayx[60] + " " + arrayy[60])
}


/*
myPort.on('data', (mydata)=>{
        if(mes != mydata){
          writeApi = client.getWriteApi(org, bucket)

            string = mydata;
            dt = mydata.toString().split(" ");
            console.log(dt[0]);

            var date = Date.now() // or: new Date().getTime()
            console.log(date)
            const utcDate1 = new Date(Date.UTC(96, 1, 2, 3, 4, 5));
            console.log(utcDate1)
var parsedUnixTime = new Date('Mon, 25 Dec 1995 13:30:00 GMT').getUnixTime();
console.log(parsedUnixTime)

          point = new Point('sensors')
              .floatField('s1', dt[0])
            writeApi.writePoint(point)
            point = new Point('sensors')
              .floatField('s2', dt[1])
            writeApi.writePoint(point)
            point = new Point('sensors')
              .floatField('s3', dt[2])
            writeApi.writePoint(point)
            writeApi
              .close()
              .then(() => {
                  console.log('FINISHED')
              })


            mes = mydata;
        }
    });

*/

//getdatacsv()

module.exports = {datacsv};
