# Module-14
Belly Button Challenge
--------
Complete the following steps:

1. Use the D3 library to read in samples.json from the URL "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

    - Use sample_values as the values for the bar chart.

    - Use otu_ids as the labels for the bar chart.

    - Use otu_labels as the hovertext for the chart.

3. Create a bubble chart that displays each sample.

    - Use otu_ids for the x values.

    - Use sample_values for the y values.

    - Use sample_values for the marker size.

    - Use otu_ids for the marker colors.

    - Use otu_labels for the text values.

4. Display the sample metadata, i.e., an individual's demographic information.

5. Display each key-value pair from the metadata JSON object somewhere on the page.

6. Update all the plots when a new sample is selected. Additionally, you are welcome to create any layout that you would like for your dashboard. 

7. Deploy your app to a free static page hosting service, such as GitHub Pages. Submit the links to your deployment and your GitHub repo. Ensure that your repository has regular commits and a thorough README.md file

## Resources
For this challenege, in addition to the resources provided by the instructional, the class activities and a reference guide for which activity corresponded to which section of the assignment, I also utilized online resources listed below. It was quite fun to experiment with all the different colour codes. Customizing the background colours to match what was already provided for the layout of the webpage.
Collaborating with other classmates during weekly study sessions continues to be a tremendous asset. The tutor sessions as well as the learning assitants from askBCS are extremely knowledgable and are always helpful. We covered the use of variables declared by "let" in the majority of the class activities, however during one-on-one tutorials, I learned the difference between the two. Using "var" for declaring variables instead of "let", allows the variable to be available througout the function in which they are declared, rather than only being available inside the block in which they're defined.
I also chose to create the dropdown menu panel first, and created all the charts after. Though the instructions stated otherwise. I wanted to ensure that the selector would in fact filter through the JSON data samples to appear correctly before continuing.

- [Colour codes](https://www.w3schools.com/colors/colors_picker.asp)
- [Plotly - Dropdown](https://plotly.com/javascript/dropdowns/)
- [Plotly - Bubble Charts](https://plotly.com/javascript/bubble-charts/)
- [Plotly - Gauge Charts](https://plotly.com/javascript/gauge-charts/)
- [Plotly - Bar Charts](https://plotly.com/javascript/bar-charts/#bar-chart-with-hover-text)