const fetch = require('node-fetch');
const NodeCache = require('node-cache');
require('dotenv').config({ path: './config/.env' });

const BLIZZARD_CLIENT_ID = process.env.BLIZZARD_CLIENT_ID;
const BLIZZARD_CLIENT_SECRET = process.env.BLIZZARD_CLIENT_SECRET;
const cache = new NodeCache({ stdTTL: 3600 });

const getGuild = async (req, res) => {
    const cacheKey = `guild-roster`;
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

        const apiUrl = `https://eu.api.blizzard.com/data/wow/guild/stormscale/goblincakes/roster?namespace=profile-eu&locale=en_EU&access_token=${accessToken}`;
        const response = await fetch(apiUrl);
        const guildData = await response.json();

        const filteredMembers = guildData.members.filter(member => member.rank === 0 || member.rank === 1 || member.rank === 3 || member.rank === 4);

        const characterMediaAndDataPromises = filteredMembers.map(async member => {
            try {
                const characterMediaUrl = `https://eu.api.blizzard.com/profile/wow/character/stormscale/${encodeURIComponent(member.character.name.toLowerCase())}/character-media?namespace=profile-eu&locale=en_EU&access_token=${accessToken}`;
                const characterMediaResponse = await fetch(characterMediaUrl);
                const characterMediaData = await characterMediaResponse.json();
                const avatarAsset = characterMediaData.assets ? characterMediaData.assets.find(asset => asset.key === 'avatar') : null;

                const mythicUrl = `https://eu.api.blizzard.com/profile/wow/character/stormscale/${encodeURIComponent(member.character.name.toLowerCase())}/mythic-keystone-profile?namespace=profile-eu&locale=en_EU&access_token=${accessToken}`;
                const characterMythicResponse = await fetch(mythicUrl);
                const characterMythicData = await characterMythicResponse.json();
                return {
                    ...member,
                    characterMedia: avatarAsset ? avatarAsset.value : null,
                    characterMythicData,
                };
            } catch (mediaError) {
                console.error(`Failed to retrieve media for character ${member.character.name}:`, mediaError);
                return {
                    ...member,
                    characterMedia: null,
                    characterMythicData: null,
                };
            }
        });

        const membersWithMedia = await Promise.all(characterMediaAndDataPromises);

        cache.set(cacheKey, membersWithMedia);

        res.json(membersWithMedia);
    } catch (error) {
        console.error('Failed to retrieve character data:', error);
        res.status(500).json({ message: "Error fetching character data", error: error.message });
    }
};

exports.getGuild = getGuild;
