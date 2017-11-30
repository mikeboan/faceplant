import React from 'react';
import { connect } from 'react-redux';

import { searchUsers } from '../../redux/modules/search';
import { selectUserSearchResults } from '../../selectors/selectors';

import SearchResultsIndex from './SearchResultsIndex';

const mapStateToProps = (state, ownProps) => ({
  results: selectUserSearchResults(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  search: query => dispatch(searchUsers(query))
});

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false, query: "" };

    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  submitSearch() {
    this.searchTimeout = window.setTimeout(
      () => {
        window.clearTimeout(this.searchTimeout);
        this.props.search(this.state.query)
      },
      300
    );
  }

  handleChange(e) {
    this.setState(
      { query: e.target.value },
      this.submitSearch
    );
  }

  handleFocus() {
    this.setState({ active: true });
  }

  handleBlur() {
    this.setState({ active: false });
  }

  render() {
    return (
      <div className='search-bar'>
        <form className='search-form' onSubmit={ this.submitSearch }>
          <input
            type='text'
            onFocus={ this.handleFocus }
            onBlur={ this.handleBlur }
            onChange={ this.handleChange }
            ></input>
          <input type='submit' value="" />
        </form>
      {
        this.state.active
          ? <SearchResultsIndex results={ this.props.results } />
          : null
      }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
