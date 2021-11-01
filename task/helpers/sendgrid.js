const config = require('../config');
const sendgrid = require('@sendgrid/mail');
const logger = require('logging');

sendgrid.setApiKey(config.secrets);
/**
 * @function sendMsg
 * we use this function to send message using sendgrid api key
 * @param  {} subject
 * @param  {} message
 * @param  {} to
 * @param  {} from
 */
const sendMsg = async (subject,message, to, from) => {
    await sendgrid.send({
        to: to,
        from: from,
        subject: subject,
        html: message,
    }).then(() => {
        logger.info('Message sent')
    }).catch((error) => {
        logger.error(error.response.body)
    });
}
module.exports = sendMsg;