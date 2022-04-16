import ICreateOwnerPlayerRequest from "../../domain/entities/ICreateOwnerPlayerRequest";
import ICreatePlayer from "../../domain/entities/ICreatePlayer";
import IPlayer from "../../domain/entities/IPlayer";
import IPlayerRepository from "../../domain/repository/IPlayerRepository";

class CreateOwnerPlayerService {
    constructor(
        private playerRepository: IPlayerRepository,
    ) { }

    async execute({ name, room }: ICreateOwnerPlayerRequest): Promise<IPlayer> {
        if(room.finished_at) {
            throw new Error('Room has been finished');
        }

        const is_owner = true;

        let is_anonymous = false;

        if (!name) {
            name = 'Anonymous';
            is_anonymous = true;
        }

        const player: ICreatePlayer = { name, is_anonymous, is_owner, room_id: room.id};

        const playerCreated = await this.playerRepository.store(player);

        return playerCreated;
    }
}

export default CreateOwnerPlayerService;