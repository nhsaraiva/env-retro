import IPlayerRepository from "../../../player/domain/repository/IPlayerRepository";
import IPointRepository from "../../../point/domain/repositories/IPointRepository";
import ICreateLike from "../../domain/entities/ICreateLike";
import ILikeRepository from "../../domain/repositories/ILikeRepository";

class RemoveLikeService {
    constructor(
        private likeRepository: ILikeRepository,
        private playerRepository: IPlayerRepository,
        private pointRepository: IPointRepository
    ){}

    async execute(data: ICreateLike): Promise<void> {
        const point = await this.pointRepository.findPointById(data.point_id);

        if (!point) { 
            throw new Error('Point not found');
        }
        
        const player = await this.playerRepository.findPlayerById(data.player_id);

        if (!player) {
            throw new Error('Player not found');
        }
        
        if (player.id == point.player_id) {
            throw new Error('Player is owner to this point');
        }

        const like = await this.likeRepository.findByPlayerPoint(data);

        if (!like) {
            throw new Error('Player not send like to this point')
        }

        await this.likeRepository.delete(like.id);
    }
}

export default RemoveLikeService;