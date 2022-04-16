import { Router } from "express";
import CreateRoomControler from "../controllers/CreateRoomController";
import StartRoomControler from "../controllers/StartRoomControler";

import { celebrate, Joi, Segments } from 'celebrate';
import FinishRoomControler from "../controllers/FinishRoomControler";

const roomRoutes = Router();
const createRoomController = new CreateRoomControler();
const startRoomController = new StartRoomControler();
const finishRoomControler = new FinishRoomControler();

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

roomRoutes.post(
    '/finish',
    celebrate({
        [Segments.BODY]: {
            room_id: Joi.string().uuid().required(),
            player_id: Joi.string().uuid().required(),
        }
    }),
    finishRoomControler.execute
);

export default roomRoutes;