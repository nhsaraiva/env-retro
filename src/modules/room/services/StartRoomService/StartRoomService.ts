import IPlayerRepository from "../../../player/domain/repository/IPlayerRepository";
import IRoom from "../../domains/entities/IRoom";
import IStartRoom from "../../domains/entities/IStartRoom";
import IRoomRepository from "../../domains/repositories/IRoomRepository";

class StartRoomService {
    constructor(
        private roomRepository: IRoomRepository,
        private playerRepository: IPlayerRepository
    ) { }

    async execute({ room_id, player_id }: IStartRoom): Promise<IRoom> {
        const room = await this.roomRepository.findRoomById(room_id);

        if (!room) {
            throw new Error('Room not found');
        }

        if (room.finished_at) {
            throw new Error('Room has been finished');
        }

        if (room.started_at) {
            throw new Error('Room has been started');
        }

        const player = await this.playerRepository.findPlayerById(player_id);


        if (!player) {
            throw new Error('Player not found');
        }

        if (!player.is_owner || player.room_id != room.id) {
            throw new Error('Player is not owner to this room');
        }

        return this.roomRepository.startRoom(room_id);
    }
}

export default StartRoomService;