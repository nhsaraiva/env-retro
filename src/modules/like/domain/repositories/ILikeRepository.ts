import ICreateLike from "../entities/ICreateLike";
import ILike from "../entities/ILike";

interface ILikeRepository {
    store(data: ICreateLike): Promise<ILike>;
    findByPlayerPoint(data: ICreateLike): Promise<ILike | null>
    delete(id: string): Promise<void>;
}

export default ILikeRepository;