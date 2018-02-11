const {
  getDribbbleUrl, getShots, DribbbleListType, DribbbleSortType, getRequestBody,
} = require('./dribbble');

test('get dribble url : default', () => {
  const url = getDribbbleUrl();
  expect(url).toBe('https://dribbble.com/shots?list=animated&sort=comments');
});

test('get dribble url with queries, list?animated, sort=comments', () => {
  const url = getDribbbleUrl({ list: DribbbleListType.ANIMATED, sort: DribbbleSortType.COMMENTS });
  expect(url).toBe('https://dribbble.com/shots?list=animated&sort=comments');
});

test('get dribble url with queries, list?debuts, sort=views', () => {
  const url = getDribbbleUrl({ list: DribbbleListType.DEBUTS, sort: DribbbleSortType.VIEWS });
  expect(url).toBe('https://dribbble.com/shots?list=debuts&sort=views');
});

test('shot must have img, userLink, link', async () => {
  const url = getDribbbleUrl({ list: DribbbleListType.ANIMATED, sort: DribbbleSortType.COMMENTS });
  const result = await getRequestBody(url);
  const { body } = result;
  const shots = getShots(body);
  const shot = shots[0];

  expect(shot.img).toMatch(/screenshots/);
  expect(shot.userLink).toMatch(/dribbble.com/);
  expect(shot.link).toMatch(/dribbble.com/);
});
