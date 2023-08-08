
import { https, setGlobalOptions } from "firebase-functions/v2";
import { Express, Request, Response } from "express";
import * as express from 'express';
import * as cors from 'cors';

setGlobalOptions({ region: 'europe-west2' });

const app: Express = express();

app.use(cors({ origin: '*' }));

app.get('/data', async (req: Request, res: Response) => {
    try {
        const request = await fetch(`https://s3.eu-west-2.amazonaws.com/interview.mock.data/payload.json`);
        const data = await request.json();
        return res.json({ status: true, ...data });
    } catch (e) {
        console.error(e);
        return res.json({ status: false });
    }
});

export const proxy = https.onRequest(app);