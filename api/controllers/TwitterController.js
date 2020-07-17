const Twitter = require('twitter-lite');
const path = require('path');
const errorHandler = require(`${path.resolve()}/api/utils/ErrorHandler`);
const twitterCredentials = require(`${path.resolve()}/.credentials/twitter_oauth_credentials.json`);
const oauthClient = new Twitter({
    consumer_key: twitterCredentials.oauth_consumer_key,
    consumer_secret: twitterCredentials.oauth_consumer_secret
});

module.exports = {
    index: (req, res) => {
        return res.send('Hola mundo!');
    },

    getLogin: async (req, res) => {
        try{
            let response = await oauthClient.getRequestToken(encodeURIComponent(twitterCredentials.oauth_callback));
            return res.json(response);
        }catch(error){
            return errorHandler(res, error);
        }
    }
}