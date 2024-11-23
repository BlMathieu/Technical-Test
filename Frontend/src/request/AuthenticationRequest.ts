import AbstractRequest from "./AbstractRequest";
import UserAccountEntity from "../entity/UserAccountEntity";
class AuthenticationRequest extends AbstractRequest {
    constructor() {
        super("authentication");
    }

    public async login(credentials: { login: string, password: string }): Promise<{ access_token: string }> {
        const url = `${this.url}/login`;
        return await fetch(url, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            credentials:'include',
            body: JSON.stringify(credentials),
        }).then((value) => {
            return value.json();
        }).catch((error) => {
            console.error(error);
        });

    }
    public async logout() {
        const url = `${this.url}/logout`;
        return await fetch(url, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            credentials: "include"
        }).then((value) => {
            return value.json();
        }).catch((error) => {
            console.error(error);
        });
    }

    public async autoLogin():Promise<{access_token:string}> {
        const url = `${this.url}/autoLogin`;
        return await fetch(url, {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            method: "POST"
        }).then((value)=>{
            return value.json();
        }).catch((error)=>{
            console.error(error);
        })
    }

    public async createAccount(userAccount: UserAccountEntity) {
        const url = `${this.url}/account`;
        return await fetch(url, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(userAccount),
        }).then((value) => {
            return value.json();
        }).catch((error) => {
            console.error(error);
        });
    }
}

export default new AuthenticationRequest();