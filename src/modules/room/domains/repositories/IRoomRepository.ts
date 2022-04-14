import ICreateRoom from "../entities/ICreateRoom";
import IRoom from "../entities/IRoom";

interface IRoomRepository {
    store({title, configurations}: ICreateRoom): Promise<IRoom>;
}

export default IRoomRepository;