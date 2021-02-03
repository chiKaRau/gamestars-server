const axios = require('axios')

const clientID = "YOUR TWITCH CLIENT ID";
const clientSecret = "YOUR TWITCH CLIENT SECRET";

/****************
 * Access Token *
 ****************/
async function getAccessToken() {
  return await axios({
  method: 'POST',
  url: `https://id.twitch.tv/oauth2/token?client_id=${clientID}&client_secret=${clientSecret}&grant_type=client_credentials`})
  .then(res => res.data)
}

/*******
 * All *
 *******/
exports.gamesAll = async (req, res, next) => {
  try {
    let { access_token } = await getAccessToken()
    let data = await fetchGamesAll(req.body.skip, req.body.limit, access_token)
    return res.send({
      success: true,
      data: data,
      message: "Your account is created.",
    });
  } catch (e) {
    console.log("gamesAll Error -> ");
    console.log(e);
    res.status(500).send({ success: false, message: "Something broke!" });
  }
};

async function fetchGamesAll(skip, limit, access_token) {
    return await axios({
      url: "https://api.igdb.com/v4/games",
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Client-ID' : clientID,
          'Authorization' : `Bearer ${access_token}`,
      }, 
      data: `fields name; popularity; sort popularity desc; offset ${skip}; limit ${limit};`})
      .then(res =>  res.data)
}

exports.totalGamesCount = async (req, res, next) => {
  try {
    let { access_token } = await getAccessToken()
    let data = await fetchTotalGamesCount(access_token)
    return res.send({
      success: true,
      data: data,
      message: "Your account is created.",
    });
  } catch (e) {
    console.log("totalGamesCount Error -> ");
    console.log(e);
    res.status(500).send({ success: false, message: "Something broke!" });
  }
  
};

async function fetchTotalGamesCount(access_token) {
    return await axios({
      url: "https://api.igdb.com/v4/games/count",
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Client-ID' : clientID,
          'Authorization' : `Bearer ${access_token}`,
      }})
      .then(res =>  res.data)
}

/**********
 * Search *
 **********/
exports.gameSearchByKeyword = async (req, res, next) => {
  try {
    let { access_token } = await getAccessToken()
    let data = await fetchGameByKeyword(req.body.keyword, access_token)
    return res.send({
      success: true,
      data: data,
      message: "Your account is created.",
    });
  } catch (e) {
    console.log("gamesSearchByKeyword Error -> ");
    console.log(e)
    res.status(500).send({ data: "Something broke!" });
  }
};

async function fetchGameByKeyword(keyword, access_token) {
  return await axios({
      url: "https://api.igdb.com/v4/search",
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Client-ID' : clientID,
          'Authorization' : `Bearer ${access_token}`,
      },
      data: `fields *; search "${keyword}"; limit 500;`})
      .then(res =>  res.data)
}

exports.gameSearchByID = async (req, res, next) => {
  try {
    let { access_token } = await getAccessToken()
    let data = await fetchGameByID(req.body.gameId, access_token)
    return res.send({
      success: true,
      data: data,
      message: "Your account is created.",
    });
  } catch (e) {
    console.log("gamesSearchByID Error -> ");
    res.status(500).send({ data: "Something broke!" });
  }
};

async function fetchGameByID(gameId, access_token) {
  return await axios({
      url: "https://api.igdb.com/v4/games",
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Client-ID' : clientID,
          'Authorization' : `Bearer ${access_token}`,
      },
      data: `fields name, screenshots.*; where id = ${gameId};`,})
      .then(res =>  res.data)
}

exports.gameCoverSearchByID = async (req, res, next) => {
  try {
    let { access_token } = await getAccessToken()
    let data = await fetchCoverGameByID(req.body.gameId, access_token)
    return res.send({
      success: true,
      data: data,
      message: "Your account is created.",
    });
  } catch (e) {
    console.log("gamesSearchByID Error -> ");
    res.status(500).send({ data: "Something broke!" });
  }
};

async function fetchCoverGameByID(gameId, access_token) {
  return await axios({
      url: "https://api.igdb.com/v4/covers",
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Client-ID' : clientID,
          'Authorization' : `Bearer ${access_token}`,
      },
      data: `fields url; where id = ${gameId};`})
      .then(res =>  res.data)
}
