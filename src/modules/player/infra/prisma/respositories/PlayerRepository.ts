import { Prisma, PrismaClient } from "@prisma/client";
import ICreatePlayer from "../../../domain/entities/ICreatePlayer";
import IPlayer from "../../../domain/entities/IPlayer";
import IPlayerRepository from "../../../domain/repository/IPlayerRepository";

class PlayerRepository implements IPlayerRepository {
    prisma: PrismaClient = new PrismaClient();

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

        const player = await this.prisma.player.create({
            data: playerToCreate
        });

        return player;
    }

    async findPlayerById(id: string): Promise<IPlayer | null> {
        return this.prisma.player.findUnique({
            where: {
                id: id
            },
        });
    }
}

export default PlayerRepository;