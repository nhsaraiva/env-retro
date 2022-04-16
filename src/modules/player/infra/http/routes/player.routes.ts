import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";
import ExitRoomController from "../controllers/ExitRoomController";
import JoinRoomController from "../controllers/JoinRoomController";

const playerRoutes = Router();
const joinRoomController = new JoinRoomController();
const exitRoomController = new ExitRoomController();

playerRoutes.post(
    '/join',
    celebrate({
        [Segments.BODY]: {
            room_number: Joi.number().required(),
            player_name: Joi.string(),
        }
    }),
    joinRoomController.execute
);

playerRoutes.post(
    '/exit',
    celebrate({
        [Segments.BODY]: {
            player_id: Joi.string().uuid().required(),
        }
    }),
    exitRoomController.execute
);

export default playerRoutes;