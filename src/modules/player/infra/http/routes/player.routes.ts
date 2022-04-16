import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";
import JoinRoomController from "../controllers/JoinRoomController";

const playerRoutes = Router();
const joinRoomController = new JoinRoomController();

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

export default playerRoutes;