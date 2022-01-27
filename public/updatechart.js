 
    var counter = 0;
    var point = 0;
    
    function updateChart(value1, value2, value3){ // value1 = right top chart(0-100), value2 = left top chart(0-200), value3 = bottom chart (0-10000) 

        //here you can change the class of the signals in the middle container - ie change them from red to green or from green to red
        /*var element1 = document.getElementById("tsal") 
        if(element1.className == "live-icon red") console.log("found")
        if(value1 > 80 && element1.className == "live-icon red") {
          element1.classList.remove("red");
          element1.classList.add("green");
          console.log("not here")
    
         }*/

          chartInstance.data.labels.push(new Date());
          chartInstance.data.datasets.forEach((dataset) => {
              dataset.data.push(value2);
          });
          chartInstance2.data.labels.push(new Date());
          chartInstance2.data.datasets.forEach((dataset) => {
              dataset.data.push(value3);
          });
      
              chartInstance.data.labels.splice(0, 1);
        chartInstance.data.datasets[0].data.splice(0, 1);	
                  
     
     
          chartInstance2.data.labels.splice(0, 1);
              chartInstance2.data.datasets[0].data.splice(0, 1);
      
      //chartInstance3.data.datasets[0].data = [value3, 100-value3];
      var txt = value1.toString();
      //chartInstance3.options.elements.center.text = txt;
          //chartInstance3.update();
          chartInstance.update(0);
          chartInstance2.update(0);
    
      };   
     