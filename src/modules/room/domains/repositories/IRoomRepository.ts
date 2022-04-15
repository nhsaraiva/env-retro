import ICreateRoom from "../entities/ICreateRoom";
import IRoom from "../entities/IRoom";

interface IRoomRepository {
    store({title, configurations}: ICreateRoom): Promise<IRoom>;
    findRoomById(id: string): Promise<IRoom | null>;
    startRoom(id: string): Promise<IRoom>;
}

export default IRoomRepository;