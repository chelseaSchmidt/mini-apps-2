import React from 'react';
import ReactPaginate from 'react-paginate';
import { getResults } from '../utilities/http';
import '../styles/style.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      pageCount: 1,
      currentPage: 1,
      data: [],
    };
    this.handleEnter = this.handleEnter.bind(this);
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

  handleEnter(e) {
    e.preventDefault();
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  }

  handlePageClick({ selected }) {
    const { search } = this.state;
    this.setState({ currentPage: selected + 1 });
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
            onKeyPress={this.handleEnter}
            value={search}
          />
          <button type="button" onClick={this.handleSubmit}>Search</button>
        </form>
        <div>
          {data.map(({ date, description }) => (
            <div key={`${date}-${description.slice(0, 5)}`}>
              {description}
            </div>
          ))}
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
