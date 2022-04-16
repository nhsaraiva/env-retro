import IRoom from "../../../room/domains/entities/IRoom";
import FakeRoomRepository from "../../../room/infra/fake/repositories/FakeRoomRepository";
import ICreateOwnerPlayerRequest from "../../domain/entities/ICreateOwnerPlayerRequest";
import FakePlayerRepository from "../../infra/fake/repositories/FakePlayerRepository";
import CreateOwnerPlayerService from "./CreateOwnerPlayerService";


const playerRepository = new FakePlayerRepository();
const roomRepository = new FakeRoomRepository();
const createOwnerPlayerService = new CreateOwnerPlayerService(playerRepository);

let room: IRoom;

beforeAll(async () => {
    room = await roomRepository.store({
        title: "room test"
    });
    
    roomRepository.rooms[0].started_at = null;
    roomRepository.rooms[0].finished_at = null;
})

describe('Testing CreateOwnerPlayerService', () => {
    it('should return Anonymous name and id if player name is not defined', async () => {
        const playerRequest: ICreateOwnerPlayerRequest = {
            room,
        };

        const player = await createOwnerPlayerService.execute(playerRequest);

        expect(player.name).toBe('Anonymous');
        expect(player.is_owner).toBe(true);
        expect(playerRepository.players).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: player.id
            })
        ]));
    });

    it('should return a player name and id if player name is defined', async () => {
        const playerName = "Teste Player Name";

        const playerRequest: ICreateOwnerPlayerRequest = {
            room,
            name: playerName
        };

        const player = await createOwnerPlayerService.execute(playerRequest);

        expect(player).toHaveProperty('id');
        expect(player.name).toBe(playerName);
        expect(player.is_owner).toBe(true);
        expect(playerRepository.players).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: player.id
            })
        ]));
    });

    it('should return is anonymous true if player name is not defined', async () => {
        const playerRequest: ICreateOwnerPlayerRequest = {
            room,
        };

        const player = await createOwnerPlayerService.execute(playerRequest);

        expect(player.is_anonymous).toBe(true);
        expect(player.is_owner).toBe(true);
        expect(playerRepository.players).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: player.id
            })
        ]));
    });

    it('should return owner true when create a owner player', async () => {
        const playerRequest: ICreateOwnerPlayerRequest = {
            room,
        };

        const player = await createOwnerPlayerService.execute(playerRequest);

        expect(player.is_owner).toBe(true);
        expect(playerRepository.players).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: player.id
            })
        ]));

    });

    it('should return an success when room not finished', async () => {
        roomRepository.rooms[0].started_at = null;
        roomRepository.rooms[0].finished_at = null;
        
        const player = await createOwnerPlayerService.execute({room});

        expect(player).toHaveProperty('id');
        expect(player.is_owner).toBe(true);
    });
    
    it('should return an success when room not finished an send a player name', async () => {
        roomRepository.rooms[0].started_at = null;
        roomRepository.rooms[0].finished_at = null;

        const player = await createOwnerPlayerService.execute({room, name: "teste player"});

        expect(player).toHaveProperty('id');
        expect(player.is_owner).toBe(true);
        expect(player.name).toBe("teste player");
    });
    
    it('should return an exception on room passed has finished', () => {
        roomRepository.rooms[0].started_at = new Date();
        roomRepository.rooms[0].finished_at = new Date();

        expect(createOwnerPlayerService.execute({room})).rejects.toThrow('Room has been finished');
        
    });
});