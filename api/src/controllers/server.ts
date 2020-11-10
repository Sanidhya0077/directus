import { Router } from 'express';
import { ServerService } from '../services';
import { SpecificationService } from '../services';
import asyncHandler from 'express-async-handler';
import { respond } from '../middleware/respond';

const router = Router();

router.get(
	'/specs/oas',
	asyncHandler(async (req, res, next) => {
		const service = new SpecificationService({
			accountability: req.accountability,
			schema: req.schema,
		});
		res.locals.payload = await service.oas.generate();
		return next();
	}),
	respond
);

router.get('/ping', (req, res) => res.send('pong'));

router.get(
	'/info',
	asyncHandler(async (req, res, next) => {
		const service = new ServerService({
			accountability: req.accountability,
			schema: req.schema,
		});
		const data = await service.serverInfo();
		res.locals.payload = { data };
		return next();
	}),
	respond
);

export default router;
