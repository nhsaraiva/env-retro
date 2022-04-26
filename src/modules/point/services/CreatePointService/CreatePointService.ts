import IPlayerRepository from "../../../player/domain/repository/IPlayerRepository";
import IRoomRepository from "../../../room/domains/repositories/IRoomRepository";
import ICreatePoint from "../../domain/entities/ICreatePoint";
import IPointRepository from "../../domain/repositories/IPointRepository";

class CreatePointService {
    constructor(
        private pointRepository: IPointRepository,
        private playerRepository: IPlayerRepository,
        private roomRepository: IRoomRepository,
    ) { }

    async execute(data: ICreatePoint) {
        const player = await this.playerRepository.findPlayerById(data.player_id);

        if(!player){
            throw new Error('Player not found');
        }

        const room = await this.roomRepository.findRoomById(data.room_id);

        if (!room) {
            throw new Error('Room not found');
        }

        if(player.room_id != room.id){
            throw new Error('Player in other room');
        }        

        if (!room.started_at) {
            throw new Error('Room not started');
        }

        if (room.finished_at) {
            throw new Error('Room has been finished');
        }

        return await this.pointRepository.store(data);
    }
}

export default CreatePointService;