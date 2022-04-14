import ICreateRoom from '../../domains/entities/ICreateRoom';
import IRoom from '../../domains/entities/IRoom';
import IRoomRepository from '../../domains/repositories/IRoomRepository';
import CreateRoomService from './CreateRoomService';

const roomRepository: jest.Mocked<IRoomRepository> = {
    store: jest.fn()
}

const room: jest.Mocked<IRoom> = {
    id: "00c7f3ec-f719-4997-91d1-4724085eb6fb",
    number: 123123,
    title: "title test",
    configurations: "{timerInMinutes:5}",
    created_at: new Date(),
    started_at: new Date(),
    finished_at: new Date(),
}

roomRepository.store.mockResolvedValue(room);

describe('Testing CreateRoomService', () => {
    it('should call a store on repository once time', () => {
        const createRoomService = new CreateRoomService(roomRepository);

        const room = createRoomService.execute({title: "teste"});

        expect(roomRepository.store).toBeCalledTimes(1)
    });

    it('should return an room if not pass only title', () => {
        const createRoomService = new CreateRoomService(roomRepository);

        const room = createRoomService.execute({title: "teste"});

        expect(room).resolves.toHaveProperty('id');
    });

    it('should return an room if pass a title and configurations', () => {
        const createRoomService = new CreateRoomService(roomRepository);

        const room = createRoomService.execute({title: "teste", configurations: "{timerInMinutes:5}"});

        expect(room).resolves.toHaveProperty('id');
    });
});
