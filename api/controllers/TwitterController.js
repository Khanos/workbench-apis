const path = require('path');
const errorHandler = require(`${path.resolve()}/api/utils/ErrorHandler`);
const responseHandler = require(`${path.resolve()}/api/utils/ResponseHandler`);
const axios = require('axios');
const twitterCredentials = require(`${path.resolve()}/.credentials/twitter_oauth_credentials.json`);
const TwitterOAuth  = require('twitter-auth-await').TwitterOAuth;
const TwitterAdsAPI = require('twitter-ads');
const twitterClient = new TwitterOAuth({
    consumerKey: twitterCredentials.oauth_consumer_key,
    consumerSecret: twitterCredentials.oauth_consumer_secret,
    callback: twitterCredentials.oauth_callback.dev,
});

module.exports = {

    index: (req, res) => {
        return responseHandler(res, 'Hola mundo from TwitterController');
    },

    getLogin: async (req, res) => {
        try{
            const redirectUri = await twitterClient.getRedirectAuthURI();
            return res.redirect(redirectUri);
        }catch(error){
            return errorHandler(res, error);
        }
    },

    getAdsAccounts: async (req, res) => {
        try{
            let twitterAdsClient = new TwitterAdsAPI({
                consumer_key: twitterCredentials.oauth_consumer_key,
                consumer_secret: twitterCredentials.oauth_consumer_secret,
                access_token: twitterCredentials.testing.accessToken,
                access_token_secret: twitterCredentials.testing.accessTokenSecret,
                sandbox: false,
                api_version: '7'
            });
            twitterAdsClient.get('accounts', function(error, resp, body) {
                if (error) return errorHandler(res, error);
                return responseHandler(res, body);
            });
        }catch(error){
            return errorHandler(res, error);
        }
    },

    callback: async (req, res) => {
        try{
            const { oauth_token: oauthToken, oauth_verifier: oauthVerifier } = req.query;
            let accessToken = await twitterClient.getAccessToken(oauthToken, oauthVerifier);
            return responseHandler(res, accessToken);
        }catch(error){
            return errorHandler(res, error);
        }
    }

}