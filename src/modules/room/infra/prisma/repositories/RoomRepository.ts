import { Prisma, PrismaClient } from "@prisma/client";
import prisma from "../../../../../shared/infra/prisma";
import ICreateRoom from "../../../domains/entities/ICreateRoom";
import IRoom from "../../../domains/entities/IRoom";
import IRoomRepository from "../../../domains/repositories/IRoomRepository";

class RoomRepository implements IRoomRepository {
    async store({title, configurations}: ICreateRoom): Promise<IRoom> {
        const roomToCreate: Prisma.RoomCreateInput = {
            title,
            configurations: configurations || "{}",
            created_at: new Date()
        };

        const room = await prisma.room.create({data: roomToCreate });

        return room;
    }

    async findRoomById(id: string): Promise<null | IRoom> {
        return prisma.room.findUnique({
            where: {
                id
            }
        });
    }

    
    async startRoom(id: string): Promise<IRoom> {
        return await prisma.room.update({
            where: {
                id
            },
            data: {
                started_at: new Date()
            }
        });
    }
    
    async finishRoom(id: string): Promise<IRoom> {
        return await prisma.room.update({
            where: {
                id
            },
            data: {
                finished_at: new Date()
            }
        });
    }

}

export default RoomRepository;