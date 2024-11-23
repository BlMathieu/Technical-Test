import EntityUserAccount from "../entity/EntityUserAccount";
import ModelUserAccount from "../model/ModelUserAccount";
import JWTAuthentifier from "../jwt/JWTAuthentifier";
import APIError from "../error/APIError";
import bcrypt from "bcrypt";
import AbstractController from "./AbstractController";
class AuthenticationController extends AbstractController {

    private rounds: number;
    constructor() {
        super(new ModelUserAccount());
        this.rounds = 12;
    }

    public async login(credentials: { login: string, password: string }): Promise<{ access_token: string, refresh_token: string }> {
        const user: any = await this.model.findOne({ login: credentials.login });
        if (user == null) {
            throw new APIError("L'utilisateur n'existe pas !");
        }

        const isLogged = await bcrypt.compare(credentials.password, user.password);
        if (isLogged) {
            const refresh_token = JWTAuthentifier.generateRefreshToken({ _id: user._id, login: credentials.login });
            await this.model.updateOne({ login: credentials.login }, { refresh_token: refresh_token });
            const access_token = JWTAuthentifier.generateAccessToken({ _id: user.id, login: credentials.login });
            return { access_token: access_token, refresh_token: refresh_token };
        }
        throw new APIError("Invalid crendentials !");
    }

    public async logout(access_token: string): Promise<void> {
        const user = JWTAuthentifier.getUserFromAccessToken(access_token);
        await this.model.deleteOne({ login: user.login });
    }

    public async addObject(user: EntityUserAccount) {
        const password = (user.password != null) ? user.password : "";
        const cryptedPassword = await bcrypt.hash(password, this.rounds);
        await this.model.create({
            login: user.login,
            password: cryptedPassword,
            refresh_token: "",
        });
    }

    public async updateObject(user: EntityUserAccount) {
        const toUpdate: any = {}
        if (user.password != null) {
            toUpdate.password = await bcrypt.hash(user.password, this.rounds);
        }
        if (user.refresh_token != null) {
            toUpdate.refresh_token = user.refresh_token;
        }
        await this.model.updateOne({ _id: user._id }, toUpdate);
    }
}

export default new AuthenticationController();