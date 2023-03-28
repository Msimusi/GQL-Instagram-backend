import client from "../client";

export default {
  Mutation: {
    createMovie: (
      _: any,
      { title, year, genre }: { title: string; year: number; genre: string }
    ) => client.movie.create({ data: { title, year, genre } }),

    deleteMovie: (_: any, { id }) => client.movie.delete({ where: { id } }),

    updateMovie: (_, { id, year }) =>
      client.movie.update({ where: { id }, data: { year } }),
  },
};
