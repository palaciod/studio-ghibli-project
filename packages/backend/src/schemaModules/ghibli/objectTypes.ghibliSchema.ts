import { objectType } from 'nexus';

export const Film = objectType({
  name: 'Film',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('title');
    t.nonNull.string('description');
    t.nonNull.string('director');
    t.nonNull.string('releaseDate');
    t.nonNull.int('runningTime');
    t.nonNull.int('rtScore');
    t.string('image');
    t.string('movieBanner');
  },
});
