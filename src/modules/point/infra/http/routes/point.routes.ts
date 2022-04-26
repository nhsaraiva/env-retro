import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import CreatePointController from "../controllers/CreatePointController";
import EditPointController from "../controllers/EditPointController";

const pointRoutes = Router();

const createPointController = new CreatePointController();
const editPointController = new EditPointController();

pointRoutes.post(
    '/create',
    celebrate({
        [Segments.BODY]: {
            description: Joi.string().required(),
            is_positive: Joi.bool().required(),
            player_id: Joi.string().uuid().required(),
            room_id: Joi.string().uuid().required(),
        }
    }),
    createPointController.execute
);

pointRoutes.put(
    '/edit/:id',
    celebrate({
        [Segments.BODY]: {
            description: Joi.string().required(),
            player_id: Joi.string().uuid().required(),
            room_id: Joi.string().uuid().required(),
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    editPointController.execute
);

export default pointRoutes;