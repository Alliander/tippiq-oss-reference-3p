import _ from 'lodash';

module.exports = _.defaults(
  { // Settings via ENV vars, will override the defaults below if set
    port: process.env.PORT,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    tippiqIDPUrl: process.env.TIPPIQ_IDP_URL,
    tippiqIDJwtKey: process.env.TIPPIQ_ID_JWT_KEY,
    reference3PRequestPoliciesUrl: process.env.REFERENCE_3P_REQUEST_POLICIES_URL,
    reference3PFailureUrl: process.env.REFERENCE_3P_FAILURE_URL,
    reference3PGrantUri: process.env.REFERENCE_3P_GRANT_URL,
    tippiqPoliciesAccessTokenUrl: process.env.TIPPIQ_POLICIES_ACCESS_TOKEN_URL,
    tippiqPlacesUrl: process.env.TIPPIQ_PLACES_URL,
  },
  {
    port: '3015',

    // clientId: A (public) identifier representing the Client, supplied
    //           to the Client by the OAuth AuthorizationServer.
    clientId: 'cd5d0352-000f-11e7-8a3f-af612ece5c73',

    // clientSecret: A (private) secret used by the Client for Authentication
    //              purposes, supplied to the Client by the AuthorizationServer.
    //              The clientSecret should be kept secret at all times.
    clientSecret: 'raJoh0eifooquoh0laisahLae',

    // policiesRequest: a set of policies that the Client requests the end user to set.
    policiesRequest: [{
      title: 'Test huisregel',
      policies: [
        'reference3p_test_policy',
      ],
    }],

    // tippiqIDPUrl: URL where the OAuth flow to AuthorizationServer starts
    tippiqIDPUrl: 'https://id-acc.tippiq.nl/start',

    // tippiqIDJwtKey: Public key to verify OAuth token from Tippiq IDP AuthorizationServer
    tippiqIDJwtKey: `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEp55+xtY9E/Gau7sugTmeyGA/+Viq
pBkPFqqHGfKrPhWu+74u8lM/U7bfNTArwO6G+OgYMg8j23h378kkxh7Rlg==
-----END PUBLIC KEY-----`,

    // Return URL from Tippiq ID to 3P (See diagram in README.md)
    reference3PRequestPoliciesUrl: 'http://localhost:3015/api/request_policies',

    // Failure URL
    reference3PFailureUrl: 'http://localhost:3015/failure.html',

    // Success URL if policies are requested successfully
    reference3PGrantUri: 'http://localhost:3015/bedankt.html',

    // URL used by 3P to retrieve OAuth access token
    tippiqPoliciesAccessTokenUrl: 'https://huis-acc.tippiq.nl/api/oauth2/token',

    // URL to Tippiq Places, used as a base URL to retrieve policies via API
    tippiqPlacesUrl: 'https://huis-acc.tippiq.nl',
  },
);
