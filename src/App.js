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

        {/*<Link to={"/prefecture/hokkaido"}>
          <button className="button is-info is-outlined">北海道</button>
        </Link>
  */}
        <Link to={"/prefecture/tohoku"}>
          <button className="button is-info is-outlined">北海道・東北</button>
        </Link>

        <Link to={"/prefecture/kanto"}>
          <button className="button is-info is-outlined">関東</button>
        </Link>
        <Link to={"/prefecture/kansai"}>
          <button className="button is-info is-outlined">関西</button>
        </Link>
        <Link to={"/prefecture/tyubu"}>
          <button className="button is-info is-outlined">中部</button>
        </Link>

        <Link to={"/prefecture/tyugoku"}>
          <button className="button is-info is-outlined">中国</button>
        </Link>
        <Link to={"/prefecture/shikoku"}>
          <button className="button is-info is-outlined">四国</button>
        </Link>
        <Link to={"/prefecture/kyushu"}>
          <button className="button is-info is-outlined">九州</button>
        </Link>
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
