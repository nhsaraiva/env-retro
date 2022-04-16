import { Router } from "express";
import CreateRoomControler from "../controllers/CreateRoomController";
import StartRoomControler from "../controllers/StartRoomControler";

import { celebrate, Joi, Segments } from 'celebrate';

const roomRoutes = Router();
const createRoomController = new CreateRoomControler();
const startRoomController = new StartRoomControler();

roomRoutes.post(
    '/create',
    celebrate({
        [Segments.BODY]: {
            title: Joi.string().required(),
            player_name: Joi.string(),
            configurations: Joi.string(),
        }
    }),
    createRoomController.execute
);


roomRoutes.post(
    '/start',
    celebrate({
        [Segments.BODY]: {
            room_id: Joi.string().uuid().required(),
            player_id: Joi.string().uuid().required(),
        }
    }),
    startRoomController.execute
);

export default roomRoutes;