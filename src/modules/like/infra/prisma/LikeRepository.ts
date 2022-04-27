import ICreateLike from "../../domain/entities/ICreateLike";
import ILike from "../../domain/entities/ILike";
import ILikeRepository from "../../domain/repositories/ILikeRepository";
import prisma from "../../../../shared/infra/prisma";

class LikeRepository implements ILikeRepository {
    async store(data: ICreateLike): Promise<ILike> {
        return await prisma.favorite.create({
            data: data
        });
    }

    async findByPlayerPoint(data: ICreateLike): Promise<ILike | null> {
        return await prisma.favorite.findFirst({
            where: {
                player_id: data.player_id,
                point_id: data.point_id
            }
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.favorite.delete({
            where: {
                id
            }
        });
    }

}

export default LikeRepository;