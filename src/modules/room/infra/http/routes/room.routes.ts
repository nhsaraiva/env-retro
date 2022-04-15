import { Router } from "express";
import CreateRoomControler from "../controllers/CreateRoomController";
import StartRoomControler from "../controllers/StartRoomControler";

const roomRoutes = Router();
const createRoomController = new CreateRoomControler();
const startRoomController = new StartRoomControler();

roomRoutes.post('/create', createRoomController.execute);
roomRoutes.post('/start', startRoomController.execute);

export default roomRoutes;