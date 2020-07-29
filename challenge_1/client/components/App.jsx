import React from 'react';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    this.setState({
      search: e.target.value,
    });
  }

  handleSubmit() {
    axios.get('/events')
      .then(({ data }) => console.log(data))
      .catch((err) => console.error(err));
  }

  render() {
    const { search } = this.state;
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
      </div>
    );
  }
};
