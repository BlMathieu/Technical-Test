import { useState } from "react";
import AuthenticationRequest from "../../request/AuthenticationRequest";
import { login } from "../../reducer/JwtReducer";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { setLoginWindow } from "../../reducer/WindowReducer";
import { setBasket } from "../../reducer/BasketReducer";
import BasketRequest from "../../request/BasketRequest";
import { Button } from "@mui/material";
function Login() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const window = useSelector(state => state.windowReducer.loginWindow);
    if (window) {
        return (
            <>
                <section className="window">
                    <h3>Connexion</h3>
                    <form onSubmit={async (event) => {
                        event.preventDefault();
                        const access_token = (await AuthenticationRequest.login({ login: username, password: password })).access_token;
                        if(access_token != null ||access_token != ""){
                            dispatch(login(access_token));
                            const basket = await BasketRequest.getUserBasket(access_token);
                            dispatch(setBasket(basket));
                            dispatch(setLoginWindow(false))
                        }
             
                    }}>
                        <div>
                            <label htmlFor="username">Nom d'utilisateur</label>
                            <input id="username" type="text" value={username} onChange={(event) => { setUsername(event.target.value) }} />
                        </div>
                        <div>
                            <label htmlFor="password">Mot de passe</label>
                            <input id="password" type="password" value={password} onChange={(event) => { setPassword(event.target.value) }} />
                        </div>
                        <div>
                            <div>
                                <Button variant="outlined" type="submit">Se connecter</Button>
                            </div>
                            <div>
                                <Button variant="outlined" value="Annuler" onClick={() => {
                                    dispatch(setLoginWindow(false))
                                }}>Annuler</Button>
                            </div>
                        </div>

                    </form>
                </section>

            </>
        );
    }
}

export default Login;