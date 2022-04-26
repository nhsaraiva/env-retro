import IPlayerRepository from "../../../player/domain/repository/IPlayerRepository";
import IRoomRepository from "../../../room/domains/repositories/IRoomRepository";
import IEditPoint from "../../domain/entities/IEditPoint";
import IPointRepository from "../../domain/repositories/IPointRepository";

class EditPointService {
    constructor(
        private pointRepository: IPointRepository,
        private playerRepository: IPlayerRepository,
        private roomRepository: IRoomRepository,
    ) { }

    async execute(data: IEditPoint) {
        const point = await  this.pointRepository.findPointById(data.id);

        if(!point){
            throw new Error('Point not found');
        }

        const player = await this.playerRepository.findPlayerById(data.player_id);

        if(!player){
            throw new Error('Player not found');
        }
        
        if(point.player_id != player.id){
            throw new Error('Point not created to this player');
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

        return await this.pointRepository.update(point.id, data.description);
    }
}

export default EditPointService;