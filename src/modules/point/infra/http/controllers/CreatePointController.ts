import { Request, Response } from "express";
import PlayerRepository from "../../../../player/infra/prisma/respositories/PlayerRepository";
import RoomRepository from "../../../../room/infra/prisma/repositories/RoomRepository";
import CreatePointService from "../../../services/CreatePointService/CreatePointService";
import PointRepository from "../../prisma/repositories/PointRepository";

class CreatePointController {
    async execute(request: Request, response: Response): Promise<Response> {
        try {
            const { description, player_id, room_id, is_positive } = request.body;

            const createPointService = new CreatePointService(
                new PointRepository(),
                new PlayerRepository(),
                new RoomRepository()
            );

            const point = createPointService.execute({
                description,
                player_id,
                is_positive,
                room_id
            });

            return response.json(point);
        } catch (error: any) {
            return response.status(400).json({success: false});            
        }
    }
}

export default CreatePointController;