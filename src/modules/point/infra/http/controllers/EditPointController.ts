import { Request, Response } from "express";
import PlayerRepository from "../../../../player/infra/prisma/respositories/PlayerRepository";
import RoomRepository from "../../../../room/infra/prisma/repositories/RoomRepository";
import EditPointService from "../../../services/EditPointService/EditPointService";
import PointRepository from "../../prisma/repositories/PointRepository";

class EditPointController {
    async execute(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;

            const { description, player_id, room_id } = request.body;

            const editPointService = new EditPointService(
                new PointRepository(),
                new PlayerRepository(),
                new RoomRepository()
            );

            const point = editPointService.execute({
                id,
                description,
                player_id,
                room_id
            });

            return response.json(point);
        } catch (error: any) {
            return response.status(400).json({success: false});            
        }
    }
}

export default EditPointController;