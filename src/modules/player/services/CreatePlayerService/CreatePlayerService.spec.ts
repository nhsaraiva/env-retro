import ICreatePlayer from "../../domain/entities/ICreatePlayer";
import ICreatePlayerRequest from "../../domain/entities/ICreatePlayerRequest";
import IPlayer from "../../domain/entities/IPlayer";
import IPlayerRepository from "../../domain/repository/IPlayerRepository";
import FakePlayerRepository from "../../infra/fake/repositories/FakePlayerRepository";
import CreatePlayerService from "./CreatePlayerService";


const playerRepository = new FakePlayerRepository();

describe('Testing CreatePlayerService', () => {
    it('should return Anonymous name  and id if player name is not defined', async () => {
        const createPlayerService = new CreatePlayerService(playerRepository);

        const playerRequest: ICreatePlayerRequest = {
            room_id: '00c7f3ec-f719-4997-91d1-4724085eb6fb'
        };

        const player = await createPlayerService.execute(playerRequest);

        expect(player.name).toBe('Anonymous');
    })

    it('should return a player name and id if player name is defined', async () => {
        const createPlayerService = new CreatePlayerService(playerRepository);

        const playerName = "Teste Player Name";

        const playerRequest: ICreatePlayerRequest = {
            room_id: '00c7f3ec-f719-4997-91d1-4724085eb6fb',
            name: playerName
        };

        const player = await createPlayerService.execute(playerRequest);

        expect(player).toHaveProperty('id');
        expect(player.name).toBe(playerName);
    })

    it('should return is anonymous true if player name is not defined', async () => {
        const createPlayerService = new CreatePlayerService(playerRepository);

        const playerRequest: ICreatePlayerRequest = {
            room_id: '00c7f3ec-f719-4997-91d1-4724085eb6fb'
        };

        const player = await createPlayerService.execute(playerRequest);

        expect(player.is_anonymous).toBe(true);
    })

    it('should return owner true if this value passed to this property', async () => {
        const createPlayerService = new CreatePlayerService(playerRepository);

        const playerRequest: ICreatePlayerRequest = {
            room_id: '00c7f3ec-f719-4997-91d1-4724085eb6fb',
            is_owner: true
        };

        const player = await createPlayerService.execute(playerRequest);

        expect(player.is_owner).toBe(true);

    })

    it('should return owner false if not passed owner with true', async () => {
        const createPlayerService = new CreatePlayerService(playerRepository);

        const playerRequest: ICreatePlayerRequest = {
            room_id: '00c7f3ec-f719-4997-91d1-4724085eb6fb',
        };

        const player = await createPlayerService.execute(playerRequest);

        expect(player.is_owner).toBe(false);
    })
});