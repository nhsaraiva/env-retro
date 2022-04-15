import { Prisma, PrismaClient } from "@prisma/client";
import ICreateRoom from "../../../domains/entities/ICreateRoom";
import IRoom from "../../../domains/entities/IRoom";
import IRoomRepository from "../../../domains/repositories/IRoomRepository";

class RoomRepository implements IRoomRepository {
    async store({title, configurations}: ICreateRoom): Promise<IRoom> {
        const prisma  = new PrismaClient();

        const roomToCreate: Prisma.RoomCreateInput = {
            title,
            configurations: configurations || "{}",
            created_at: new Date()
        };

        const room = await prisma.room.create({data: roomToCreate });

        return room;
    }

}

export default RoomRepository;