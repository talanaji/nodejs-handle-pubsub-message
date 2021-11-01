const config = require('./config');
const sendMsg = require('./helpers/sendgrid');
const saveMsg = require('./helpers/saveMsg');
const readReplaceEmailTemp = require('./readStorageFile');
const express = require('express');
const app = express();

app.use(express.json());

app.post('/', (req, res) => {
    /**
     * check if the request data not equal null
     */
    if (!req.body) {
        const msg = 'no Pub/Sub message received';
        console.error(`error: ${msg}`);
        res.status(400).send(`Bad Request: ${msg}`);
        return;
    }
    if (!req.body.message) {
        const msg = 'invalid Pub/Sub message format';
        console.error(`error: ${msg}`);
        res.status(400).send(`Bad Request: ${msg}`);
        return;
    }
    /**
     * get the pub sub message 
     */
    const pubSubMessage = req.body.message;

    const message = pubSubMessage.data
        ? Buffer.from(pubSubMessage.data, 'base64').toString().trim()
        : 'World';

    /**
     * read the email template from cloud storage and replace the content of email template with pub/sub message 
     */
    let result = readReplaceEmailTemp(message);
    /**
     *  save the result of previouse function on Big Query table 
     * */
    saveMsg(result);
    /**
     * send the result to admin email 
     */
    sendMsg('Sendgrid test email from Node.js on Google Cloud Platform', result, 'talanaji@gmail.com', 'momandkid1store@gmail.com');
});


module.exports = app;
