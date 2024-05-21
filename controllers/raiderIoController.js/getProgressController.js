const fetch = require('node-fetch');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 300 });

const getProgress = async (req, res) => {
    const cacheKey = `guild-progress`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        return res.json(cachedData);
    }

    try {
        const apiUrl = `https://raider.io/api/v1/guilds/profile?region=eu&realm=stormscale&name=goblincakes&fields=raid_progression`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const guildProgress = await response.json();
        cache.set(cacheKey, guildProgress);

        res.json(guildProgress);
    } catch (error) {
        console.error('Failed to retrieve guild logs:', error);
        res.status(500).json({ message: "Error fetching guild logs", error: error.message });
    }
};

exports.getProgress = getProgress;
