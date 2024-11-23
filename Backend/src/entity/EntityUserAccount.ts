import Entity from "./Entity";

interface EntityUserAccount extends Entity{
    login:string,
    password?:string,
    refresh_token?:string,
}

export default EntityUserAccount;