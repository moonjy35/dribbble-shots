const {
  getDribbbleUrl, getShots, DribbbleListType, DribbbleSortType, getRequestBody,
} = require('./dribbble');

const Dribbble = {
  getShots: async (queries) => {
    const url = getDribbbleUrl(queries);
    const result = await getRequestBody(url);
    const { body } = result;
    return getShots(body);
  },
};

module.exports = {
  Dribbble,
  DribbbleListType,
  DribbbleSortType,
};
