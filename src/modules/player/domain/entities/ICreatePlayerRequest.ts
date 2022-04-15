interface ICreatePlayerRequest {
    name?: string,
    is_owner?: boolean;
    room_id: string
}

export default ICreatePlayerRequest;