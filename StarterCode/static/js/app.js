function init() {
    // dropdown menu reference
    var selector = d3.select("#selDataset");
  
    //  Fetch the JSON data and console log it
    d3.json("samples.json").then((data) => {
  
      var sampleNameId = data.names;
  
      sampleNameId.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first test ID sample from the list to build the initial plots
      var firstSampleId = sampleNames[0];
      buildCharts(firstSampleId);
      buildMetadata(firstSampleId);
    });
  }
  
  // Initialize the dashboard
  init();
  
  function optionChanged(newSampleId) {
    // Fetch new data each time a new test ID sample is selected
    buildMetadata(newSampleId);
    buildCharts(newSampleId);
    
  }
  