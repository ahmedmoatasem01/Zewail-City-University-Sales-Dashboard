function fetchDataAndUpdateBarChart() {
  fetch('/get-datagpa')
      .then(response => response.json())
      .then(data => {
          updateBarChart(data);
      })
      .catch(error => console.error('Error:', error));
}

function updateBarChart(data) {
  am5.ready(function() {
      var root = am5.Root.new("gpadiv");

      root.setThemes([
          am5themes_Animated.new(root)
      ]);

      var chart = root.container.children.push(am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: "panX",
          wheelY: "zoomX",
          pinchZoomX: true
      }));
      chart.children.unshift(am5.Label.new(root, {
        text: "Trends In Tuition Fee Income (2014-2024)",
        fontSize: 15,
        fontWeight: "500",
        x: am5.percent(50),
        centerX: am5.percent(50),
        paddingTop: 0,
        paddingBottom: 0
      }));
  

      var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
          behavior: "zoomX"
      }));
      cursor.lineY.set("visible", false);

      var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
          categoryField: "year",
          renderer: am5xy.AxisRendererX.new(root, {
              minGridDistance: 30
          }),
          tooltip: am5.Tooltip.new(root, {})
      }));

      xAxis.get("renderer").labels.template.setAll({
          text: "{category}" 
      });

      var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {})
      }));

      var series = chart.series.push(am5xy.ColumnSeries.new(root, {
          name: "Tuition Fee Income",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          categoryXField: "year",
          tooltip: am5.Tooltip.new(root, {
              labelText: "{valueY}"
          })
      }));

      series.columns.template.setAll({
          cornerRadiusTL: 5,
          cornerRadiusTR: 5,
          strokeOpacity: 0
      });

      xAxis.data.setAll(data);
      series.data.setAll(data);

      series.appear(1000);
      chart.appear(1000, 100);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  fetchDataAndUpdateBarChart();
});
