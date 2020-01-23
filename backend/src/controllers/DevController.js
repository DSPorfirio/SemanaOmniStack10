const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();
        
        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        
            const { name = login, avatar_url, bio } = apiResponse.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            )

            sendMessage(sendSocketMessageTo, 'newDev', dev);
        }

        return response.json(dev);
    },

    async update(request, response) {
        const { github_username, name, bio, avatar_url, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        const techsArray = parseStringAsArray(techs);

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }

        await dev.updateOne({
            name,
            bio,
            avatar_url,
            techs: techsArray,
            location,
        });

        return response.json({ dev });

    },

    async delete(request, response) {
        const { github_username } = request.query;

        let dev = await Dev.findOne({ github_username });

        await dev.deleteOne();

        return response.json({ dev });
    },


};