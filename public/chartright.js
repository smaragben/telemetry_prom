//same idea as chart right
var donut = document.getElementById('donut-chart')
var data3 = {
       
    datasets: [{
        data: [10,90],
        labels: 'input3',
        backgroundColor: [
            'rgb(255,0,0, 0.5)',
            '#222831'
        ],
        borderColor: 'rgb(0,0,0)',
        borderWidth: 0
    }]
};


var options3= {
    scales: {
        yAxes:[{
        gridLines: {
            display:false
        },
            ticks: {
                display:false
            }
        }],
        xAxes:[{
        gridLines: {
            display:false
        },   
            ticks: {
                display: false
            }
        }]
    },
    elements: {
        center: {
            text:'0',
            color: 'rgb(255,255,255)',
            fontStyle: 'Arial',
            sidePadding: 20,
            minFontSize: 20,
            lineHeight: 25
        }
    }
}

//ignore this part i don't know how it works it's used to put text in the center of the pie chart finishes at line 132
Chart.pluginService.register({
beforeDraw: function(chart) {
if (chart.config.options.elements.center) {
  // Get ctx from string
  var ctx = chart.chart.ctx;

  // Get options from the center object in options
  var centerConfig = chart.config.options.elements.center;
  var fontStyle = centerConfig.fontStyle || 'Arial';
  var txt = centerConfig.text;
  var color = centerConfig.color || '#000';
  var maxFontSize = centerConfig.maxFontSize || 30;
  var sidePadding = centerConfig.sidePadding || 20;
  var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
  // Start with a base font of 30px
  ctx.font = "30px " + fontStyle;

  // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
  var stringWidth = ctx.measureText(txt).width;
  var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

  // Find out how much the font can grow in width.
  var widthRatio = elementWidth / stringWidth;
  var newFontSize = Math.floor(30 * widthRatio);
  var elementHeight = (chart.innerRadius * 2);

  // Pick a new font size so it will not be larger than the height of label.
  var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
  var minFontSize = centerConfig.minFontSize;
  var lineHeight = centerConfig.lineHeight || 25;
  var wrapText = false;

  if (minFontSize === undefined) {
    minFontSize = 20;
  }

  if (minFontSize && fontSizeToUse < minFontSize) {
    fontSizeToUse = minFontSize;
    wrapText = true;
  }

  // Set font settings to draw it correctly.
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
  var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
  ctx.font = fontSizeToUse + "px " + fontStyle;
  ctx.fillStyle = color;

  if (!wrapText) {
    ctx.fillText(txt, centerX, centerY);
    return;
  }

  var words = txt.split(' ');
  var line = '';
  var lines = [];

  // Break words up into multiple lines if necessary
  for (var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = ctx.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > elementWidth && n > 0) {
      lines.push(line);
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }

  // Move the center up depending on line height and number of lines
  centerY -= (lines.length / 2) * lineHeight;

  for (var n = 0; n < lines.length; n++) {
    ctx.fillText(lines[n], centerX, centerY);
    centerY += lineHeight;
  }
  //Draw text in center
  ctx.fillText(line, centerX, centerY);
}
}
});

//again here you create the variable that has the specific options and data characteristics
var chartInstance3 = new Chart(donut, {
    responsive: true,
    type: 'doughnut',
    data: data3,
    options: options3

});

