import ICreatePoint from "../entities/ICreatePoint";
import IEditPoint from "../entities/IEditPoint";
import IPoint from "../entities/IPoint";

interface IPointRepository {
    store(data: ICreatePoint): Promise<IPoint>;
    update(id: string, description: string): Promise<IPoint>;
    findPointById(id: string): Promise<IPoint | null>;
}

export default IPointRepository;