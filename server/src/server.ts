import express from 'express';
import cors from 'cors';
import routes from './routes';

// start app
const app = express();

// enable CORS
app.use(cors());
// enable JSON support
app.use(express.json());
// adding routes
app.use(routes);
// set port
app.listen(3333)