const path = require('path');
const errorHandler = require(`${path.resolve()}/api/utils/ErrorHandler`);
const twitterCredentials = require(`${path.resolve()}/.credentials/twitter_oauth_credentials.json`);
const TwitterOAuth  = require('twitter-auth-await').TwitterOAuth;
const twitterClient = new TwitterOAuth({
    consumerKey: twitterCredentials.oauth_consumer_key,
    consumerSecret: twitterCredentials.oauth_consumer_secret,
    callback: twitterCredentials.oauth_callback.dev,
  });

module.exports = {
    index: (req, res) => {
        return res.send('Hola mundo!');
    },
    getLogin: async (req, res) => {
        try{
            const redirectUri = await twitterClient.getRedirectAuthURI();
            return res.redirect(redirectUri);
        }catch(error){
            return errorHandler(res, error);
        }
    },
    callback: async (req, res) => {
        try{
            const { oauth_token: oauthToken, oauth_verifier: oauthVerifier } = req.query;
            let accessToken = await twitterClient.getAccessToken(oauthToken, oauthVerifier);
            return res.send(accessToken);
        }catch(error){
            return errorHandler(res, error);
        }
    }
}