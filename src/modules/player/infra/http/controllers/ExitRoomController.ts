import { Request, Response } from "express";
import RoomRepository from "../../../../room/infra/prisma/repositories/RoomRepository";
import ExitRoomService from "../../../services/ExitRoomService/ExitRoomService";
import JoinRoomService from "../../../services/JoinRoomService/JoinRoomService";
import PlayerRepository from "../../prisma/respositories/PlayerRepository";

class ExitRoomController {
    async execute(request: Request, response: Response): Promise<Response> {
        const exitRoomService = new ExitRoomService(new PlayerRepository(), new RoomRepository());

        const { player_id } = request.body;

        try {
            await exitRoomService.execute(player_id);

            return response.json({success: true});
        } catch (error: any) {
            return response.status(400).json({ error: error.message })
        }
    }
}

export default ExitRoomController;