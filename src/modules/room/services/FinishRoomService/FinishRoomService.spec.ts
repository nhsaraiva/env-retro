import IRoom from '../../domains/entities/IRoom';
import FakeRoomRepository from '../../infra/fake/repositories/FakeRoomRepository';
import FinishRoomService from './FinishRoomService';
import crypto from 'node:crypto';
import FakePlayerRepository from '../../../player/infra/fake/repositories/FakePlayerRepository';
import IPlayer from '../../../player/domain/entities/IPlayer';

const roomRepository: FakeRoomRepository = new FakeRoomRepository();
const playerRepository: FakePlayerRepository = new FakePlayerRepository();

const finishRoomService = new FinishRoomService(roomRepository, playerRepository);

let room: IRoom;

let playerOwnerRoom: IPlayer;
let anotherPlayer: IPlayer;

beforeAll(async () => {
    room = await roomRepository.store({
        title: "teste started"
    });

    playerOwnerRoom = await playerRepository.store({
        name: "owner to room",
        is_anonymous: false,
        is_owner: true,
        room_id: room.id
    });

    anotherPlayer = await playerRepository.store({
        name: "another player",
        is_anonymous: false,
        is_owner: false,
        room_id: room.id
    });
});

describe('Testing FinishRoomService', () => {
    it('should return an exception when room not found', async () => {
        expect(finishRoomService.execute({
            room_id: crypto.randomUUID(),
            player_id: crypto.randomUUID(),
        })).rejects.toThrow('Room not found'); 
    })

    it('should return an exception when room has ben finished', async () => {
        roomRepository.rooms[0].started_at = new Date();
        roomRepository.rooms[0].finished_at = new Date();

        expect(finishRoomService.execute({
            room_id: room.id,
            player_id: playerOwnerRoom.id
        })).rejects.toThrow('Room has been finished');
    })


    it('should return an exception when room not started', async () => {
        roomRepository.rooms[0].started_at = null;
        roomRepository.rooms[0].finished_at = null;

        expect(finishRoomService.execute({
            room_id: room.id,
            player_id: playerOwnerRoom.id
        })).rejects.toThrow('Room not started');
    })

    it('should return an exception when player not found', async () => {
        roomRepository.rooms[0].started_at = new Date();
        roomRepository.rooms[0].finished_at = null;

        expect(finishRoomService.execute({
            room_id: room.id,
            player_id: crypto.randomUUID()
        })).rejects.toThrow('Player not found');
    })

    it('should return an exception when player is not owner', async () => {
        roomRepository.rooms[0].started_at = new Date();
        roomRepository.rooms[0].finished_at = null;

        expect(finishRoomService.execute({
            room_id: room.id,
            player_id: anotherPlayer.id
        })).rejects.toThrow('Player is not owner to this room');
    })
    

    it('should return an room finished when room has ben started and player is owner and room not finished', async () => {
        roomRepository.rooms[0].started_at = new Date();
        roomRepository.rooms[0].finished_at = null;

        await finishRoomService.execute({
            room_id: room.id,
            player_id: playerOwnerRoom.id
        });

        expect(roomRepository.rooms[0].finished_at).toBeInstanceOf(Date);
    })
})