  function init() {
    // dropdown menu reference selector
    var selector = d3.select("#selDataset");
  
    // fetch the JSON data, use variables
    d3.json("samples.json").then((data) => {
  
      var sampleNameId = data.names;
  
      sampleNameId.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // use the first test ID sample from the list to build the initial plots
      var firstSampleId = sampleNames[0];
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
  
  // demographics info divbox panel, use variables
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


    // use buildCharts function, use console to log data, use variables
    function buildCharts(sample) {
      d3.json("samples.json").then((data) => {
        console.log(data);
        var samples = data.samples;
        var resultArray = samples.filter(obj => obj.id == sample);
        var result = resultArray[0];

        // sample_values, otu_ids, otu_labels for bar chart
        var sampleValue = result.sample_values;
        var otuID = result.otu_ids;
        var otuLabel = result.otu_labels;

        // filter metadata to show results
        var metadata = data.metadata;
        var metadataArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var metaResult = metadataArray[0];

        // washing frequency of belly button
        var washFrequency = parseInt(metaResult.wfreq);

        // x and y labels(ticks) for bar charts
        var xticks = sampleValue.slice(0,10).reverse();
        var yticks = otuID.slice(0,10).reverse().map(function (elem) {return `OTU ${elem}`});
        var labels = otuLabel.slice(0,10).reverse();

        //bar chart
        var barChartData = {
          x: xticks,
          y: yticks,
          type: 'bar',
          orientation: 'horizontal',
          text: labels,
          color: 'rgb(50, 171, 96)'
        };

        // bar chart layout
        var barChartLayout = {
          title: "Top 10 OTU's Found",
        };

        // plot chart with plotly
        Plotly.newChart("bar", [barChartData], barChartLayout);
  


      })




    }