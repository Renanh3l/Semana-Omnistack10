const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");
const {findConnections, sendMessage} = require('../websocket');

// Métodos padrão de um controller
// index, show, store, update, delete

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    // Para checar se já existe um usuário com este github
    let dev = await Dev.findOne({ github_username });

    if (!dev) {

      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = response.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });

      // Filtrar as conexões que estão a no máximo 10km de distância
      // e que o novo dev tenha pelo menos uma das tecnologias filtradas

       const sendSocketMessageTo = findConnections(
        {latitude, longitude},
        techsArray
      )
      
      sendMessage(sendSocketMessageTo, 'new-dev', dev);
      return res.json(dev);

    } else {
      
      return res.json({"error": "Dev já cadastrado!"});
    }

  },

  async update(req, res) {
    const { github_username } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (dev) {
      let {
        name = dev.name,
        bio = dev.bio,
        techs = dev.techs,
        longitude = dev.location.coordinates[0],
        latitude = dev.location.coordinates[1],
        avatar_url = dev.avatar_url
      } = req.body;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.updateOne(
        { github_username },
        {
          techs: techsArray,
          name,
          bio,
          avatar_url,
          location
        }
      );
    } else {
      return res.json({ error: "Dev não encontrado" });
    }

    return res.json({ dev });
  }
};
