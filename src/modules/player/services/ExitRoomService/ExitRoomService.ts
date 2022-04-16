import IRoomRepository from "../../../room/domains/repositories/IRoomRepository";
import IPlayerRepository from "../../domain/repository/IPlayerRepository";

class ExitRoomService {
    constructor(
        private playerRepository: IPlayerRepository,
        private roomRepository: IRoomRepository
    ){}

    async execute(player_id: string): Promise<void> {
        const player = await this.playerRepository.findPlayerById(player_id);

        if (!player) {
            throw new Error('Player not found');
        }

        if (player.is_owner) {
            throw new Error('To exit from this room finish him');
        }

        const room = await this.roomRepository.findRoomById(player.room_id);

        if (!room) {
            throw new Error('Room not found');
        }

        if (room.finished_at) {
            throw new Error('Room has been finished');
        }

        await this.playerRepository.delete(player.id);
    }
}

export default ExitRoomService;