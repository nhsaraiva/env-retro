import IRoomRepository from "../../../room/domains/repositories/IRoomRepository";
import IJoinRoom from "../../domain/entities/IJoinRoom";
import IPlayer from "../../domain/entities/IPlayer";
import IPlayerRepository from "../../domain/repository/IPlayerRepository";

class JoinRoomService {
    constructor(
        private playerRepository: IPlayerRepository,
        private roomRepository: IRoomRepository,
    ) { }

    async execute({ name, room_number }: IJoinRoom): Promise<IPlayer> {
        const room = await this.roomRepository.findRoomByNumber(room_number);

        if (!room) {
            throw new Error('Room not found');
        }

        if (room.finished_at) {
            throw new Error('Room has been finished');
        }
        
        const is_owner = false;

        let is_anonymous = false;

        if (!name) {
            name = 'Anonymous';
            is_anonymous = true;
        }
        
        const player = { name, is_anonymous, is_owner, room_id: room.id};

        const playerCreated = await this.playerRepository.store(player);

        return playerCreated;
    }
}

export default JoinRoomService;