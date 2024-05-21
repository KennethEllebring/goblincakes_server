const fetch = require('node-fetch');
const NodeCache = require('node-cache');
require('dotenv').config({path: './config/.env'});

const BLIZZARD_CLIENT_ID = process.env.BLIZZARD_CLIENT_ID;
const BLIZZARD_CLIENT_SECRET = process.env.BLIZZARD_CLIENT_SECRET;
const cache = new NodeCache({ stdTTL: 3600 });

const getCharacter = async (req, res) => {
    const { characterName, realm } = req.params;

    const cacheKey = `${characterName}-${realm}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
        return res.json(cachedData);
    }

    const accessTokenUrl = `https://us.battle.net/oauth/token`;
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    const authString = Buffer.from(`${BLIZZARD_CLIENT_ID}:${BLIZZARD_CLIENT_SECRET}`).toString('base64');

    try {
        const tokenResponse = await fetch(accessTokenUrl, {
            method: 'POST',
            body: params,
            headers: {
                'Authorization': `Basic ${authString}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        // Fetch character data
        const apiUrl = `https://eu.api.blizzard.com/profile/wow/character/${realm}/${encodeURIComponent(characterName)}?namespace=profile-eu&locale=en_EU&access_token=${accessToken}`;
        const response = await fetch(apiUrl);
        const characterInfo = await response.json();

        // Fetch stats data
        const statsUrl = `https://eu.api.blizzard.com/profile/wow/character/${realm}/${encodeURIComponent(characterName)}/statistics?namespace=profile-eu&locale=en_EU&access_token=${accessToken}`;
        const statsResponse = await fetch(statsUrl);
        const statsData = await statsResponse.json();

        // Fetch media data
        const mediaUrl = `https://eu.api.blizzard.com/profile/wow/character/${realm}/${encodeURIComponent(characterName)}/character-media?namespace=profile-eu&locale=en_EU&access_token=${accessToken}`;
        const mediaResponse = await fetch(mediaUrl);
        const mediaData = await mediaResponse.json();

        // Fetch mythic+ data
        const mythicUrl = `https://eu.api.blizzard.com/profile/wow/character/${realm}/${encodeURIComponent(characterName)}/mythic-keystone-profile?namespace=profile-eu&locale=en_EU&access_token=${accessToken}`;
        const mythicResponse = await fetch(mythicUrl);
        const mythicData = await mythicResponse.json();

        // Combine character info and media data
        const result = {
            ...characterInfo,
            ...statsData,
            ...mythicData,
            media: mediaData.assets
        };

        // Store the response in cache
        cache.set(cacheKey, result);

        res.json(result);
    } catch (error) {
        console.error('Failed to retrieve character data:', error);
        res.status(500).json({ message: "Error fetching character data", error: error.message });
    }
};

exports.getCharacter = getCharacter;
