import express from 'express';
import routes from './shared/http/routes';
import { errors } from 'celebrate';


const app = express();

app.use(express.json());

app.use(routes);

app.use(errors());

app.listen('8000', () => {
    console.log('Server started');
});