import React from 'react';

import SearchResultsIndexItem from './SearchResultsIndexItem';

export default function ({ results, handleClick }) {
  if (results.length === 0)
    return null;

  return (
    <ul className='search-results'>
      {
        results.map( user =>
          <SearchResultsIndexItem
            user={ user }
            handleClick={ handleClick }
          />
        )
      }
    </ul>
  );
}
