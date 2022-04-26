import ICreatePoint from "../../../domain/entities/ICreatePoint";
import IPoint from "../../../domain/entities/IPoint";
import IPointRepository from "../../../domain/repositories/IPointRepository";
import prisma from "../../../../../shared/infra/prisma";
import { Prisma } from "@prisma/client";

class PointRepository implements IPointRepository{    
    async store(data: ICreatePoint): Promise<IPoint> {
        const roomUnique: Prisma.RoomCreateNestedOneWithoutPlayersInput = {
            connect: {
                id: room_id
            } as Prisma.RoomCreateWithoutPlayersInput
        };

        const pointToCreate: Prisma.PointCreateInput = data;

        const point = await prisma.point.create({
            data: pointToCreate
        });

        return point;
    }

    async update(id: string, description: string): Promise<IPoint> {
        throw new Error("Method not implemented.");
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