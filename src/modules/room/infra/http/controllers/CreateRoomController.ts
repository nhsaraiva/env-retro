import { Request, Response } from "express";
import CreateRoomService from "../../../services/CreateRoomService/CreateRoomService";
import RoomRepository from "../../prisma/repositories/RoomRepository";

class CreateRoomControler {
    public async execute(request: Request, response: Response): Promise<Response> {
        const userName = request.body.user_name;
        
        const createRoomServide = new CreateRoomService(new RoomRepository());

        const room = createRoomServide.execute({userName});

        return response.json(room);
    }
}

export default CreateRoomControler;