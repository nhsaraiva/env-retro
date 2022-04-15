import FakeRoomRepository from '../../infra/fake/repositories/FakeRoomRepository';
import CreateRoomService from './CreateRoomService';

const roomRepository: FakeRoomRepository = new FakeRoomRepository();

describe('Testing CreateRoomService', () => {
    it('should call a store on repository once time', async () => {
        const createRoomService = new CreateRoomService(roomRepository);

        await createRoomService.execute({title: "teste 1"});

        expect(roomRepository.rooms).toEqual(expect.arrayContaining([
            expect.objectContaining({
                title: "teste 1"
            })
        ]));
    });

    it('should return an room if not pass only title', async () => {
        const createRoomService = new CreateRoomService(roomRepository);

        await createRoomService.execute({title: "teste 2"});

        expect(roomRepository.rooms).toEqual(expect.arrayContaining([
            expect.objectContaining({
                title: "teste 2"
            })
        ]));
    });

    it('should return an room if pass a title and configurations', async () => {
        const createRoomService = new CreateRoomService(roomRepository);

        await createRoomService.execute({title: "teste 3", configurations: "{timerInMinutes:5}"});

        expect(roomRepository.rooms).toEqual(expect.arrayContaining([
            expect.objectContaining({
                title: "teste 3"
            })
        ]));
    });
});
