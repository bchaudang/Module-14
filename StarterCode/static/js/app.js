  function init() {
    // dropdown menu reference selector
    var selector = d3.select("#selDataset");
  
    // Fetch the JSON data
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
    // Fetch new data each time a new test ID sample id is selected
    buildMetadata(newSampleId);
    buildCharts(newSampleId);
    
  }
  
  // Demographics Info divbox 
  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      // Find the info for the selected test ID sample
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      // Use d3 library to select the panel with id of `#sample-metadata`
      var PANEL = d3.select("#sample-metadata");
  
      // Use `.html("") to clear any existing metadata
      PANEL.html("");
  
      // Use `Object.entries` to add each key and value pair to the panel
      
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
  
    });
  }
  
