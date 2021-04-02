import { CanvasJSChart } from "canvasjs-react-charts";
import {
  tohoku_data,
  kanto_data,
  kansai_data,
  tyubu_data,
  tyugoku_data,
  shikoku_data,
  kyushu_data,
} from "../data/bar/index.js";
import { useState } from "react";

function useStackedBar() {
  const [data, setData] = useState(kanto_data);

  /*const toggleDataSeries = (e) => {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    this.chart.render();
  };*/

  const options = {
    //height: 100,
    animationEnabled: true,
    dataPointMaxWidth: 20,
    theme: "light2",
    title: {
      text: "",
    },
    axisX: {
      /*valueFormatString: "",*/
    },
    axisY: {
      /*prefix: "",*/
    },
    toolTip: {
      //content: "{name} : {y}",
      shared: true,
    },
    /*legend: {
      cursor: "pointer",
      itemclick: toggleDataSeries,
    },*/
    data: data,
  };

  return (
    <div>
      <CanvasJSChart
        options={options} /*onRef={(ref) => (this.chart = ref)}*/
      />
    </div>
  );
}
export default useStackedBar;
