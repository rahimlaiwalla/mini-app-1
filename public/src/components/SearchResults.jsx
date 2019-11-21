import React from 'react';

function SearchResults(props) {
  return (
    <li>{props.event.description}</li>
  );
}

export default SearchResults;
