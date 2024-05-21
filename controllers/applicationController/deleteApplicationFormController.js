const { getClientDB } = require('../../db/connect');
const { checkAppFormExist } = require('../../model/applicationFormModel');

const deleteApplicationForm = async (req, res) => {
    const { id } = req.params;

    const checkForm = await checkAppFormExist(parseInt(id));

    if (checkForm === false) {
          return res.status(404).json({message: "form doesn't exist"});
    } else {
          try {
            const db = await getClientDB();
            const collection = db.collection('application-form');
      
            await collection.deleteOne({ _id: parseInt(id) });
      
            return res.status(200).json({message: 'Form question deleted successfully'});
          } catch (err) {
            console.error(err);
            return res.status(400).json({message: 'Error deleting form'});
        }
    }
};

exports.deleteApplicationForm = deleteApplicationForm;
