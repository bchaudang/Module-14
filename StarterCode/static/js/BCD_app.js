function init() {    
  // drop down menu
  var selector = d3.select("#selDataset");
  
  // fetch JSON samples file data
  d3.json("samples.json").then((data) => {  
    var sampleName = data.names;
  
      sampleName.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // test ID sample from the list to build the initial plots
      var firstSampleId = sampleName[0];
      buildCharts(firstSampleId);
      buildMetadata(firstSampleId);
    });
  }
  
  // initialize the dashboard
  init();
  
  function optionChanged(newSampleId) {
    // fetch new data each time a new test ID sample id is selected
    buildMetadata(newSampleId);
    buildCharts(newSampleId);
    
  }
  
  // demographics info divbox panel 
  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;      
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      // clear the panel for existing metadate with `.html("") 
      PANEL.html("");
  
      // add each key and value pair to the panel using `Object.entries` 
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
  
    });
  }


    // use buildCharts function
    function buildCharts(sample) {
      d3.json("samples.json").then((data) => {
        console.log(data);
        var samples = data.samples;
        var resultArray = samples.filter(obj => obj.id == sample);
        var result = resultArray[0];

        // data for sample_values, otu_ids, otu_labels for charts
        var sampleValue = result.sample_values;
        var otuID = result.otu_ids;
        var otuLabel = result.otu_labels;

        // filter metadata
        var metadata = data.metadata;
        var metadataArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var metaResult = metadataArray[0];

        // washing frequency of belly button
        var washFrequency = parseInt(metaResult.wfreq);

        // x and y labels(ticks) 
        var xticks = sampleValue.slice(0,10).reverse();
        var yticks = otuID.slice(0,10).reverse().map(function (elem) {return `OTU ${elem}`});
        var labels = otuLabel.slice(0,10).reverse();

        // bar chart data
        var barChartData = {
          x: xticks,
          y: yticks,
          type: 'bar',
          orientation: 'h',
          text: labels,
          marker: {color: "#660066"}

        };

        // bar chart layout
        var barChartLayout = {
          title: "Top 10 OTU's per Sample",
          font: {color: "#660066"},
          paper_bgcolor: "#f2f2f2"
        
        };

        // plot chart with plotly
        Plotly.newPlot("bar", [barChartData], barChartLayout);


        // Gauge chart data
        var gaugeChartData = {
          value: washFrequency,
          title: {text: "Belly Button Washing Frequency<br>Scrubs per Week"},
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: {range: [0,10]},
            bar: {color: "#660066"},
            bordercolor: "#660066",
            steps: [
              {range: [0,1], color:"#ff9999"},
              {range: [1,2], color:"#ffb399"},
              {range: [2,3], color:"#ffcc99"},
              {range: [3,4], color:"#ffe699"},
              {range: [4,5], color:"#ffff99"},
              {range: [5,6], color:"#e6ff99"},
              {range: [6,7], color:"#ccff99"},
              {range: [7,8], color:"#b3ff99"},
              {range: [8,9], color:"#99ff90"},
              {range: [9,10], color:"#99ffb3"}
            ]
          }
        };
        
        // gauge chart layout
        var gaugeChartLayout = {
          width: 600, 
          height: 450, 
          margin: {t: 0, b: 0},
          font: { color: "#660066"},
          paper_bgcolor: "#f2f2f2"
        };
        
        // plot with plotly
        Plotly.newPlot("gauge", [gaugeChartData], gaugeChartLayout);
    
        // bubble chart data
        var bubbleChartData = {
          x: otuID,
          y: sampleValue,
          text: otuLabel,
          mode: 'markers',
          marker: {
            size: sampleValue,
            color: otuID
          }
        };
        
        // bubble chart layout
        var bubbleChartLayout = {
          xaxis: {title: "OTU ID"},
          showlegend: false,
          font: { color: "#660066"},
          paper_bgcolor: "#f2f2f2"
        };
        
        // plot with plotly
        Plotly.newPlot("bubble", [bubbleChartData], bubbleChartLayout);   
    
      });
     };

