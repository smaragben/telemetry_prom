var lab1 = 0;
    function updateChart(value2){ // value2 = left top chart(0-200)

          lab1++;
          chartInstance.data.labels.push(new Date());
          chartInstance.data.datasets.forEach((dataset) => {
              dataset.data.push(value2);
          });
      
      if(lab1>100){
              chartInstance.data.labels.splice(0, 1);
              chartInstance.data.datasets[0].data.splice(0, 1);	
                  
      }  
          chartInstance.update(0);
      };   
     