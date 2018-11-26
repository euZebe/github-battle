import React from "react";
import PropTypes from "prop-types";

class PlayerInput extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  static defaultProps = {
    label: "Username"
  };

  state = { username: "" };

  handleChange = event => {
    const value = event.target.value;

    this.setState({ username: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.props.id, this.state.username);
  };

  render() {
    const { label } = this.props;
    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label className="header" htmlFor="username">
          {label}
        </label>
        <input
          data-test="username"
          placeholder="github username"
          type="text"
          value={this.state.username}
          autoComplete="off"
          onChange={this.handleChange}
        />
        <button
          className="button"
          type="submit"
          disabled={!this.state.username}
        >
          Submit
        </button>
      </form>
    );
  }
}

export default PlayerInput;