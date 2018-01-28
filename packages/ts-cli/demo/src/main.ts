import { name } from './another';
debugger

//setInterval(() => console.log('inerval'), 500)

setTimeout(() => {
  debugger
  console.log('done');
  console.log('done');
  console.log('done');
  console.log('really done done');
}, 2500);

import * as express from 'express';
debugger

const app = express();



setTimeout(() => {
  debugger
  app.listen(3000,() => {
    debugger
    console.log('listening on 3000')
  });
}, 1000);
