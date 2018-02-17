const request = require('request');
const querystring = require('querystring');
const cheerio = require('cheerio');

const DribbbleUrl = 'https://dribbble.com/shots?';
const DribbbleListType = {
  ANIMATED: 'animated',
  DEBUTS: 'debuts',
  TEAMS: 'teams',
  SHOTS: 'shots',
  ATTACHEMENTS: 'attachments',
  REBOUNDS: 'rebounds',
  PLAYOFFS: 'playoffs',
};
const DribbbleSortType = {
  COMMENTS: 'comments',
  RECENT: 'recent',
  VIEWS: 'views',
  POPULAR: 'popular',
};

const defaultDribbleQuery = { 
  list: DribbbleListType.ANIMATED, 
  sort: DribbbleSortType.COMMENTS 
};

const getDribbbleUrl = (oQuery = defaultDribbleQuery) => DribbbleUrl + querystring.stringify(oQuery);

const parseShot = ($elem) => {
  const dribbleUrl = 'https://dribbble.com';
  const $dribbleLink = $elem.find('.dribbble-link');
  const $dribbleOver = $elem.find('.dribbble-over');
  const $attributionUser = $elem.find('.attribution-user');

  const img = $dribbleLink.find('img').attr('src').replace('_teaser', '');
  const comment = $dribbleOver.find('.comment').text();
  const user = $attributionUser.find('.url').text().trim();
  const userLink = dribbleUrl + $attributionUser.find('.url').attr('href');
  const link = dribbleUrl + $dribbleLink.attr('href');

  return {
    img,
    comment,
    user,
    userLink,
    link,
  };
};

const getShots = (body) => {
  const $ = cheerio.load(body);
  const $screenShots = $('li[id^=screenshot-]');
  
  const shots = $screenShots.map((i, elem) => {
    const $elem = $(elem);
    const shot = parseShot($elem);
    return shot;
  });

  return shots;
};

const getRequestBody = url => new Promise((resolve, reject) => {
  request(url, (error, response, body) => {
    if (error) {
      reject(new Error('REQUEST_ERROR'));
      return;
    }

    resolve({ response, body });
  });
});

module.exports = {
  getShots,
  getDribbbleUrl,
  DribbbleSortType,
  DribbbleListType,
  getRequestBody,
};

