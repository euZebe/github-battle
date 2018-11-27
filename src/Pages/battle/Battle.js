import React from "react";
import { Link } from "react-router-dom";
import PlayerPreview from "./PlayerPreview";
import PlayerInput from "./PlayerInput";

class Battle extends React.Component {
  state = {
    playerOneName: "",
    playerTwoName: "",
    playerOneImage: null,
    playerTwoImage: null
  };

  handleSubmit = (id, username) => {
    this.setState({
      [`${id}Name`]: username,
      [`${id}Image`]: `https://github.com/${username}.png?size=200`
    });
  };

  handleReset = id => {
    this.setState({
      [`${id}Name`]: "",
      [`${id}Image`]: null
    });
  };

  render() {
    const { match } = this.props;
    const {
      playerOneName,
      playerOneImage,
      playerTwoName,
      playerTwoImage
    } = this.state;

    return (
      <div>
        <div className="row">
          {!playerOneName && (
            <PlayerInput
              id="playerOne"
              label="Player One"
              onSubmit={this.handleSubmit}
            />
          )}

          {playerOneImage !== null && (
            <PlayerPreview avatar={playerOneImage} username={playerOneName}>
              <button
                className="reset"
                onClick={() => this.handleReset("playerOne")}
              >
                Reset
              </button>
            </PlayerPreview>
          )}

          {!playerTwoName && (
            <PlayerInput
              id="playerTwo"
              label="Player Two"
              onSubmit={this.handleSubmit}
            />
          )}

          {playerTwoImage !== null && (
            <PlayerPreview avatar={playerTwoImage} username={playerTwoName}>
              <button
                className="reset"
                onClick={() => this.handleReset("playerTwo")}
              >
                Reset
              </button>
            </PlayerPreview>
          )}
        </div>

        {playerOneImage && playerTwoImage && (
          <Link
            data-test="submit_battle"
            className="button"
            to={{
              pathname: match.url + "/results",
              search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
            }}
          >
            Battle
          </Link>
        )}
      </div>
    );
  }
}

export default Battle;
