import ICreateRoom from "../../../domains/entities/ICreateRoom";
import IRoom from "../../../domains/entities/IRoom";
import IRoomRepository from "../../../domains/repositories/IRoomRepository";

class FakeRoomRepository implements IRoomRepository {
    rooms: IRoom[] = [];

    async store({ title, configurations }: ICreateRoom): Promise<IRoom> {
        const room = {
            id: "00c7f3ec-f719-4997-91d1-4724085eb6fb",
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

}

export default FakeRoomRepository;