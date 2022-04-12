import IRoom from '../../domains/entities/IRoom';
import IRoomRepository from '../../domains/repositories/IRoomRepository';
import CreateRoomService from './CreateRoomService';

const roomRepository: jest.Mocked<IRoomRepository> = {
    store: jest.fn()
}

const room: jest.Mocked<IRoom> = {
    id: "123123123",
    number: 123123,
    title: "title test",
    configurations: "{}",
    created_at: new Date(),
    started_at: new Date(),
    finished_at: new Date(),
}

roomRepository.store.mockResolvedValue(room);

describe('Testing CreateRoomService', () => {
    it('should call a store on repository once time', () => {
        const createRoomService = new CreateRoomService(roomRepository);

        const room = createRoomService.execute({});

        expect(roomRepository.store).toBeCalledTimes(1)
    });

    it('should return an room if not pass a user name', () => {
        const createRoomService = new CreateRoomService(roomRepository);

        const room = createRoomService.execute({});

        expect(room).resolves.toHaveProperty('id');
    });

    it('should return an room if pass a user name', () => {
        const createRoomService = new CreateRoomService(roomRepository);

        const room = createRoomService.execute({ userName: "teste" });

        expect(room).resolves.toHaveProperty('id');
    });
});
