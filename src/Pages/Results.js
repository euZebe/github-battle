import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import api from "../utils/api";
import { Link } from "react-router-dom";
import PlayerPreview from "./PlayerPreview";
import Loading from "./Loading";

const Profile = ({ info }) => (
  <PlayerPreview username={info.login} avatar={info.avatar_url}>
    <ul className="space-list-items">
      {info.name && <li>{info.name}</li>}
      {info.location && <li>{info.location}</li>}
      {info.company && <li>{info.company}</li>}
      <li>Followers: {info.followers}</li>
      <li>Following: {info.following}</li>
      <li>Public Repos: {info.public_repos}</li>
      {info.blog && (
        <li>
          <a href={info.blog}>{info.blog}</a>
        </li>
      )}
    </ul>
  </PlayerPreview>
);

Profile.propTypes = {
  info: PropTypes.object.isRequired
};

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

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    };
  }
  componentDidMount() {
    const players = queryString.parse(this.props.location.search);

    api.battle([players.playerOneName, players.playerTwoName]).then(
      function(players) {
        if (players === null) {
          return this.setState(function() {
            return {
              error:
                "Looks like there was an error. Check that both users exist on Github.",
              loading: false
            };
          });
        }

        this.setState(function() {
          return {
            error: null,
            winner: players[0],
            loser: players[1],
            loading: false
          };
        });
      }.bind(this)
    );
  }
  render() {
    const error = this.state.error;
    const winner = this.state.winner;
    const loser = this.state.loser;
    const loading = this.state.loading;

    if (loading === true) {
      return <Loading />;
    }

    if (error) {
      return (
        <div>
          <p data-test="error_msg">{error}</p>
          <Link to="/battle">Reset</Link>
        </div>
      );
    }

    return (
      <div className="row">
        <Player label="1st" score={winner.score} profile={winner.profile} />
        <Player label="2nd" score={loser.score} profile={loser.profile} />
      </div>
    );
  }
}
