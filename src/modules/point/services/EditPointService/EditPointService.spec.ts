import crypyo from 'node:crypto';
import IPlayer from '../../../player/domain/entities/IPlayer';
import FakePlayerRepository from '../../../player/infra/fake/repositories/FakePlayerRepository';
import IRoom from '../../../room/domains/entities/IRoom';
import FakeRoomRepository from '../../../room/infra/fake/repositories/FakeRoomRepository';
import IPoint from '../../domain/entities/IPoint';
import FakePointRepository from '../../infra/fake/repositories/FakePointRepository';
import EditPointService from './EditPointService';


const pointRepository = new FakePointRepository();
const playerRepository = new FakePlayerRepository();
const roomRepository = new FakeRoomRepository();

const editPointService = new EditPointService(
    pointRepository,
    playerRepository,
    roomRepository
);

let player: IPlayer;
let room: IRoom;
let point: IPoint;
let anotherRoom: IRoom;
let anotherPlayer: IPlayer;

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
    });

    anotherPlayer = await playerRepository.store({
        name: 'test player 2',
        is_anonymous: false,
        is_owner: false,
        room_id: room.id
    });

    point = await pointRepository.store({
        description: "point test",
        is_positive: false,
        player_id: player.id,
        room_id: room.id
    });

})


describe('Testing EditPointService', () => {
    it('should return an exception if room not found', () => {
        roomRepository.rooms[0].started_at = new Date();
        roomRepository.rooms[0].finished_at = null;

        expect(editPointService.execute({
            id: point.id,
            description: "description point",
            player_id: player.id,
            room_id: crypyo.randomUUID()
        })).rejects.toThrow('Room not found');
    });


    it('should return an exception if player not found', () => {
        roomRepository.rooms[0].started_at = new Date();
        roomRepository.rooms[0].finished_at = null;

        expect(editPointService.execute({
            id: point.id,
            description: "description point",
            player_id: crypyo.randomUUID(),
            room_id: room.id
        })).rejects.toThrow('Player not found');
    });

    it('should return an exception if player room is diferent', () => {
        roomRepository.rooms[0].started_at = new Date();
        roomRepository.rooms[0].finished_at = null;

        expect(editPointService.execute({
            id: point.id,
            description: "description point",
            player_id: player.id,
            room_id: anotherRoom.id
        })).rejects.toThrow('Player in other room');
    });

    it('should return an exception if room not started', () => {
        roomRepository.rooms[0].started_at = null;
        roomRepository.rooms[0].finished_at = null;

        expect(editPointService.execute({
            id: point.id,
            description: "description point",
            player_id: player.id,
            room_id: room.id
        })).rejects.toThrow('Room not started');
    });

    it('should return an exception if room is finished', () => {
        roomRepository.rooms[0].started_at = new Date();
        roomRepository.rooms[0].finished_at = new Date();

        expect(editPointService.execute({
            id: point.id,
            description: "description point",
            player_id: player.id,
            room_id: room.id
        })).rejects.toThrow('Room has been finished');
    });

    it('should return an exception if point not found', () => {
        roomRepository.rooms[0].started_at = new Date();
        roomRepository.rooms[0].finished_at = null;

        expect(editPointService.execute({
            id: crypyo.randomUUID(),
            description: "description point edited",
            player_id: player.id,
            room_id: room.id
        })).rejects.toThrow('Point not found');
    });

    it('should return an exception if point not created to this player', () => {
        roomRepository.rooms[0].started_at = new Date();
        roomRepository.rooms[0].finished_at = null;

        expect(editPointService.execute({
            id: point.id,
            description: "description point edited",
            player_id: anotherPlayer.id,
            room_id: room.id
        })).rejects.toThrow('Point not created to this player');
    });

    it('should return an edited descriptions', async () => {
        roomRepository.rooms[0].started_at = new Date();
        roomRepository.rooms[0].finished_at = null;

        const edited = await editPointService.execute({
            id: point.id,
            description: "description point edited",
            player_id: player.id,
            room_id: room.id
        });

        expect(edited.description).toBe('description point edited');
    });
})