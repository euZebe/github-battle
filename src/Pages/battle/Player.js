import React from "react";
import PropTypes from "prop-types";
import Profile from "./Profile";

const Player = ({ label, score, profile }) => (
  <div>
    <h1 className="header">{label}</h1>
    <h3 style={{ textAlign: "center" }}>Score: {score}</h3>
    <Profile info={profile} />
  </div>
);

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
};

export default Player;
