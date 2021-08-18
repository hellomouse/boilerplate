import express from 'express';
import { json as bodyParserJson } from 'body-parser';
import Ajv, { JSONSchemaType } from 'ajv';

let router = express.Router(); // eslint-disable-line new-cap
let jsonParse = bodyParserJson();
let ajv = new Ajv();
export let count = 0;

interface CountObject {
  count: number;
}

router.get('/', (_req, res) => res.send({ count } as CountObject));

let counterPostSchema = ajv.compile({
  type: 'object',
  properties: {
    count: { type: 'number' }
  }
} as JSONSchemaType<CountObject>);
router.post('/', jsonParse, (req, res) => {
  if (!counterPostSchema(req.body)) {
    res.status(400).send({
      status: 'error',
      error: 'VALIDATION_FAILED',
      details: counterPostSchema.errors
    });
    return;
  }
  count = req.body.count;
  res.send({ status: 'ok' });
});

export default router;
