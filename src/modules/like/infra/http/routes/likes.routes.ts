import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import RemoveLikeController from "../controllers/RemoveLikeController";
import SendLikeController from "../controllers/SendLikeController";

const likeRoutes = Router();

const sendLikeController = new SendLikeController();
const removeLikeController = new RemoveLikeController();

likeRoutes.post(
    '/send',
    celebrate({
        [Segments.BODY]: {
            player_id: Joi.string().uuid().required(),
            point_id: Joi.string().uuid().required()
        }
    }),
    sendLikeController.execute
);

likeRoutes.post(
    '/remove',
    celebrate({
        [Segments.BODY]: {
            player_id: Joi.string().uuid().required(),
            point_id: Joi.string().uuid().required()
        }
    }),
    removeLikeController.execute
);

export default likeRoutes;
