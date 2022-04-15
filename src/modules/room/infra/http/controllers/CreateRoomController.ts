import { Request, Response } from "express";
import ICreatePlayerRequest from "../../../../player/domain/entities/ICreatePlayerRequest";
import PlayerRepository from "../../../../player/infra/prisma/respositories/PlayerRepository";
import CreatePlayerService from "../../../../player/services/CreatePlayerService/CreatePlayerService";
import CreateRoomService from "../../../services/CreateRoomService/CreateRoomService";
import RoomRepository from "../../prisma/repositories/RoomRepository";

class CreateRoomControler {
    public async execute(request: Request, response: Response): Promise<Response> {
        const { player_name, title, configurations } = request.body;
        
        const createRoomServide = new CreateRoomService(new RoomRepository());

        const room = await createRoomServide.execute({title, configurations});

        const cratePlayer = new CreatePlayerService(new PlayerRepository());

        const owner = await cratePlayer.execute({
            name: player_name,
            is_owner: true,
            room_id: room.id
        } as ICreatePlayerRequest);

        room.owner = owner;

        return response.json(room);
    }
}

export default CreateRoomControler;