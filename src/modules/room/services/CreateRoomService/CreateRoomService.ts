import ICreateRoom from "../../domains/entities/ICreateRoom";
import IRoom from "../../domains/entities/IRoom";
import IRoomRepository from "../../domains/repositories/IRoomRepository";

class CreateRoomService {
    constructor(
        private roomRepository: IRoomRepository
    ) { }

    public async execute({ title }: ICreateRoom): Promise<IRoom> {
        return await this.roomRepository.store({ title });
    }
}

export default CreateRoomService;