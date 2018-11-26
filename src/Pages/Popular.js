import React from "react";
import PropTypes from "prop-types";
import api from "../utils/api";
import Loading from "./common/Loading";

const SelectLanguage = ({ onSelect, selectedLanguage }) => {
  const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];
  return (
    <ul className="languages">
      {languages.map(lang => (
        <li
          style={lang === selectedLanguage ? { color: "#d0021b" } : null}
          onClick={() => onSelect(lang)}
          key={lang}
          data-test="filters"
        >
          {lang}
        </li>
      ))}
    </ul>
  );
};

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

const RepoGrid = ({ repos }) => (
  <ul className="popular-list">
    {repos.map(({ name, owner, html_url, stargazers_count }, index) => {
      return (
        <li key={name} className="popular-item" data-test="popular-item">
          <div className="popular-rank">#{index + 1}</div>
          <ul className="space-list-items">
            <li>
              <img
                className="avatar"
                src={owner.avatar_url}
                alt={"Avatar for " + owner.login}
              />
            </li>
            <li>
              <a href={html_url}>{name}</a>
            </li>
            <li>@{owner.login}</li>
            <li>{stargazers_count} stars</li>
          </ul>
        </li>
      );
    })}
  </ul>
);

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
};

class Popular extends React.Component {
  state = {
    selectedLanguage: "All",
    repos: null,
    error: null
  };

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage = lang => {
    this.setState({ selectedLanguage: lang, repos: null });

    api
      .fetchPopularRepos(lang)
      .then(repos => {
        this.setState({ repos: repos });
      })
      .catch(({ response }) => this.setState({ error: response.data.message }));
  };

  render() {
    const { selectedLanguage, repos, error } = this.state;
    return error ? (
      <h3 data-test="error_msg">ERROR: {error}</h3>
    ) : (
      <div>
        <SelectLanguage
          selectedLanguage={selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!repos ? <Loading /> : <RepoGrid repos={repos} />}
      </div>
    );
  }
}

export default Popular;
