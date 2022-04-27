import FakeLikeRepository from '../../infra/fake/repositories/FakeLikeRepository';
import SendLikeService from './SendLikeService';
import crypto from 'node:crypto';
import IPoint from '../../../point/domain/entities/IPoint';
import IPointRepository from '../../../point/domain/repositories/IPointRepository';
import FakePointRepository from '../../../point/infra/fake/repositories/FakePointRepository';
import IPlayerRepository from '../../../player/domain/repository/IPlayerRepository';
import FakePlayerRepository from '../../../player/infra/fake/repositories/FakePlayerRepository';
import IPlayer from '../../../player/domain/entities/IPlayer';

const pointRepository: IPointRepository = new FakePointRepository();
const playerRepository: IPlayerRepository = new FakePlayerRepository();

const sendLikeService = new SendLikeService(
    new FakeLikeRepository(),
    playerRepository,
    pointRepository
);

let point: IPoint;
let ownerPlayer: IPlayer;
let player: IPlayer;

beforeAll(async () => {
    const room_id = crypto.randomUUID();

    ownerPlayer = await playerRepository.store({
        is_anonymous: true,
        name: 'Anonymous',
        is_owner: false,
        room_id: room_id
    });

    player = await playerRepository.store({
        is_anonymous: true,
        name: 'Anonymous',
        is_owner: false,
        room_id: room_id
    });

    point = await pointRepository.store({
        description: "test",
        is_positive: true,
        player_id: ownerPlayer.id,
        room_id: room_id
    });
});

describe('Testing SendLikeService', () => {
    it('should send like when player liked this point', () => {
        expect(sendLikeService.execute({
            point_id: point.id,
            player_id: player.id,
        })).resolves.toHaveProperty('id');
    });

    it('should return an error when point not exists', () => {
        expect(sendLikeService.execute({
            point_id: crypto.randomUUID(),
            player_id: player.id
        })).rejects.toThrow('Point not found');
    });

    it('should return an error when player not exists', () => {
        expect(sendLikeService.execute({
            point_id: point.id,
            player_id: crypto.randomUUID(),
        })).rejects.toThrow('Player not found');
    });

    it('should return an error when player is owner to this point', () => {
        expect(sendLikeService.execute({
            point_id: point.id,
            player_id: ownerPlayer.id,
        })).rejects.toThrow('Player is owner to this point');
    });
});