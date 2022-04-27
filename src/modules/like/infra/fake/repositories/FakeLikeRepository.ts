import ICreateLike from "../../../domain/entities/ICreateLike";
import ILike from "../../../domain/entities/ILike";
import ILikeRepository from "../../../domain/repositories/ILikeRepository";
import crypto from 'node:crypto';

class FakeLikeRepository implements ILikeRepository {
    likes: ILike[] = [];

    async store(data: ICreateLike): Promise<ILike> {
        const newLike = {
            ...data,
            id: crypto.randomUUID()
        }   

        this.likes.push(newLike);

        return newLike;
    }

    async findByPlayerPoint(data: ICreateLike): Promise<ILike | null> {
        let likeRetrun: ILike;

        let likes: ILike[] = this.likes.filter((like) => (
            like.player_id == data.player_id && like.point_id == data.point_id 
        ));

        return likes[0];
    }

    async delete(id: string): Promise<void> { 
        const newLikes: ILike[] = [];

        this.likes.forEach(like => {
            if (like.id == id) {
                return;
            }

            newLikes.push(like);
        });

        this.likes = newLikes;
    }
}

export default FakeLikeRepository;