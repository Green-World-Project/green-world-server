import express from 'express';
import { getDocumentation } from '../controllers/documentationController'

const router = express.Router();

router.get("/green-world-api/documentation", getDocumentation);

export default router;