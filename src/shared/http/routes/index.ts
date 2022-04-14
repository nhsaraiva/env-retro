import { Router } from 'express';

import roomRoutes from '../../../modules/room/infra/http/routes/room.routes';

const routes = Router();

routes.use('/room', roomRoutes);

export default routes;