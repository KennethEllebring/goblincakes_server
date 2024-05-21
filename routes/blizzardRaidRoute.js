const express = require('express');
const { getCharacter } = require('../controllers/blizzardRaidController/getCharacterController');
const { getGuild } = require('../controllers/blizzardRaidController/getGuildmembersController');
const { getInfo } = require('../controllers/blizzardRaidController/getInfoController');

const blizzardRaidRoute = express.Router();

blizzardRaidRoute.get('/:realm/:characterName', getCharacter);
blizzardRaidRoute.get('/guild', getGuild);
blizzardRaidRoute.get('/info', getInfo)

module.exports = {
     blizzardRaidRoute,
};