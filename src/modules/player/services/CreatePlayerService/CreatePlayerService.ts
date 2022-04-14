import ICreatePlayer from "../../domain/entities/ICreatePlayer";
import ICreatePlayerRequest from "../../domain/entities/ICreatePlayerRequest";
import IPlayer from "../../domain/entities/IPlayer";
import IPlayerRepository from "../../domain/repository/IPlayerRepository";

class CreatePlayerService {
    constructor(
        private playerRepository: IPlayerRepository
    ) { }

    async execute({ name, is_owner, room_id }: ICreatePlayerRequest): Promise<IPlayer> {
        let is_anonymous = false;

        if (!name) {
            name = 'Anonymous';
            is_anonymous = true;
        }

        if (!is_owner) {
            is_owner = false;
        }

        const player: ICreatePlayer = { name, is_anonymous, is_owner, room_id};

        const playerCreated = await this.playerRepository.store(player);

        return playerCreated;
    }
}

export default CreatePlayerService;