import AuthenticationController from "../controller/AuthenticationController";
import APIError from "../error/APIError";
import JWTAuthentifier from "../jwt/JWTAuthentifier";

const isLogged = (req: any, res: any, next: any) => {
    try {
        const accessToken = (req.headers.authorization != null) ? req.headers.authorization.replace("Bearer ", "") : "";
        if (accessToken == null || accessToken === "") {
            throw new APIError("Aucun token d'authentification trouvé !");
        }
        const user = JWTAuthentifier.getUserFromAccessToken(accessToken);
        if (user == null) {
            throw new APIError("L'utilisateur n'est pas authentifier !");
        }

        const id: string = (user._id != null) ? user._id : "";
        const db_user = AuthenticationController.getObjectById(id);
        if (db_user == null) {
            throw new APIError("Aucun utilisateur trouvé !");
        }
        next();
    } catch (error) {
        console.error(error);
        res.send({ message: error });
    }
}

export default isLogged;