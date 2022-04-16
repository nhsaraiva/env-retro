import { Request, Response } from "express";
import RoomRepository from "../../../../room/infra/prisma/repositories/RoomRepository";
import JoinRoomService from "../../../services/JoinRoomService/JoinRoomService";
import PlayerRepository from "../../prisma/respositories/PlayerRepository";

class JoinRoomController {
    async execute(request: Request, response: Response): Promise<Response> {
        const joinRoomService = new JoinRoomService(new PlayerRepository(), new RoomRepository());

        const { player_name, room_number } = request.body;

        try {
            const playerJoined = await joinRoomService.execute({
                name: player_name,
                room_number: room_number
            });

            return response.json(playerJoined);
        } catch (error: any) {
            return response.status(400).json({ error: error.message })
        }
    }
}

export default JoinRoomController;