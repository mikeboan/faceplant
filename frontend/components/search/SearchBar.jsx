import React from 'react';
import { connect } from 'react-redux';

import { searchUsers, clearSearchResults } from '../../redux/modules/search';
import { selectUserSearchResults } from '../../selectors/selectors';

import SearchResultsIndex from './SearchResultsIndex';

const mapStateToProps = (state, ownProps) => ({
  results: selectUserSearchResults(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  search: query => dispatch(searchUsers(query)),
  clearResults: () => dispatch(clearSearchResults())
});

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, query: "" };

    this.submitSearch = this.submitSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  submitSearch() {
    if (this.state.query.length === 0) {
      window.clearTimeout(this.searchTimeout);
    } else {
      this.searchTimeout = window.setTimeout(
        () => {
          window.clearTimeout(this.searchTimeout);
          this.props.search(this.state.query)
        },
        300
      );
    }
  }

  handleChange(e) {
    this.setState(
      { query: e.target.value },
      this.submitSearch
    );
  }

  handleClick() {
    this.props.clearResults();
    this.setState({ query: "" });
  }

  show() {
    this.setState({ visible: true });
  }

  hide(e) {
    this.setState({ visible: false });
  }

  render() {
    return (
      <div className='search-bar'>
        <form className='search-form' onSubmit={ this.submitSearch }>
          <input
            type='text'
            onFocus={ this.show }
            onChange={ this.handleChange }
            placeholder="Search (ex: 'Bl')"
            value={ this.state.query }
          ></input>
        <input type='submit' value='' />
        </form>
      {
        this.state.visible
          ? <SearchResultsIndex
              results={ this.props.results }
              handleClick={ this.handleClick.bind(this) }
            />
          : null
      }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
