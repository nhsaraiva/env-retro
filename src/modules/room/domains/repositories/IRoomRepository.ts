import ICreateRoomByUser from "../entities/ICreateRoomByUser";
import IRoom from "../entities/IRoom";

interface IRoomRepository {
    store({ userName }: ICreateRoomByUser): Promise<IRoom>;
}

export default IRoomRepository;