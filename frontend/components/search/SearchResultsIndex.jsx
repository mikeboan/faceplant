import React from 'react';

import SearchResultsIndexItem from './SearchResultsIndexItem';

export default function ({ results }) {
  return (
    <ul className='search-results'>
      {
        results.map( user => <SearchResultsIndexItem user={ user } />)
      }
    </ul>
  );
}
