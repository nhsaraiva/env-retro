import { Prisma, PrismaClient } from "@prisma/client";
import prisma from "../../../../../shared/infra/prisma";
import ICreatePlayer from "../../../domain/entities/ICreatePlayer";
import IPlayer from "../../../domain/entities/IPlayer";
import IPlayerRepository from "../../../domain/repository/IPlayerRepository";

class PlayerRepository implements IPlayerRepository {
    async store({ name, is_anonymous, is_owner, room_id }: ICreatePlayer): Promise<IPlayer> {
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

    async findPlayerById(id: string): Promise<IPlayer | null> {
        return await prisma.player.findUnique({
            where: {
                id: id
            },
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.player.delete({
            where: {
                id
            },
        });
    }
}

export default PlayerRepository;