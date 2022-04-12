import ICreateRoomByUser from "../../domains/entities/ICreateRoomByUser";
import IRoom from "../../domains/entities/IRoom";
import IRoomRepository from "../../domains/repositories/IRoomRepository";

class CreateRoomService {
    constructor(
        private roomRepository: IRoomRepository
    ){}

    public async execute({ userName }: ICreateRoomByUser): Promise<IRoom> {
        return await this.roomRepository.store({ userName });
    }
}

export default CreateRoomService;