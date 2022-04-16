import IRoom from "../../../room/domains/entities/IRoom";

interface ICreateOwnerPlayerRequest {
    name?: string,
    room: IRoom
}

export default ICreateOwnerPlayerRequest;