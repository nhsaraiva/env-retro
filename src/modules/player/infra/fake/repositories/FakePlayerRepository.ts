import ICreatePlayer from "../../../domain/entities/ICreatePlayer";
import IPlayer from "../../../domain/entities/IPlayer";
import IPlayerRepository from "../../../domain/repository/IPlayerRepository";

class FakePlayerRepository implements IPlayerRepository {
    async store({ name, is_anonymous, is_owner, room_id }: ICreatePlayer): Promise<IPlayer> {
        return {
            id: '0b84e89b-b9de-4d74-846e-8fce64db9209',
            name,
            is_anonymous,
            is_owner,
            room_id
        };
    }
}

export default FakePlayerRepository;