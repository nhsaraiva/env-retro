import IPlayer from '../../../player/domain/entities/IPlayer';
import IPlayerRepository from '../../../player/domain/repository/IPlayerRepository';
import FakePlayerRepository from '../../../player/infra/fake/repositories/FakePlayerRepository';
import IPoint from '../../../point/domain/entities/IPoint';
import IPointRepository from '../../../point/domain/repositories/IPointRepository';
import FakePointRepository from '../../../point/infra/fake/repositories/FakePointRepository';
import FakeLikeRepository from '../../infra/fake/repositories/FakeLikeRepository';
import crypto from 'node:crypto';
import RemoveLikeService from './RemoveLikeService';
import ILikeRepository from '../../domain/repositories/ILikeRepository';
import ILike from '../../domain/entities/ILike';


const pointRepository: IPointRepository = new FakePointRepository();
const playerRepository: IPlayerRepository = new FakePlayerRepository();
const likeRepository = new FakeLikeRepository();

const removeLikeService = new RemoveLikeService(
    likeRepository,
    playerRepository,
    pointRepository
);

let point: IPoint;
let ownerPlayer: IPlayer;
let player: IPlayer;
let anotherPlayer: IPlayer;
let like: ILike;

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

    anotherPlayer = await playerRepository.store({
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

    like = await likeRepository.store({
        player_id: player.id,
        point_id: point.id
    });
});

describe('Testing RemoveLikeService', () => {
    it('should remove like', async () => {
        await removeLikeService.execute({
            point_id: point.id,
            player_id: player.id,
        });
        
        expect(likeRepository.likes).toEqual(expect.not.arrayContaining([
            expect.not.objectContaining({
                id: player.id
            })
        ]));
    });

    it('should return an error when point not exists', () => {
        expect(removeLikeService.execute({
            point_id: crypto.randomUUID(),
            player_id: player.id
        })).rejects.toThrow('Point not found');
    });

    it('should return an error when player not exists', () => {
        expect(removeLikeService.execute({
            point_id: point.id,
            player_id: crypto.randomUUID(),
        })).rejects.toThrow('Player not found');
    });

    it('should return an error when player is owner to this point', () => {
        expect(removeLikeService.execute({
            point_id: point.id,
            player_id: ownerPlayer.id,
        })).rejects.toThrow('Player is owner to this point');
    });

    it('should return an error when player not liked point', () => {
        expect(removeLikeService.execute({
            point_id: point.id,
            player_id: anotherPlayer.id,
        })).rejects.toThrow('Player not send like to this point');
    });
    
});