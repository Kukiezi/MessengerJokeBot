'use strict';

import dotenv from 'dotenv'
import express from 'express';
import {router} from './api/webhook/routes/webhook';

dotenv.config();
const app = express().use(express.json());
app.listen(process.env.PORT || 3000, () => console.log('webhook is listening'));

app.use('/webhook', router);