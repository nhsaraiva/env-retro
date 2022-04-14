import ICreatePlayer from "../entities/ICreatePlayer";
import IPlayer from "../entities/IPlayer";

interface IPlayerRepository {
    store({ name, is_anonymous, is_owner, room_id }: ICreatePlayer): Promise<IPlayer>
}

export default IPlayerRepository;