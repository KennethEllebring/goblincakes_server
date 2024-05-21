const fetch = require('node-fetch');
const NodeCache = require('node-cache');
require('dotenv').config({ path: './config/.env' });

const WARCRAFTLOGS_KEY = process.env.WARCRAFTLOGS_KEY;

const cache = new NodeCache({ stdTTL: 300 });

const getLogs = async (req, res) => {
    const cacheKey = `guild-logs`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        return res.json(cachedData);
    }

    try {
        const apiUrl = `https://www.warcraftlogs.com:443/v1/reports/guild/goblincakes/stormscale/EU?api_key=${WARCRAFTLOGS_KEY}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const guildLogs = await response.json();
        cache.set(cacheKey, guildLogs);

        res.json(guildLogs);
    } catch (error) {
        console.error('Failed to retrieve guild logs:', error);
        res.status(500).json({ message: "Error fetching guild logs", error: error.message });
    }
};

exports.getLogs = getLogs;
