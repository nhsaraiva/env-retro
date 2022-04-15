import { Request, Response } from "express"; import PlayerRepository from "../../../../player/infra/prisma/respositories/PlayerRepository";
import StartRoomService from "../../../services/StartRoomService/StartRoomService";
import RoomRepository from "../../prisma/repositories/RoomRepository";

class StartRoomControler {
    public async execute(request: Request, response: Response): Promise<Response> {
        const { room_id, player_id } = request.body;

        const startRoomService = new StartRoomService(new RoomRepository(), new PlayerRepository());

        try {
            const room = await startRoomService.execute({ room_id, player_id });

            return response.json(room);
        } catch (error: any) {
            return response.json({ error }).status(400);
        }
    }
}

export default StartRoomControler;