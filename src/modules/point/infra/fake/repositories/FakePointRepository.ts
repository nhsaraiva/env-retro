import crypto from 'node:crypto';
import ICreatePoint from "../../../domain/entities/ICreatePoint";
import IEditPoint from '../../../domain/entities/IEditPoint';
import IPoint from "../../../domain/entities/IPoint";
import IPointRepository from "../../../domain/repositories/IPointRepository";

class FakePointRepository implements IPointRepository {
    points: IPoint[] = [];

    async store(data: ICreatePoint): Promise<IPoint> {
        const point = {
            id: crypto.randomUUID(),
            ...data
        };

        this.points.push(point);

        return point;
    }

    async update(id: string, description: string): Promise<IPoint> {
        var element: IPoint = {
            description: "",
            id: crypto.randomUUID(),
            is_positive: false,
            player_id: crypto.randomUUID(),
            room_id: crypto.randomUUID(),
        };

        for (let index = 0; index < this.points.length; index++) {
            if (this.points[index].id == id) {
                this.points[index].description = description;
                element = this.points[index];
                break;
            }
        }

        return element;
    }
    
    async findPointById(id: string): Promise<IPoint | null> {
        const pointsFinded = this.points.filter((point) => point.id == id);

        if (pointsFinded.length > 0) {
            return pointsFinded[0];
        }

        return null;
    }
}

export default FakePointRepository;