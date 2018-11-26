import React from "react";
import queryString from "query-string";
import api from "../../utils/api";
import { Link } from "react-router-dom";
import Loading from "../common/Loading";
import Player from "./Player";

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

    api.battle([players.playerOneName, players.playerTwoName]).then(players => {
      if (players === null) {
        this.setState({
          error:
            "Looks like there was an error. Check that both users exist on Github.",
          loading: false
        });
      } else {
        this.setState({
          error: null,
          winner: players[0],
          loser: players[1],
          loading: false
        });
      }
    });
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
