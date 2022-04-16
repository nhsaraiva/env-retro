import ICreateRoom from "../../../domains/entities/ICreateRoom";
import IRoom from "../../../domains/entities/IRoom";
import IRoomRepository from "../../../domains/repositories/IRoomRepository";
import crypto from 'node:crypto';

class FakeRoomRepository implements IRoomRepository {
    rooms: IRoom[] = [];

    async store({ title, configurations }: ICreateRoom): Promise<IRoom> {
        const room = {
            id: crypto.randomUUID(),
            number: this.rooms.length + 1,
            title: title,
            configurations: configurations || "{}",
            created_at: new Date(),
            started_at: new Date(),
            finished_at: new Date(),
        };

        this.rooms.push(room);

        return room;
    }

    async findRoomById(id: string): Promise<null | IRoom> {
        const roomsFinded = this.rooms.filter((room) => room.id == id);

        if(roomsFinded.length > 0) {
            return roomsFinded[0];
        }

        return null;
    }
    
    async startRoom(id: string): Promise<IRoom> {
        const roomsFinded = this.rooms.filter((room) => room.id == id);

        roomsFinded[0].started_at = new Date();

        return roomsFinded[0];   
    }

    async finishRoom(id: string): Promise<IRoom> {
        const roomsFinded = this.rooms.filter((room) => room.id == id);

        roomsFinded[0].finished_at = new Date();

        return roomsFinded[0];   
    }
    
    async findRoomByNumber(number: number): Promise<null | IRoom> {
        const roomsFinded = this.rooms.filter((room) => room.number == number);

        if(roomsFinded.length > 0) {
            return roomsFinded[0];
        }

        return null;
    }
}

export default FakeRoomRepository;