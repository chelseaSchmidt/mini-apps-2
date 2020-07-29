import axios from 'axios';

export const getResults = (currentPage, search, sendResults) => {
  axios({
    method: 'get',
    url: '/events',
    params: {
      _limit: 10,
      _page: currentPage,
      q: search,
    },
  })
    .then(({ headers, data }) => {
      sendResults(null, Number(headers['x-total-count']), data);
    })
    .catch((err) => sendResults(err));
};
