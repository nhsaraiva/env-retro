interface IPlayer {
    id: string;
    name: string;
    is_anonymous: boolean,
    is_owner: boolean,
    room_id: string
}

export default IPlayer;