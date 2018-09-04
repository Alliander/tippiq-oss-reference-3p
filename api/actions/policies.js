import request from 'superagent';
import url from 'url';
import config from '../config';

/**
 * Response handler to retrieve oauth access token from places using oauth authorization code
 * @function responseHandler
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @returns result of res.json()
 */
export default function responseHandler(req, res) {
  const authorizationCode = url.parse(req.url, true).query.code;
  const placeId = req.cookies.placeId;

  request
    .post(config.tippiqPoliciesAccessTokenUrl)
    // Add basic authentication. Note: Make sure connection is secure / SSL certificate is valid
    .auth(config.clientId, config.clientSecret)
    .send({
      grant_type: 'authorization_code',
      code: authorizationCode,
      client_id: config.clientId,
    })
    .set('Accept', 'application/json, application/x-www-form-urlencoded')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .end((err, result) => {
      if (err || !result.ok) {
        res.end(JSON.stringify({
          success: false,
          message: 'An error occured while getting the policies access_token. Is the provided code valid?',
        }));
      } else {
        const token = result.body.access_token;
        // Save access token together with placeId in db if you want to use it later
        request
          .get(`${config.tippiqPlacesUrl}/api/places/${placeId}/policies`)
          .set('Authorization', `Bearer ${token}`)
          .end((policiesErr, policiesResult) => {
            if (policiesErr) {
              res.end(err);
            } else {
              res.end(JSON.stringify(policiesResult.body));
            }
          });
      }
    });
}
