import IPlayer from "../../../player/domain/entities/IPlayer";

interface IRoom {
    id: string;
    number: number;
    title: string;
    configurations: string;
    created_at: Date;
    started_at?: Date | null;
    finished_at?: Date | null;
    owner?: IPlayer;
}

export default IRoom;