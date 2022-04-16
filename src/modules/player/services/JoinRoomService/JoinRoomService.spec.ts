import IRoom from "../../../room/domains/entities/IRoom";
import FakeRoomRepository from "../../../room/infra/fake/repositories/FakeRoomRepository";
import IJoinRoom from "../../domain/entities/IJoinRoom";
import FakePlayerRepository from "../../infra/fake/repositories/FakePlayerRepository";
import JoinRoomService from "./JoinRoomService";


const playerRepository = new FakePlayerRepository();
const roomRepository = new FakeRoomRepository();
const joinRoomService = new JoinRoomService(playerRepository, roomRepository);

let room: IRoom;

beforeAll(async () => {
    room = await roomRepository.store({
        title: "room test"
    });
    
    roomRepository.rooms[0].started_at = null;
    roomRepository.rooms[0].finished_at = null;
})

describe('Testing JoinRoomService', () => {
    it('should return Anonymous name  and id if player name is not defined', async () => {
        const playerRequest: IJoinRoom = {
            room_number: room.number,
        };

        const player = await joinRoomService.execute(playerRequest);

        expect(player.name).toBe('Anonymous');
        expect(player.is_owner).toBe(false);
        expect(playerRepository.players).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: player.id
            })
        ]));
    });

    it('should return a player name and id if player name is defined', async () => {
        const playerName = "Teste Player Name";

        const playerRequest: IJoinRoom = {
            room_number: room.number,
            name: playerName
        };

        const player = await joinRoomService.execute(playerRequest);

        expect(player).toHaveProperty('id');
        expect(player.name).toBe(playerName);
        expect(player.is_owner).toBe(false);
        expect(playerRepository.players).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: player.id
            })
        ]));
    });

    it('should return is anonymous true if player name is not defined', async () => {
        const playerRequest: IJoinRoom = {
            room_number: room.number,
        };

        const player = await joinRoomService.execute(playerRequest);

        expect(player.is_anonymous).toBe(true);
        expect(player.is_owner).toBe(false);
        expect(playerRepository.players).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: player.id
            })
        ]));
    });

    it('should return owner false to player joined on an exists room', async () => {
        const playerRequest: IJoinRoom = {
            room_number: room.number
        };

        const player = await joinRoomService.execute(playerRequest);

        expect(player.is_owner).toBe(false);
        expect(playerRepository.players).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: player.id
            })
        ]));

    });
    
    it('should return an success when room not finished', async () => {
        roomRepository.rooms[0].started_at = null;
        roomRepository.rooms[0].finished_at = null;
        
        const player = await joinRoomService.execute({room_number: room.number});

        expect(player).toHaveProperty('id');
        expect(player.is_owner).toBe(false);
    });
    
    it('should return an success when room not finished an send a player name', async () => {
        roomRepository.rooms[0].started_at = null;
        roomRepository.rooms[0].finished_at = null;

        const player = await joinRoomService.execute({room_number: room.number, name: "teste player"});

        expect(player).toHaveProperty('id');
        expect(player.is_owner).toBe(false);
        expect(player.name).toBe("teste player");
    });
    
    it('should return an exception on room number passes has finished', () => {
        roomRepository.rooms[0].started_at = new Date();
        roomRepository.rooms[0].finished_at = new Date();

        expect(joinRoomService.execute({room_number: room.number})).rejects.toThrow('Room has been finished');
        
    });
    
    it('should return an exception on room number passes not found', () => {
        roomRepository.rooms[0].started_at = null;
        roomRepository.rooms[0].finished_at = null;

        expect(joinRoomService.execute({room_number: -12321})).rejects.toThrow('Room not found');
        
    });
});