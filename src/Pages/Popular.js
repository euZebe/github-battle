import React from "react";
import PropTypes from "prop-types";
import api from "../utils/api";
import Loading from "./Loading";

function SelectLanguage(props) {
  const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];
  return (
    <ul className="languages">
      {languages.map(lang => (
        <li
          style={lang === props.selectedLanguage ? { color: "#d0021b" } : null}
          onClick={props.onSelect.bind(null, lang)}
          key={lang}
          data-test="filters"
        >
          {lang}
        </li>
      ))}
    </ul>
  );
}

const RepoGrid = props => (
  <ul className="popular-list">
    {props.repos.map(function(repo, index) {
      return (
        <li key={repo.name} className="popular-item" data-test="popular-item">
          <div className="popular-rank">#{index + 1}</div>
          <ul className="space-list-items">
            <li>
              <img
                className="avatar"
                src={repo.owner.avatar_url}
                alt={"Avatar for " + repo.owner.login}
              />
            </li>
            <li>
              <a href={repo.html_url}>{repo.name}</a>
            </li>
            <li>@{repo.owner.login}</li>
            <li>{repo.stargazers_count} stars</li>
          </ul>
        </li>
      );
    })}
  </ul>
);

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
};

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
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
