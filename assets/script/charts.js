google.charts.load("current", {packages:["corechart"]});
async function drawChartProblems() {
  try {
    if(!userAdminCheck) return
    const response = await fetchApi('problems/groupsCountInProblems')
    var problemData =  Object.entries(response.content)
    var header = ['Task', 'Anomalias'];
    problemData.unshift(header)

  } catch(e) {
    console.log('ERROR', e)
  }

  var data = google.visualization.arrayToDataTable(problemData);

  var options = {
    title: 'Anomalias por setor',
    is3D: true,
  };

  var chart = new google.visualization.PieChart(document.getElementById('chart-pizza-problems'));
  chart.draw(data, options);
}

async function drawChartTickets() {
  try {
    if(!userAdminCheck) return
    const response = await fetchApi('ticket/groupsCountInTickets')
    var ticketData =  Object.entries(response.content)
    var header = ['Task', 'Chamados'];
    ticketData.unshift(header)
    // console.log(ticketData)

  } catch(e) {
    console.log('ERROR', e)
  }
  var data = google.visualization.arrayToDataTable(ticketData);

  var options = {
    title: 'Chamados por setor',
    is3D: true,
  };

  var chart = new google.visualization.PieChart(document.getElementById('chart-pizza-tickets'));
  chart.draw(data, options);
}

google.charts.load('current', {'packages':['corechart', 'bar']});
async function drawStuffProblems() {
  try {
    const response = await fetchApi('problems/openSolvedCount')
    console.log('response',response)
    var ticketData =  response.content
    var header = ['Anomalias', 'Solucionadas', 'Em Aberto'];
    ticketData.unshift(header)
    
  } catch(e) {
    console.log('ERROR', e)
  }
 // var button = document.getElementById('change-chart');
  var chartDiv = document.getElementById('chart_problems');

  var data = google.visualization.arrayToDataTable(ticketData);

  var materialOptions = {
    width: 550,
    chart: {
      title: 'Anomalias mensais',
      
    },
    // series: {
    //   0: { axis: 'Geradas' }, // Bind series 0 to an axis named 'distance'.
    //   1: { axis: 'Resolvidas' } // Bind series 1 to an axis named 'brightness'.
    // },
    axes: {
      y: {
        distance: {label: 'parsecs'}, // Left y-axis.
        brightness: {side: 'right', label: 'apparent magnitude'} // Right y-axis.
      }
    }
  };

  var classicOptions = {
    width: 550,
    series: {
      0: {targetAxisIndex: 0},
      1: {targetAxisIndex: 1}
    },
    title: 'Nearby galaxies - distance on the left, brightness on the right',
    vAxes: {
      // Adds titles to each axis.
      0: {title: 'parsecs'},
      1: {title: 'apparent magnitude'}
    }
  };

  function drawMaterialChart() {
    var materialChart = new google.charts.Bar(chartDiv);
    materialChart.draw(data, google.charts.Bar.convertOptions(materialOptions));
   // button.innerText = 'Change to Classic';
   // button.onclick = drawClassicChart;
  }

  function drawClassicChart() {
    var classicChart = new google.visualization.ColumnChart(chartDiv);
    classicChart.draw(data, classicOptions);
    //button.innerText = 'Change to Material';
   // button.onclick = drawMaterialChart;
  }

  drawMaterialChart();
};



async function drawStuffTickets() {
  try {
    const response = await fetchApi('ticket/openSolvedCount')
    console.log('response',response)
    var ticketData =  response.content
    var header = ['Chamados', 'Solucionados', 'Em Aberto'];
    ticketData.unshift(header)
    
  } catch(e) {
    console.log('ERROR', e)
  }
 // var button = document.getElementById('change-chart');
  var chartDiv = document.getElementById('chart_tickets');

  var data = google.visualization.arrayToDataTable(ticketData);

  var materialOptions = {
    width: 550,
    chart: {
      title: 'Chamados Mensais',
      
    },
    // series: {
    //   0: { axis: 'Geradas' }, // Bind series 0 to an axis named 'distance'.
    //   1: { axis: 'Resolvidas' } // Bind series 1 to an axis named 'brightness'.
    // },
    axes: {
      y: {
        distance: {label: 'parsecs'}, // Left y-axis.
        brightness: {side: 'right', label: 'apparent magnitude'} // Right y-axis.
      }
    }
  };

  var classicOptions = {
    width: 550,
    series: {
      0: {targetAxisIndex: 0},
      1: {targetAxisIndex: 1}
    },
    title: 'Nearby galaxies - distance on the left, brightness on the right',
    vAxes: {
      // Adds titles to each axis.
      0: {title: 'parsecs'},
      1: {title: 'apparent magnitude'}
    }
  };

  function drawMaterialChart() {
    var materialChart = new google.charts.Bar(chartDiv);
    materialChart.draw(data, google.charts.Bar.convertOptions(materialOptions));
   // button.innerText = 'Change to Classic';
   // button.onclick = drawClassicChart;
  }

  function drawClassicChart() {
    var classicChart = new google.visualization.ColumnChart(chartDiv);
    classicChart.draw(data, classicOptions);
    //button.innerText = 'Change to Material';
   // button.onclick = drawMaterialChart;
  }

  drawMaterialChart();
};
