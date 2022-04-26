import crypyo from 'node:crypto';
import IPlayer from '../../../player/domain/entities/IPlayer';
import FakePlayerRepository from '../../../player/infra/fake/repositories/FakePlayerRepository';
import IRoom from '../../../room/domains/entities/IRoom';
import FakeRoomRepository from '../../../room/infra/fake/repositories/FakeRoomRepository';
import FakePointRepository from '../../infra/fake/repositories/FakePointRepository';
import CreatePointService from './CreatePointService';


const pointRepository = new FakePointRepository();
const playerRepository = new FakePlayerRepository();
const roomRepository = new FakeRoomRepository();

const createPointService = new CreatePointService(
    pointRepository,
    playerRepository,
    roomRepository
);

let player: IPlayer;
let room: IRoom;
let anotherRoom: IRoom;

beforeAll(async () => {
    room = await roomRepository.store({
        title: "test room",
        configurations: "{}"
    });

    anotherRoom = await roomRepository.store({
        title: "test room 2",
        configurations: "{}"
    });

    player = await playerRepository.store({
        name: 'test player',
        is_anonymous: false,
        is_owner: false,
        room_id: room.id
    })
})


describe('Testing CreatePointService', () => {
    it('sould create an positive point to an room open', () => {
        roomRepository.rooms[0].started_at = new Date();
        roomRepository.rooms[0].finished_at = null;

        expect(createPointService.execute({
            description: "description point",
            is_positive: true,
            player_id: player.id,
            room_id: room.id
        })).resolves.toHaveProperty('id');
    });

    it('sould create an negative point to an room open', () => {
        roomRepository.rooms[0].started_at = new Date();
        roomRepository.rooms[0].finished_at = null;

        expect(createPointService.execute({
            description: "description point",
            is_positive: false,
            player_id: player.id,
            room_id: room.id
        })).resolves.toHaveProperty('id');
    });
    

    it('should return an exception if room not found', () => {
        roomRepository.rooms[0].started_at = new Date();
        roomRepository.rooms[0].finished_at = null;

        expect(createPointService.execute({
            description: "description point",
            is_positive: false,
            player_id: player.id,
            room_id: crypyo.randomUUID()
        })).rejects.toThrow('Room not found');
    });
    

    it('should return an exception if player not found', () => {
        roomRepository.rooms[0].started_at = new Date();
        roomRepository.rooms[0].finished_at = null;

        expect(createPointService.execute({
            description: "description point",
            is_positive: false,
            player_id: crypyo.randomUUID(),
            room_id: room.id
        })).rejects.toThrow('Player not found');
    });
    

    it('should return an exception if player room is diferent', () => {
        roomRepository.rooms[0].started_at = new Date();
        roomRepository.rooms[0].finished_at = null;

        expect(createPointService.execute({
            description: "description point",
            is_positive: false,
            player_id: player.id,
            room_id: anotherRoom.id
        })).rejects.toThrow('Player in other room');
    });

    it('should return an exception if room not started', () => {
        roomRepository.rooms[0].started_at = null;
        roomRepository.rooms[0].finished_at = null;

        expect(createPointService.execute({
            description: "description point",
            is_positive: false,
            player_id: player.id,
            room_id: room.id
        })).rejects.toThrow('Room not started');
    });

    it('should return an exception if room is finished', () => {
        roomRepository.rooms[0].started_at = new Date();
        roomRepository.rooms[0].finished_at = new Date();

        expect(createPointService.execute({
            description: "description point",
            is_positive: false,
            player_id: player.id,
            room_id: room.id
        })).rejects.toThrow('Room has been finished');
    });
})