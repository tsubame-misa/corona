import WordCloud from "react-d3-cloud";
import {data} from "./data/hokkaido.js";

function App() {
  /*const data = [
    { text: "Hey", value: 1000 },
    { text: "lol", value: 200 },
    { text: "first impression", value: 800 },
    { text: "very cool", value: 1000000 },
    { text: "duck", value: 10 },
  ];*/

  const fontSizeMapper = (word) => Math.log2(word.value) * 3;
  const rotate = (word) => word.value % 360;

  return (
    <div>
      <h2>hello</h2>
      <WordCloud
        data={data}
        fontSizeMapper={fontSizeMapper}
        width={400}
        height={400}
        /*rotate={rotate}*/
      />
    </div>
  );
}

export default App;
