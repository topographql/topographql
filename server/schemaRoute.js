import express from 'express';

const router = express.Router();

import schemaController from './schemaController';

router.post('/getschema', schemaController.convertSchema, (req, res, next) => {

} );