import React from "react";
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="home-container" data-test="home_container">
    <h1>Github Battle: Battle your friends... and stuff.</h1>
    <Link className="button" to="/battle">
      Battle
    </Link>
  </div>
);

export default Home;
