import WordCloud from "react-d3-cloud";
import { select } from "d3-selection";
import ReactWordcloud from "react-wordcloud";
import "../index.css";
import { useState } from "react";
/*import {
  hokkaido_data,
  tohoku_data,
  kanto_data,
  kansai_data,
  tyubu_data,
  tyugoku_data,
  shikoku_data,
  kyushu_data,
  zenkoku_data,
} from "./data/index.js";*/
import { zenkoku_data } from "../data/index.js";

function getCallback(callback) {
  return function (word, event) {
    const isActive = callback !== "onWordMouseOut";
    const element = event.target;
    const text = select(element);
    text
      .transition()
      .attr("background", "white")

      .attr("text-decoration", "none");
  };
}

const callbacks = {
  getWordColor: (word) =>
    word.value > 4000 ? "#3d388f" : word.value > 2000 ? "#00A5E1" : "#53D5D7",
  //getWordTooltip: (word) =>
  //  `The word "${word.text}" appears ${word.value} times.`,
  onWordClick: getCallback("onWordClick"),
  onWordMouseOut: getCallback("onWordMouseOut"),
  onWordMouseOver: getCallback("onWordMouseOver"),
};

function WordCloudGraph() {
  //const [data, setData] = useState(zenkoku_data);
  const w = window.innerWidth;
  const h = window.innerHeight;
  const size = [w, h];
  //const fontSizeMapper = (word) => Math.log2(word.value) * 2;
  const fontSizeMapper = (word) => word.value * (w / zenkoku_data[0].value / 8);
  //console.log(data[0].value * fontSizeMapper);
  //console.log(typeof data[0].value, typeof fontSizeMapper);

  const options = {
    //colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    colors: ["#C4F2CE", "#7bedd3", "#53d5d7", "#00a5e1", "#2d58bd", "#3d388f"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "Dela Gothic One",
    fontSizes: [w / 50, w / 10],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 0,
    //rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000,
  };

  return (
    <div>
      {/*} <WordCloud
            data={data}
            fontSizeMapper={fontSizeMapper}
            width={w - 50}
            height={h - 50}
            font={"Dela Gothic One"}
  />*/}

      <ReactWordcloud
        callbacks={callbacks}
        options={options}
        size={size}
        words={zenkoku_data}
      />
    </div>
  );
}

export default WordCloudGraph;
