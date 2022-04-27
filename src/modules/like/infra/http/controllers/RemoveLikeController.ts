import { Request, Response } from "express";
import PlayerRepository from "../../../../player/infra/prisma/respositories/PlayerRepository";
import PointRepository from "../../../../point/infra/prisma/repositories/PointRepository";
import RemoveLikeService from "../../../services/RemoveLikeService/RemoveLikeService";
import SendLikeService from "../../../services/SendLikeService/SendLikeService";
import LikeRepository from "../../prisma/LikeRepository";

class RemoveLikeController {
    async execute(request: Request, response: Response): Promise<Response> {
        try {
            const { player_id, point_id } = request.body;

            const removeLikeService = new RemoveLikeService(
                new LikeRepository,
                new PlayerRepository,
                new PointRepository
            );

            await removeLikeService.execute({
                player_id,
                point_id
            });

            return response.json({success: true});
        } catch (error: any) {
            return response.status(400).json({ success: false, message: error.message })
        }
    }
}

export default RemoveLikeController;