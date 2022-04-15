import ICreatePlayer from "../../../domain/entities/ICreatePlayer";
import IPlayer from "../../../domain/entities/IPlayer";
import IPlayerRepository from "../../../domain/repository/IPlayerRepository";

class FakePlayerRepository implements IPlayerRepository {
    players: IPlayer[] = [];

    async store({ name, is_anonymous, is_owner, room_id }: ICreatePlayer): Promise<IPlayer> {
        const player = {
            id: '0b84e89b-b9de-4d74-846e-8fce64db9209',
            name,
            is_anonymous,
            is_owner,
            room_id
        };

        this.players.push(player)

        return player;
    }
}

export default FakePlayerRepository;