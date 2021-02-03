const express = require("express");

const {
  gamesAll,
  totalGamesCount,
  gameSearchByKeyword,
  gameSearchByID,
  gameCoverSearchByID
} = require("./controllers/games");

module.exports = function(app) {
  // Initializing route groups
  const apiRoutes = express.Router();
  const igdbRoute = express.Router(); //Let use profile as example

  /******************
   * Games Routes *
   ******************/
  //Set Profile routes as subgroup/middleware to apiRoutes
  apiRoutes.use("/igdb", igdbRoute);

  //API Route : /api/igdb/gamesAll
  igdbRoute.post("/gamesAll", gamesAll);

    //API Route : /api/igdb/totalGamesCount
  igdbRoute.post("/totalGamesCount", totalGamesCount);

  //API Route : /api/igdb/gameSearchByKeyword
  igdbRoute.post("/gameSearchByKeyword", gameSearchByKeyword);

  //API Route : /api/igdb/gameSearchByID
  igdbRoute.post("/gameSearchByID", gameSearchByID);

  //API Route : /api/igdb/gameCoverSearchByID
  igdbRoute.post("/gameCoverSearchByID", gameCoverSearchByID);

  // Set url for API group routes
  app.use("/api", apiRoutes);
};
