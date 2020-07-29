import React from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { getResults } from '../utilities/http';
import '../styles/style.css';

/*
 * Build a React UI that allows the user to search for historical events based
 * on a keyword. Use the full-text search features of json-server to return a
 * result to the UI for browsing. Paginate the list of events using
 * react-paginate, loading no more than ten at a time. Ensure you are
 * implementing server-side pagination  NOT client-side pagination.
*/

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      pageCount: 1,
      currentPage: 1,
      data: [],
    };
    this.handleInput = this.handleInput.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reRender = this.reRender.bind(this);
  }

  handleInput(e) {
    this.setState({
      search: e.target.value,
    });
  }

  handlePageClick({ selected }) {
    const { search } = this.state;
    this.setState({ currentPage : selected + 1 });
    getResults(selected + 1, search, this.reRender);
  }

  handleSubmit() {
    const { search } = this.state;
    getResults(1, search, this.reRender);
  }

  reRender(err, count, data) {
    if (err) {
      console.error(err);
    } else {
      console.log(count, data);
      this.setState({
        pageCount: count / 10,
        data,
      });
    }
  }

  render() {
    const { search, pageCount, data } = this.state;
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
        <div>
          {data.map((record) => <div>{record.description}</div>)}
        </div>
        <div id="react-paginate">
          <ReactPaginate
            previousLabel="previous"
            nextLabel="next"
            breakLabel="..."
            breakClassName="break-me"
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName="pagination"
            subContainerClassName="pages pagination"
            activeClassName="active"
          />
        </div>
      </div>
    );
  }
}
