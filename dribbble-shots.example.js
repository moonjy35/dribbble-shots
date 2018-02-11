const { Dribbble, DribbbleListType, DribbbleSortType } = require('./src/index');

(async () => {
  const shots_animated_sortBy_comments = await Dribbble.getShots();
  console.log(shots_animated_sortBy_comments);

  const shots_debuts_sortBy_views = await Dribbble.getShots({ list: DribbbleListType.DEBUTS, sort: DribbbleSortType.VIEWS });
  console.log(shots_debuts_sortBy_views);
})();
