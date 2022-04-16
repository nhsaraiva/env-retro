import IRoom from "../../../room/domains/entities/IRoom";
import FakeRoomRepository from "../../../room/infra/fake/repositories/FakeRoomRepository";
import IPlayer from "../../domain/entities/IPlayer";
import FakePlayerRepository from "../../infra/fake/repositories/FakePlayerRepository";
import ExitRoomService from "./ExitRoomService";
import crypto from 'node:crypto';

const playerRepository = new FakePlayerRepository();
const roomRepository = new FakeRoomRepository();
const exitRoomService = new ExitRoomService(playerRepository, roomRepository);

let player: IPlayer;
let playerToExit: IPlayer;
let playerWithotRoom: IPlayer;
let room: IRoom;

beforeAll(async () => {
    room = await roomRepository.store({
        title: "teste room"
    });

    player = await playerRepository.store({
        is_anonymous: false,
        is_owner: true,
        name: "teste player",
        room_id: room.id
    });

    playerToExit = await playerRepository.store({
        is_anonymous: false,
        is_owner: false,
        name: "teste player 2",
        room_id: room.id
    });

    playerWithotRoom = await playerRepository.store({
        is_anonymous: false,
        is_owner: false,
        name: "teste player 2",
        room_id: crypto.randomUUID()
    });
})

describe('Testing ExitRoomService', () => {
    it('should return an exception when room has finished', () => {
        roomRepository.rooms[0].started_at = new Date();
        roomRepository.rooms[0].finished_at =  new Date();
        playerRepository.players[0].is_owner = false;

        expect(exitRoomService.execute(player.id)).rejects.toThrow('Room has been finished');  
    });

    it('should return an exception when player passed not exists', () => {
        roomRepository.rooms[0].started_at = null;
        roomRepository.rooms[0].finished_at = null;
        
        expect(exitRoomService.execute(crypto.randomUUID())).rejects.toThrow('Player not found');
    });

    it('should return an exception when player passed not exists', () => {
        roomRepository.rooms[0].started_at = null;
        roomRepository.rooms[0].finished_at = null;
        
        expect(exitRoomService.execute(playerWithotRoom.id)).rejects.toThrow('Room not found');
    });

    it('should return an exception when player is owner', () => { 
        roomRepository.rooms[0].started_at = null;
        roomRepository.rooms[0].finished_at = null;
        playerRepository.players[0].is_owner = true;

        expect(exitRoomService.execute( player.id)).rejects.toThrow('To exit from this room finish him');
    });

    it('should delete an player when exit with room', async () => {
        roomRepository.rooms[0].started_at = null;
        roomRepository.rooms[0].finished_at = null;

        await exitRoomService.execute(playerToExit.id);
        
        expect(playerRepository.players).not.toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: playerToExit.id
            })
        ]));
    });
});