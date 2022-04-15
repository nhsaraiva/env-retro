import { Prisma, PrismaClient } from "@prisma/client";
import ICreateRoom from "../../../domains/entities/ICreateRoom";
import IRoom from "../../../domains/entities/IRoom";
import IRoomRepository from "../../../domains/repositories/IRoomRepository";

class RoomRepository implements IRoomRepository {
    prisma: PrismaClient  = new PrismaClient();

    async store({title, configurations}: ICreateRoom): Promise<IRoom> {
        const roomToCreate: Prisma.RoomCreateInput = {
            title,
            configurations: configurations || "{}",
            created_at: new Date()
        };

        const room = await this.prisma.room.create({data: roomToCreate });

        return room;
    }

    async findRoomById(id: string): Promise<null | IRoom> {
        return this.prisma.room.findUnique({
            where: {
                id
            }
        });
    }

    
    async startRoom(id: string): Promise<IRoom> {
        return await this.prisma.room.update({
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