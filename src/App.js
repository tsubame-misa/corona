import { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import WordCloud from "./component/wordclord.js";
import StackedBar from "./component/stack_bar.js";

function Header() {
  return (
    <section className="hero is-info">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            新型コロナウイルス感染症対応地方創生臨時交付金
            <br />
            <div className="title is-4">〜目的について〜</div>
          </h1>
        </div>
      </div>
    </section>
  );
}

function App() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const size = [w, h];

  return (
    <Router>
      <Header />
      <section className="section" style={{ paddingt: "10px" }}>
        <Link to={"/"}>
          <button className="button is-info is-outlined">全国</button>
        </Link>

        <Link to={"/prefecture/tohoku"}>
          <button className="button is-info is-outlined">北海道</button>
        </Link>
        <button
          className="button is-info is-outlined"
          //onClick={() => setData(tohoku_data)}
        >
          東北
        </button>
        <button
          className="button is-info is-outlined"
          //onClick={() => setData(kanto_data)}
        >
          関東
        </button>
        <button
          className="button is-info is-outlined"
          //onClick={() => setData(kansai_data)}
        >
          関西
        </button>
        <button
          className="button is-info is-outlined"
          //onClick={() => setData(tyubu_data)}
        >
          中部
        </button>
        <button
          className="button is-info is-outlined"
          //onClick={() => setData(tyugoku_data)}
        >
          中国
        </button>
        <button
          className="button is-info is-outlined"
          //onClick={() => setData(shikoku_data)}
        >
          四国
        </button>
        <button
          className="button is-info is-outlined"
          //onClick={() => setData(kyushu_data)}
        >
          九州
        </button>
      </section>

      <Switch>
        <Route path="/" exact>
          <WordCloud />
        </Route>
        <Route path="/prefecture/:shibu_name" exact>
          <StackedBar />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
