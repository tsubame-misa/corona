import { CanvasJSChart } from "canvasjs-react-charts";

function stackedBar() {
  const toggleDataSeries = (e) => {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    this.chart.render();
  };

  const options = {
    height: 100,
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "",
    },
    axisX: {
      /*valueFormatString: "",*/
    },
    axisY: {
      tickLength: 0,

      /*prefix: "",*/
    },
    toolTip: {
      shared: true,
    },
    /*legend: {
      cursor: "pointer",
      itemclick: toggleDataSeries,
    },*/
    data: [
      {
        type: "stackedBar",
        name: "Meals",
        //showInLegend: "true",
        xValueFormatString: "DD, MMM",
        yValueFormatString: "$#,##0",
        dataPoints: [{ label: "tokyo", y: 56, x: 1 }],
      },
      {
        type: "stackedBar",
        name: "Snacks",
        //showInLegend: "true",
        xValueFormatString: "DD, MMM",
        yValueFormatString: "$#,##0",
        dataPoints: [{ label: "tokyo", y: 86, x: 1 }],
      },
      {
        type: "stackedBar",
        name: "Drinks",
        //showInLegend: "true",
        xValueFormatString: "DD, MMM",
        yValueFormatString: "$#,##0",
        dataPoints: [{ label: "tokyo", y: 48, x: 1 }],
      },
      {
        type: "stackedBar",
        name: "Dessert",
        //showInLegend: "true",
        xValueFormatString: "DD, MMM",
        yValueFormatString: "$#,##0",
        dataPoints: [{ label: "tokyo", y: 80, x: 1 }],
      },
      {
        type: "stackedBar",
        name: "Takeaway",
        //showInLegend: "true",
        xValueFormatString: "DD, MMM",
        yValueFormatString: "$#,##0",
        dataPoints: [{ label: "tokyo", y: 60, x: 1 }],
      },

      {
        type: "stackedBar",
        name: "a",
        //showInLegend: "true",
        xValueFormatString: "DD, MMM",
        yValueFormatString: "$#,##0",
        dataPoints: [{ label: "kanagawa", y: 56, x: 2 }],
      },
      {
        type: "stackedBar",
        name: "b",
        //showInLegend: "true",
        xValueFormatString: "DD, MMM",
        yValueFormatString: "$#,##0",
        dataPoints: [{ label: "kanagawa", y: 86, x: 2 }],
      },
      {
        type: "stackedBar",
        name: "c",
        //showInLegend: "true",
        xValueFormatString: "DD, MMM",
        yValueFormatString: "$#,##0",
        dataPoints: [{ label: "kanagawa", y: 48, x: 2 }],
      },
      {
        type: "stackedBar",
        name: "d",
        //showInLegend: "true",
        xValueFormatString: "DD, MMM",
        yValueFormatString: "$#,##0",
        dataPoints: [{ label: "kanagawa", y: 100, x: 2 }],
      },
      {
        type: "stackedBar",
        name: "e",
        //showInLegend: "true",
        xValueFormatString: "DD, MMM",
        yValueFormatString: "$#,##0",
        dataPoints: [{ label: "kanagawa", y: 60, x: 2 }],
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart
        options={options} /*onRef={(ref) => (this.chart = ref)}*/
      />
      <CanvasJSChart
        options={options} /*onRef={(ref) => (this.chart = ref)}*/
      />
    </div>
  );
}
export default stackedBar;
