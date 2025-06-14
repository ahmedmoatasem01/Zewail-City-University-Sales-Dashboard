function fetchDataUpdateChart() {
    fetch('/get-datachart')
        .then(response => response.json())
        .then(data => {
            UpdateChart(data); 
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
function UpdateChart(data_df) {
    am5.ready(function() {
        var root = am5.Root.new("chartdiv");
        root.setThemes([
            am5themes_Animated.new(root),
        ]);

        var chart = root.container.children.push(
            am5percent.PieChart.new(root, {
                layout: root.verticalHorizontal
            })
        );

        // Create series
        var series = chart.series.push(
            am5percent.PieSeries.new(root, {
                name: "Series",
                valueField: "value",
                categoryField: "class"
            })
        );

        chart.children.push(am5.Label.new(root, {
            text: "Share Of Each Major",
            fontSize: 15,
            fontWeight: "500",
            paddingTop: 0,
            paddingBottom: 10,
            x: am5.percent(50), 
            centerX: am5.percent(50), 
            y: am5.percent(0), 
            centerY: am5.percent(0), 
        }));
        
        
        series.data.setAll(data_df);

        var legend = chart.children.push(am5.Legend.new(root, {
            centerX: am5.percent(50), 
            x: am5.percent(50),
            layout: root.horizontalLayout, 
            paddingTop: 10, 
            y: am5.percent(100), 
            centerY: am5.percent(100) 
        }));
        legend.data.setAll(series.dataItems);
    });
}


document.addEventListener('DOMContentLoaded', function() {
    fetchDataUpdateChart();
});
