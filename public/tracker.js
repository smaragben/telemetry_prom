var arrayx = [], startx = 0, startyx = 0, y, size = 0, arrayy = [];
var ready = false, startval = false;
var counter = 0;

const canvas = document.getElementById("gps");
let context = canvas.getContext("2d");
let draw_color ='grey';
let draw_width ="0.5";
let is_drawing = false;
context.strokeStyle = draw_color;
context.lineWidth  = draw_width;
context.lineCap = "round";
context.lineJoin = "round";

canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);


function updategps(arrayy, arrayx, size) {
console.log("here")
var i = 1;
context.beginPath();
context.moveTo(arrayx[i++],arrayy[i++]);
while((size-3)>0 && i != 0) {
    console.log("here")
context.lineTo(arrayx[i],arrayy[i]);

context.stroke();
context.moveTo(arrayx[i],arrayy[i]);
size--;
i++;
}
context.lineTo(arrayx[0], arrayy[0]);
context.stroke();
context.closePath();
}


function updatelivegps(x, y) {
var found = false;
var sizeofarray = size, i = 0, d = 0;
var min = 5.0000, xvalue = x, yvalue = y;
if(!startval) {
console.log("kkk")
while(sizeofarray > 0) {
    d = Math.sqrt((arrayx[i] -x)*(arrayx[i] -x) + (arrayy[i] - y)*(arrayy[i] - y));
    console.log(d)
    if(d < min) {
        min = d;
        xvalue = arrayx[i];
        yvalue = arrayy[i];
        console.log(min +"/n")
    }
    sizeofarray--;
    i++;
 
}
console.log("found" + xvalue + " " + yvalue)
myfunction(xvalue, yvalue);
sizeofarray = size;
startval = true;
return;
}
else{
console.log("nnnn")
while(sizeofarray > 0) {
    if(Math.sqrt((arrayx[i] -x)^2 + (arrayy[i] - y)^2) < min) {
        min = Math.sqrt((arrayx[i] -x)^2 + (arrayy[i] - y)^2);
        xvalue = arrayx[i];
        yvalue = arrayy[i];
        console.log(xvalue + " " + yvalue)
    }
    sizeofarray--;
    i++;
}
sizeofarray = size;
console.log(xvalue)
}
}


function start(event) {
is_drawing = true;
context.beginPath();
context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
event.preventDefault();
}

function draw(event) {
if(is_drawing) {
context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
context.strokestyle = draw_color;
context.lineWidth  = draw_width;
context.lineCap = "round";
context.lineJoin = "round";
context.stroke();
}
}

function stop(event) {
if(is_drawing){
context.stroke();
context.closePath();
is_drawing = false;
}
event.preventDefault();
}


function myfunction(x, y){
    $('.tracker').addClass("blue");
    document.getElementById('TRACKER').style.top = y + 200 + 'px';
    document.getElementById('TRACKER').style.left = x + 1002 + 'px';

}