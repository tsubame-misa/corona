import WordCloud from "react-d3-cloud";
import "./index.css";
import { useState } from "react";
import {
  hokkaido_data,
  tohoku_data,
  kanto_data,
  kansai_data,
  tyubu_data,
  tyugoku_data,
  shikoku_data,
  kyushu_data,
  zenkoku_data,
  data2,
  data1,
} from "./data/index.js";

function Header() {
  return (
    <section className="hero is-info">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">なんかやってみた</h1>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [data, setData] = useState(zenkoku_data);
  const w = window.innerWidth;
  const h = window.innerHeight;
  //const fontSizeMapper = (word) => Math.log2(word.value) * 2;
  const fontSizeMapper = (word) => word.value * (w / data[0].value / 8);
  console.log(data[0].value * fontSizeMapper);
  console.log(typeof data[0].value, typeof fontSizeMapper);

  return (
    <div>
      <Header />
      <div className="hero">
        <section
          className="section"
          style={{ paddingTop: "20px", paddingBottom: "0px" }}
        >
          <button
            className="button is-info is-outlined"
            onClick={() => setData(zenkoku_data)}
          >
            全国
          </button>
          <button
            className="button is-info is-outlined"
            onClick={() => setData(data1)}
          >
            北海道
          </button>
          <button
            className="button is-info is-outlined"
            onClick={() => setData(data2)}
          >
            東北
          </button>
          <button
            className="button is-info is-outlined"
            onClick={() => setData(kanto_data)}
          >
            関東
          </button>
          <button
            className="button is-info is-outlined"
            onClick={() => setData(kansai_data)}
          >
            関西
          </button>
          <button
            className="button is-info is-outlined"
            onClick={() => setData(tyubu_data)}
          >
            中部
          </button>
          <button
            className="button is-info is-outlined"
            onClick={() => setData(tyugoku_data)}
          >
            中国
          </button>
          <button
            className="button is-info is-outlined"
            onClick={() => setData(shikoku_data)}
          >
            四国
          </button>
          <button
            className="button is-info is-outlined"
            onClick={() => setData(kyushu_data)}
          >
            九州
          </button>
        </section>
        <section
          className="section"
          style={{ paddingTop: "20px", paddingBottom: "20px" }}
        >
          <WordCloud
            data={data}
            fontSizeMapper={fontSizeMapper}
            width={w - 50}
            height={h - 50}
            font={"Dela Gothic One"}
            /*rotate={rotate}*/
          />
        </section>
      </div>
    </div>
  );
}

export default App;
