const { getClientDB } = require('../db/connect');

const checkAppFormExist = async (id) => {
    const db = await getClientDB();
    const collection = db.collection('application-form');
    const form = await collection.findOne({
          _id: id,
    });
    if (!form) {
        return false;
    }
    return {id};
};

module.exports = {
    checkAppFormExist
};