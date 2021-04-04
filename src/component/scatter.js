import { CanvasJSChart } from "canvasjs-react-charts";
import { hokkaido_data } from "../data/scatter/hokkaido.js";
import { kanagawa_data } from "../data/scatter/kanagawa.js";
import { tokyo_data } from "../data/scatter/tokyo.js";
import { useState } from "react";
import { useParams } from "react-router-dom";

/*県内データでTFーIDFをかけて0.5以上だったものの出現回数上位100個のワードをどれくらい含んでいるかのベクトルを
　MDSかけて散布図にした*/
function useScatter() {
  const { prefecture_name } = useParams();
  //const [data, setData] = useState();
  let data = tokyo_data;
  //let len = 6;

  //脳死よくない
  if (prefecture_name === "hokkaido") {
    data = hokkaido_data;
  } else if (prefecture_name === "tokyo") {
    data = tokyo_data;
  } else if (prefecture_name === "kanagawa") {
    data = kanagawa_data;
  }

  const options2 = {
    //height: 100,
    indexLabelPlacement: "inside",
    animationEnabled: true,
    dataPointMaxWidth: 20,

    theme: "light2",
    title: {
      text: "",
    },
    /*axisX: {
      viewportMinimum: -0.5,
      viewportMaximum: len - 0.5,
      /*valueFormatString: "",*/
    //},
    axisY: {
      /*prefix: "",*/
      suffix: "",
    },
    toolTip: {
      content: "{label}",
      //shared: true,
    },
    /*legend: {
      cursor: "pointer",
      itemclick: toggleDataSeries,
    },*/
    data: data,
  };

  const options = {
    //height: 100,
    indexLabelPlacement: "inside",
    animationEnabled: true,
    dataPointMaxWidth: 20,

    theme: "light2",
    title: {
      text: "",
    },
    /*axisX: {
      viewportMinimum: -0.5,
      viewportMaximum: len - 0.5,
      /*valueFormatString: "",*/
    //},
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
        options={options2} /*onRef={(ref) => (this.chart = ref)}*/
      />
    </div>
  );
}
export default useScatter;
