import ICreatePoint from "../../../domain/entities/ICreatePoint";
import IPoint from "../../../domain/entities/IPoint";
import IPointRepository from "../../../domain/repositories/IPointRepository";
import prisma from "../../../../../shared/infra/prisma";
import { Prisma } from "@prisma/client";

class PointRepository implements IPointRepository{    
    async store(data: ICreatePoint): Promise<IPoint> {
        const point = await prisma.point.create({
            data: data
        });

        return point;
    }

    async update(id: string, description: string): Promise<IPoint> {
        return await prisma.point.update({
            where : {
                id
            },
            data: {
                description
            }
        });
    }
    
    async findPointById(id: string): Promise<IPoint | null> {
        return await prisma.point.findUnique({
            where: {
                id: id
            },
        });
    }
}

export default PointRepository;