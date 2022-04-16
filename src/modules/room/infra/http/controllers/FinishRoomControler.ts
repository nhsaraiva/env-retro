import { Request, Response } from "express"; import PlayerRepository from "../../../../player/infra/prisma/respositories/PlayerRepository";
import FinishRoomService from "../../../services/FinishRoomService/FinishRoomService";
import RoomRepository from "../../prisma/repositories/RoomRepository";

class FinishRoomControler {
    public async execute(request: Request, response: Response): Promise<Response> {
        const { room_id, player_id } = request.body;

        const finishRoomService = new FinishRoomService(new RoomRepository(), new PlayerRepository());

        try {
            const room = await finishRoomService.execute({ room_id, player_id });

            return response.json(room);
        } catch (error: any) {
            return response.status(400).json({ error: error.message })
        }
    }
}

export default FinishRoomControler;