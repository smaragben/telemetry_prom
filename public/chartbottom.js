var chart2 = document.getElementById('line2-chart').getContext('2d')
gradient2 = chart2.createLinearGradient(0,0, 0, 450);
let c = new Array(100); for (let i=0; i<100; ++i) a[i] = i;
let d = new Array(100); for (let i=0; i<100; ++i) a[i] = 100;



gradient2.addColorStop(0, 'rgba(194, 0, 253, 0.1)');
gradient2.addColorStop(0.5, 'rgba(194, 0, 253, 0.15)');
gradient2.addColorStop(1, 'rgba(194, 0, 253, 0)');



var data2  = {
  labels: c,
    datasets: [{
        label: 'Custom Label Name',
        backgroundColor: gradient2,
        pointBackgroundColor: 'white',
        borderWidth: 1,
    borderColor: 'rgb(194, 0, 253)',
    data: d,
    pointRadius: 0
    }]
};
  var options2 = {
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
        stepValue: 100,
        max: 10000
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


    var chartInstance2 = new Chart(chart2, {
        responsive: true,
        type: 'line',
        data: data2,
        options: options2
    
    });
