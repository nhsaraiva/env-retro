import { Request, Response } from "express";
import CreateRoomService from "../../../services/CreateRoomService/CreateRoomService";
import RoomRepository from "../../prisma/repositories/RoomRepository";

class CreateRoomControler {
    public async execute(request: Request, response: Response): Promise<Response> {
        const { player_name, title, configurations } = request.body;
        
        const createRoomServide = new CreateRoomService(new RoomRepository());

        const room = await createRoomServide.execute({title, configurations});

        return response.json(room);
    }
}

export default CreateRoomControler;