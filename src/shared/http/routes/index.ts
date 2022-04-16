import { Router } from 'express';
import playerRoutes from '../../../modules/player/infra/http/routes/player.routes';
import roomRoutes from '../../../modules/room/infra/http/routes/room.routes';

const routes = Router();

routes.use('/room', roomRoutes);
routes.use('/player', playerRoutes);

export default routes;