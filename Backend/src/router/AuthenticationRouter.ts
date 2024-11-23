import express from "express";
import AuthenticationController from "../controller/AuthenticationController";
import JWTAuthentifier from "../jwt/JWTAuthentifier";
import APIError from "../error/APIError";
const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const data = req.body;
        const credentials = {
            login: data.login,
            password: data.password,
        }

        const tokens = await AuthenticationController.login(credentials);

        res.cookie('refresh_token', 'Bearer ' + tokens.refresh_token, {
            maxAge: 1 * 1000 * 60 * 60 * 24,
            httpOnly: true,
            secure: false,
            sameSite: "strict",
        });

        res.send({ access_token: tokens.access_token });
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});

router.post("/autoLogin", async (req, res) => {
    try {
        const refresh_token = (req.cookies.refresh_token != null) ? req.cookies.refresh_token.toString().replace("Bearer ", "") : "";
        if (refresh_token == null || refresh_token === "") { throw new APIError("Refresh token cannot be null or empty !"); }
        const user: any = JWTAuthentifier.getUserFromRefreshToken(refresh_token);
        const access_token = JWTAuthentifier.generateAccessToken({ _id: user._id, login: user.login });
        const dbUser = AuthenticationController.getObjectById(user._id);
        if (dbUser == null) {
            throw new APIError("L'utilisateur n'existe pas !");
        }
        res.send({ access_token: access_token });
    } catch (error) {
        console.error(error);
        res.send({ message: error });
    }
})

router.post("/logout", async (req, res) => {
    try {
        const accessToken = (req.headers.authorization != null) ? req.headers.authorization.replace("Bearer ", "") : "";
        if (accessToken != "") {
            const user = JWTAuthentifier.getUserFromAccessToken(accessToken);
            await AuthenticationController.logout(user.login);
        }
        res.cookie('refresh_token', "");
        res.send({ message: `Déconnexion réussi !` });
    } catch (error) {
        console.error(error)
        res.send({ message: error });
    }
});

router.post("/account", async (req, res) => {
    try {
        const data = req.body;
        const user = {
            login: data.login,
            password: data.password,
            refresh_token: "",
        }
        await AuthenticationController.addObject(user);
        res.send({ message: `${user.login} a été créé` });
    } catch (error) {
        console.error(error);
        res.send({ message: error });
    }
});

router.delete("/account", async (req, res) => {
    try {
        const accessToken = (req.headers.authorization != null) ? req.headers.authorization.replace("Bearer ", "") : "";
        if (accessToken === "") {
            throw new APIError("Aucun token !");
        }
        const user = JWTAuthentifier.getUserFromAccessToken(accessToken);
        if (user == null) {
            throw new APIError("L'utilisateur n'existe pas !")
        }
        const id: string = (user._id != null) ? user._id : "";
        await AuthenticationController.deleteObjectById(id);
        res.send({ message: `L'utilisateur ${user.login} a bien été supprimé !` });
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});

export default router;