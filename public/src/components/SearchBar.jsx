import React from 'react';
import Axios from 'axios';
import SearchResults from './SearchResults.jsx'

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      search: '',
      pageNumber: 1,
      lastPage: 0,
    };
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.getRequest = this.getRequest.bind(this);
    this.onNextSubmit = this.onNextSubmit.bind(this);
    this.onPreviousSubmit = this.onPreviousSubmit.bind(this);
    this.onLastPageClick = this.onLastPageClick.bind(this);
  }


  onSearchSubmit(request) {
    event.preventDefault();
    this.getRequest(request);
  }

  onSearchChange(event) {
    this.setState({ search: event.target.value });
  }

  onNextSubmit(request) {
    if (this.state.pageNumber < this.state.lastPage) {
      this.getRequest(request);
    }
  }

  onFirstClick(request) {
    Axios.get(`/events?q=${request}&_page=1`)
      .then((response) => {
        this.setState({ events: response.data, pageNumber: 2 }, () => {
          console.log('response: ', response);
          console.log('next page number: ', this.state.pageNumber);
        });
      });
  }

  onLastPageClick(request) {
    Axios.get(`/events?q=${request}&_page=${this.state.lastPage}`)
      .then((response) => {
        this.setState({ events: response.data, pageNumber: this.state.lastPage + 1 }, () => {
          console.log('response: ', response);
          console.log('next page number: ', this.state.pageNumber);
        });
      });
  }

  onPreviousSubmit(request) {
    if (this.state.pageNumber > 2) {
      Axios.get(`/events?q=${request}&_page=${this.state.pageNumber - 2}`)
        .then((response) => {
          // let headers = response.data.headers.link;
          // let arrayLinks = headers.split( )
          this.setState({ events: response.data, pageNumber: this.state.pageNumber - 1 }, () => {
            console.log('response: ', response);
            console.log('next page number: ', this.state.pageNumber);
          });
        });
    }
  }

  getRequest(request) {
    Axios.get(`/events?q=${request}&_page=${this.state.pageNumber}`)
      .then((response) => {
        let totalCount = response.headers['x-total-count'];
        let lastPage = Math.floor(totalCount/10 + 1);
        this.setState({ events: response.data, pageNumber: this.state.pageNumber + 1, lastPage: lastPage }, () => {
          console.log('response: ', response);
          console.log('next page number: ', this.state.pageNumber);
          console.log('last page: ', this.state.lastPage);
        });
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={() => this.onSearchSubmit(this.state.search)}>
          <label>
            {'Search Bar:  '}
            <input type="text" value={this.state.search} onChange={this.onSearchChange} />
            <input type="submit" value="submit" />
            <ul>
              {this.state.events.map((event) => {
                return <SearchResults event={event} />;
              })}
            </ul>
          </label>
        </form>
        <button className="first" type="submit" onClick={() => { this.onFirstClick(this.state.search)}}>first</button>
        <button className="previous" type="submit" onClick={() => { this.onPreviousSubmit(this.state.search)}}>Previous</button>
        <button className="next" type="submit" onClick={() => { this.onNextSubmit(this.state.search) }}>Next</button>
        <button className="last" type="submit" onClick={() => { this.onLastPageClick(this.state.search) }}>Last</button>

      </div>
    );
  }
}

export default SearchBar;
