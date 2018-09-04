import jwt from 'jsonwebtoken';
import debugLogger from 'debug-logger';
import url from 'url';

import config from '../config';

const debug = debugLogger('reference-3p:request_policies');

/**
 * Redirect client to error page
 */
function sendError(res) {
  const parts = url.parse(config.reference3PFailureUrl);
  res.writeHead(303, {
    Location: url.format({
      protocol: parts.protocol,
      hostname: parts.hostname,
      port: parts.port,
      pathname: parts.pathname,
    }),
  });
  res.end();
}

/**
 * Response handler for request polices URI
 * @function responseHandler
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @returns result of res.json()
 */
export default function responseHandler(req, res) {
  let placeId;
  try { // Verify token and stop if it isn't valid
    placeId = jwt.verify(req.query.token, config.tippiqIDJwtKey).placeId;
  } catch (err) {
    debug.error('Token verification failed: ', err);
    sendError(res);
    return;
  }

  // Convert policy to json string and base64 it because it will be a URL parameter
  const policiesRequestJsonString = JSON.stringify(config.policiesRequest);
  const policiesRequestBase64 = new Buffer(policiesRequestJsonString, 'utf8').toString('base64');

  const parts = url.parse(`${config.tippiqPlacesUrl}/huis/${placeId}/huisregels`);
  res.cookie('placeId', placeId, { httpOnly: true }); // Set secure to true if using https!
  res.writeHead(303, {
    Location: url.format({
      protocol: parts.protocol,
      hostname: parts.hostname,
      port: parts.port,
      pathname: parts.pathname,
      query: {
        policiesRequest: policiesRequestBase64,
        clientId: config.clientId,
        response_type: 'code',
        redirect_uri: config.reference3PGrantUri,
        failure_uri: config.reference3PFailureUrl,
      },
    }),
  });
  res.end();
}
