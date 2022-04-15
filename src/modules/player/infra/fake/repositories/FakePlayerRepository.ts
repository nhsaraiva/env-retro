import ICreatePlayer from "../../../domain/entities/ICreatePlayer";
import IPlayer from "../../../domain/entities/IPlayer";
import IPlayerRepository from "../../../domain/repository/IPlayerRepository";
import crypto from 'node:crypto';

class FakePlayerRepository implements IPlayerRepository {
    players: IPlayer[] = [];

    async store({ name, is_anonymous, is_owner, room_id }: ICreatePlayer): Promise<IPlayer> {
        const player = {
            id: crypto.randomUUID(),
            name,
            is_anonymous,
            is_owner,
            room_id
        };

        this.players.push(player)

        return player;
    }

    async findPlayerById(id: string): Promise<IPlayer | null> {
        const playersFinded = this.players.filter((player) => player.id == id);

        if (playersFinded.length > 0) {
            return playersFinded[0];
        }

        return null;
    }

}

export default FakePlayerRepository;