const resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate
    // the homepage grid of our web client
    tracksForHome: (_parent, _args, {dataSources}) => {
      return dataSources.trackAPI.getTracksForHome();
    },
    track: (_parent, {id}, {dataSources}) => {
      return dataSources.trackAPI.getTrack(id);
    },
    spaceCats: (_parent, _args, {dataSources}) => {
      // write your code here
      return dataSources.spaceCatsAPI.getSpaceCats();
    },
    spaceCat: (_, {id}, {dataSources}) => {
      return dataSources.spaceCatsAPI.getSpaceCat(id);
    },
  },
  Mutation: {
    incrementTrackViews: async (_parent, {id}, {dataSources}) => {
      try {
        const track = await dataSources.trackAPI.incrementTrackViews(id);
        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for track ${id}`,
          track,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          track: null,
        };
      }
    },
    assignSpaceship: async (_parent, {spaceshipId, missionId}, {dataSources}) => {
      try {
        const data = await dataSources.spaceAPI.assignSpaceshipToMission(spaceshipId, missionId);
        return {
          code: 200,
          success: true,
          message: `Successfully assigned spaceship ${spaceshipId} to mission ${missionId}`,
          spaceship: data.spaceship,
          mission: data.mission,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          spaceship: null,
          mission: null,
        };
      }
    },
  },
  Track: {
    author: ({authorId}, _args, {dataSources}) => {
      return dataSources.trackAPI.getAuthor(authorId);
    },
    modules: ({id}, _, {dataSources}) => {
      return dataSources.trackAPI.getTrackModules(id);
    },
    durationInSeconds: ({length}) => length,
  },
  Module: {
    durationInSeconds: ({length}) => length,
  },
  SpaceCat: {
    missions: ({catId}, _args, {dataSources}) => {
      return dataSources.spaceCatsAPI.getMissions(catId);
    }
  }
};

module.exports = resolvers;