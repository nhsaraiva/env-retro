import ICreateRoomByUser from "../../../domains/entities/ICreateRoomByUser";
import IRoom from "../../../domains/entities/IRoom";
import IRoomRepository from "../../../domains/repositories/IRoomRepository";

class RoomRepository implements IRoomRepository {
    store({ userName }: ICreateRoomByUser): Promise<IRoom> {
        throw new Error("Method not implemented.");
    }

}

export default RoomRepository;