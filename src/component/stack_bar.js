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

function useStackedBar() {
  const { shibu_name } = useParams();
  //const [data, setData] = useState();
  let data = tohoku_data;
  let len = 6;

  //脳死よくない
  if (shibu_name === "tohoku") {
    //setData(tohoku_data);
    data = tohoku_data;
    len = 7;
  } else if (shibu_name === "kanto") {
    //setData(kanto_data);
    data = kanto_data;
    len = 7;
  } else if (shibu_name === "kansai") {
    //setData(kansai_data);
    data = kansai_data;
    len = 7;
  } else if (shibu_name === "tyubu") {
    //setData(tyubu_data);
    data = tyubu_data;
    len = 9;
  } else if (shibu_name === "tyugoku") {
    //setData(tyugoku_data);
    data = tyugoku_data;
    len = 5;
  } else if (shibu_name === "shikoku") {
    //setData(shikoku_data);
    data = shikoku_data;
    len = 4;
  } else if (shibu_name === "kyushu") {
    //setData(kyushu_data);
    data = kyushu_data;
    len = 8;
  }

  const options = {
    //height: 100,
    indexLabelPlacement: "inside",
    animationEnabled: true,
    dataPointMaxWidth: 20,

    theme: "light2",
    title: {
      text: "",
    },
    axisX: {
      viewportMinimum: -0.5,
      viewportMaximum: len - 0.5,
      /*valueFormatString: "",*/
    },
    axisY: {
      /*prefix: "",*/
      suffix: "%",
    },
    toolTip: {
      content: "{name} : {y}",
      //shared: true,
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
