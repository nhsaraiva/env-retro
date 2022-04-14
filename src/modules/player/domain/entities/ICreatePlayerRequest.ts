interface ICreatePlayerRequest {
    name?: String,
    is_owner?: Boolean;
    room_id: String
}

export default ICreatePlayerRequest;