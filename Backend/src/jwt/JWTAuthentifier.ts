import EntityUserAccount from "../entity/EntityUserAccount";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
class JWTAuthentifier {
    constructor() {
        dotenv.config();
    }

    public generateAccessToken(data: { _id: string, login: string }): string {
        const privateKey = (process.env.ACCESS_TOKEN_SECRET != null) ? process.env.ACCESS_TOKEN_SECRET : "";
        const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 1;
        const access_token = jwt.sign({ _id: data._id, login: data.login, exp: exp }, privateKey, { algorithm: 'HS512' });
        return access_token;
    }

    public generateRefreshToken(data: { _id: string, login: string }): string {
        const privateKey = (process.env.REFRESH_TOKEN_SECRET != null) ? process.env.REFRESH_TOKEN_SECRET : "";
        const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
        const refresh_token = jwt.sign({ _id: data._id, login: data.login, exp: exp }, privateKey, { algorithm: 'HS512' });
        return refresh_token;
    }

    public getUserFromAccessToken(access_token: string): EntityUserAccount {
        const privateKey = (process.env.ACCESS_TOKEN_SECRET != null) ? process.env.ACCESS_TOKEN_SECRET : "";
        const decodedUser: any = jwt.verify(access_token, privateKey);
        return decodedUser;
    }
    public getUserFromRefreshToken(refresh_token: string): EntityUserAccount {
        const privateKey = (process.env.REFRESH_TOKEN_SECRET != null) ? process.env.REFRESH_TOKEN_SECRET : "";
        const decodedUser: any = jwt.verify(refresh_token, privateKey);
        return decodedUser;
    }
}

export default new JWTAuthentifier(); 