var chart = document.getElementById('line-chart').getContext('2d') //get element by id means that in the html file you look for element that has this specific id: line-chart
//you can find that element in the left container division 
gradient = chart.createLinearGradient(0,0, 0, 450); //gradient creates the gradient affect on the line chart

gradient.addColorStop(0, 'rgba(0, 255, 224, 0.1)');
gradient.addColorStop(0.5, 'rgba(0, 255, 224, 0.15)');
gradient.addColorStop(1, 'rgba(0, 255, 224, 0)');
let a = new Array(100); for (let i=0; i<100; ++i) a[i] = i;
let b = new Array(100); for (let i=0; i<100; ++i) a[i] = 100;



// a variable that includes characteristics of the data
var data  = {
    labels: a,
      datasets: [{
          label: 'Custom Label Name',
          backgroundColor: gradient,
          pointBackgroundColor: 'white',
          borderWidth: 1,
      borderColor: 'rgb(0,255,244)',
      data: b,
      pointRadius: 0
      }]
  };

  //a variable that includes specific options
  var options = {
    responsive: false,
    maintainAspectRatio: false,
    animation: {
        easing: 'easeInOutQuad',
        duration: 120
  },
  title: {
            display: false,
        },
    scales: {
        xAxes: [{
      type: 'time',
      time: {
          displayFormats:{
              millisecond: 'mm:ss:SSS'
          }
      },
            gridLines: {
                color: 'rgba(200, 200, 200, 0.05)',
                lineWidth: 1
            }
        }],
        yAxes: [{
            gridLines: {
                color: 'rgba(200, 200, 200, 0.08)',
                lineWidth: 1
      },
      ticks: {
        min: 0,
        steps:100,
        stepValue: 2,
        max: 200
      }
        }]
    },
    elements: {
        line: {
            tension: 0.4
        }
    },
    legend: {
        display: false
    },
    tooltips: {
        titleFontFamily: 'Open Sans',
        backgroundColor: 'rgba(0,0,0,0.3)',
        titleFontColor: 'red',
        caretSize: 5,
        cornerRadius: 2,
        xPadding: 10,
        yPadding: 10
    }
};

//combine the variables options and data so that the initial variable chart takes a specific form called chartInstance
//in updatechart.js you update the chartInstance variable not the chart variable 
var chartInstance = new Chart(chart, {
    responsive: true,
    type: 'line',
    data: data,
    options: options

});