import { Router } from 'express';
import likeRoutes from '../../../modules/like/infra/http/routes/likes.routes';
import playerRoutes from '../../../modules/player/infra/http/routes/player.routes';
import pointRoutes from '../../../modules/point/infra/http/routes/point.routes';
import roomRoutes from '../../../modules/room/infra/http/routes/room.routes';

const routes = Router();

routes.use('/room', roomRoutes);
routes.use('/player', playerRoutes);
routes.use('/like', likeRoutes);
routes.use('/point', pointRoutes);

export default routes;