import { Request, Response } from "express";
import ICreateOwnerPlayerRequest from "../../../../player/domain/entities/ICreateOwnerPlayerRequest";
import PlayerRepository from "../../../../player/infra/prisma/respositories/PlayerRepository";
import CreateOwnerPlayerService from "../../../../player/services/CreateOwnerPlayerService/CreateOwnerPlayerService";
import CreateRoomService from "../../../services/CreateRoomService/CreateRoomService";
import RoomRepository from "../../prisma/repositories/RoomRepository";

class CreateRoomControler {
    public async execute(request: Request, response: Response): Promise<Response> {
        const { player_name, title, configurations } = request.body;

        const createRoomServide = new CreateRoomService(new RoomRepository());
        const createOwnerPlayerService = new CreateOwnerPlayerService(new PlayerRepository());

        try {
            const room = await createRoomServide.execute({ title, configurations });
            const owner = await createOwnerPlayerService.execute({
                name: player_name,
                is_owner: true,
                room
            } as ICreateOwnerPlayerRequest);

            room.owner = owner;

            return response.json(room);
        } catch (error: any) {
            return response.status(400).json({ error: error.message })
        }
    }
}

export default CreateRoomControler;