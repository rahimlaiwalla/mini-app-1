import React from 'react';
// import ReactPaginate from 'react-paginate';
import SearchBar from './SearchBar.jsx';
// import Axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <h1>Historical Events Finder</h1>
        <SearchBar />
      </div>
    );
  }
}

export default App;
