import { Request, Response } from "express";
import PlayerRepository from "../../../../player/infra/prisma/respositories/PlayerRepository";
import PointRepository from "../../../../point/infra/prisma/repositories/PointRepository";
import SendLikeService from "../../../services/SendLikeService/SendLikeService";
import LikeRepository from "../../prisma/LikeRepository";

class SendLikeController {
    async execute(request: Request, response: Response): Promise<Response> {
        try {
            const { player_id, point_id } = request.body;

            const sendLikeService = new SendLikeService(
                new LikeRepository,
                new PlayerRepository,
                new PointRepository
            );

            const like = await sendLikeService.execute({
                player_id,
                point_id
            });

            return response.json({success: true, data: like});
        } catch (error: any) {
            return response.status(400).json({ success: false, message: error.message })
        }
    }
}

export default SendLikeController;