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
import { useParams } from "react-router-dom";

//xのindexが見えちゃってる
//なんか微妙

function useStackedBar() {
  const { shibu_name } = useParams();
  //const [data, setData] = useState();
  let data = tohoku_data;

  //脳死よくない
  if (shibu_name === "tohoku") {
    //setData(tohoku_data);
    data = tohoku_data;
  } else if (shibu_name === "kanto") {
    //setData(kanto_data);
    data = kanto_data;
  } else if (shibu_name === "kansai") {
    //setData(kansai_data);
    data = kansai_data;
  } else if (shibu_name === "tyubu") {
    //setData(tyubu_data);
    data = tyubu_data;
  } else if (shibu_name === "tyugoku") {
    //setData(tyugoku_data);
    data = tyugoku_data;
  } else if (shibu_name === "shikoku") {
    //setData(shikoku_data);
    data = shikoku_data;
  } else if (shibu_name === "kyushu") {
    //setData(kyushu_data);
    data = kyushu_data;
  }

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
