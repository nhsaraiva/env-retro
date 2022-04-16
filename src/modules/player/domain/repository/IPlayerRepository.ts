import ICreatePlayer from "../entities/ICreatePlayer";
import IPlayer from "../entities/IPlayer";

interface IPlayerRepository {
    store({ name, is_anonymous, is_owner, room_id }: ICreatePlayer): Promise<IPlayer>;
    findPlayerById(id: string): Promise<IPlayer | null>;
    delete(id: string): Promise<void>;
}

export default IPlayerRepository;