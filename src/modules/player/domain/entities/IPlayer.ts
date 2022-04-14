interface IPlayer {
    id: String;
    name: String;
    is_anonymous: Boolean,
    is_owner: Boolean,
    room_id: String
}

export default IPlayer;