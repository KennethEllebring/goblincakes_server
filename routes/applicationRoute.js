const express = require('express');
const { checkLoginToken } = require('../middleware/checkLoginToken');
const { getApplicationForm } = require('../controllers/applicationController/getApplicationFormController');
const { createApplicationForm } = require('../controllers/applicationController/createApplicationFormController')
const { editApplicationForm } = require('../controllers/applicationController/editApplicationFormController');
const { deleteApplicationForm } = require('../controllers/applicationController/deleteApplicationFormController');
const { sendApplication } = require('../controllers/applicationController/sendApplicationController');
const { getApplications } = require('../controllers/applicationController/getApplicationController');
const { deleteApplication } = require('../controllers/applicationController/deleteApplicationController');

const applicationRoute = express.Router();

applicationRoute.get('/', getApplicationForm);
applicationRoute.post('/create', checkLoginToken, createApplicationForm);
applicationRoute.patch('/update', checkLoginToken, editApplicationForm);
applicationRoute.delete('/:id', checkLoginToken, deleteApplicationForm);
applicationRoute.post('/submit', checkLoginToken, sendApplication)
applicationRoute.get('/applications', getApplications)
applicationRoute.delete('/applications/:id', checkLoginToken, deleteApplication)

module.exports = {
  applicationRoute,
};
