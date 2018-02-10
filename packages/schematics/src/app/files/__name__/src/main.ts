import * as express from 'express';

const app = express();

app.get('/', (res, req) => req.send('Hello World!'));

app.listen(3000);
console.log('Listening on port: 3000');
