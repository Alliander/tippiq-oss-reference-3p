import config from '../config';

/**
 * Response handler to retrieve settings in frontend
 * @function responseHandler
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @returns result of res.json()
 */
export default function responseHandler(req, res) {
  const json = JSON.stringify({
    clientId: config.clientId,
    placeId: req.cookies.placeId,
    tippiqIDPUrl: config.tippiqIDPUrl,
    tippiqPlacesUrl: config.tippiqPlacesUrl,
    reference3PRequestPoliciesUrl: config.reference3PRequestPoliciesUrl,
    reference3PFailureUrl: config.reference3PFailureUrl,
  });
  res.end(json);
}
