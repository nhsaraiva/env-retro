interface IRoom {
    id: string;
    number: number;
    title: string;
    configurations: string;
    created_at: Date;
    started_at: Date;
    finished_at: Date;
}

export default IRoom;