import { Router } from "express";
import CreateRoomControler from "../controllers/CreateRoomController";

const roomRoutes = Router();
const createRoomController = new CreateRoomControler();

roomRoutes.post('/create', createRoomController.execute);

export default roomRoutes;