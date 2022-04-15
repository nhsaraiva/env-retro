import { Prisma, PrismaClient } from "@prisma/client";
import ICreatePlayer from "../../../domain/entities/ICreatePlayer";
import IPlayer from "../../../domain/entities/IPlayer";
import IPlayerRepository from "../../../domain/repository/IPlayerRepository";

class PlayerRepository implements IPlayerRepository {
    async store({ name, is_anonymous, is_owner, room_id }: ICreatePlayer): Promise<IPlayer> {
        const prisma: PrismaClient = new PrismaClient();

        const roomUnique: Prisma.RoomCreateNestedOneWithoutPlayersInput = {
            connect: {
                id: room_id
            } as Prisma.RoomCreateWithoutPlayersInput
        };

        const playerToCreate: Prisma.PlayerCreateInput = {
            name,
            is_anonymous,
            is_owner,
            room: roomUnique
        };

        const player = await prisma.player.create({
            data: playerToCreate
        });

        return player;
    }
}

export default PlayerRepository;