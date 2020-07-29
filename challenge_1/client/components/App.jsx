import React from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import '../styles/style.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      pageCount: 0,
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    this.setState({
      search: e.target.value,
    });
  }

  handlePageClick() {
    console.log('change page');
  }

  handleSubmit() {
    axios.get('/events')
      .then(({ data }) => console.log(data))
      .catch((err) => console.error(err));
  }

  render() {
    const { search, pageCount } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="search-input">Historical Events Search</label>
          <input
            id="search-input"
            name="search-input"
            type="text"
            onChange={this.handleInput}
            value={search}
          />
          <button type="button" onClick={this.handleSubmit}>Search</button>
        </form>
        <div id="react-paginate">
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>
      </div>
    );
  }
};
