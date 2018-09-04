import cookieParser from 'cookie-parser';
import debugLogger from 'debug-logger';
import express from 'express';
import morgan from 'morgan';
import serveStatic from 'serve-static';

import { clientId, port } from './config';
import settingsAction from './actions/settings';
import requestPoliciesAction from './actions/request_policies';
import policiesAction from './actions/policies';

const debug = debugLogger('reference-3p:server');
const accessLog = debugLogger('reference-3p:access');

const app = express();

export { app as default };

app.use(morgan('combined', { stream: { write: accessLog.log } }));
app.use(cookieParser());

app.use('/api/settings', settingsAction);
app.use('/api/request_policies', requestPoliciesAction);
app.use('/api/policies', policiesAction);

app.use(serveStatic('./src/'));

app.listen(port, () => {
  debug.info('%j', { port, clientId });
});
