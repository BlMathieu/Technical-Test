import "./Navigation.css";
import { setLoginWindow, setRegisterWindow, setAddWindow, setBasketWindow } from "../../reducer/WindowReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AuthenticationRequest from "../../request/AuthenticationRequest";
import { logout } from "../../reducer/JwtReducer";
import { setBasket } from "../../reducer/BasketReducer";
function Navigation() {
    const dispatch = useDispatch();
    const loginWindow = useSelector(state => state.windowReducer.loginWindow);
    const registerWindow = useSelector(state => state.windowReducer.registerWindow);
    const addWindow = useSelector(state => state.windowReducer.addWindow);
    const basketWindow = useSelector(state => state.windowReducer.basketWindow);
    const changeLogin = () => {
        dispatch(setLoginWindow(!loginWindow));
    }

    const changeRegister = () => {
        dispatch(setRegisterWindow(!registerWindow));
    }

    const changeAddWindow = () => {
        dispatch(setAddWindow(!addWindow));
    }

    const changeBasket = () => {
        dispatch(setBasketWindow(!basketWindow));
    }

    const GetNavOption = () => {
        const token = useSelector(state => state.jwtReducer.access_token);
        if (token == null || token === "") {
            return (
                <>
                    <li onClick={changeLogin}>Se connecter</li>
                    <li onClick={changeRegister}>S'enregister</li>
                </>
            );
        } else {
            return (
                <>
                    <li onClick={async () => {
                        await AuthenticationRequest.logout();
                        dispatch(logout());
                        dispatch(setBasket([]));
                    }}>Se déconnecter</li>
                    <li onClick={changeBasket}>Panier</li>

                </>
            );
        }
    }

    return (
        <>
            <nav>
                <ul>
                    {GetNavOption()}
                    <li onClick={changeAddWindow}>Ajouter un produit</li>
                </ul>
            </nav>
        </>

    );
}

export default Navigation;