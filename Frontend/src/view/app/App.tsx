import { useEffect } from 'react';
import { useDispatch } from "react-redux"
import Navigation from '../../component/navigation/Navigation';
import UserInformation from '../../component/user/UserInformation';
import ProductCardList from "../../component/product/ProductCardList";
import ProductCardEdit from "../../component/product/ProductCardEdit";
import ProductCardAdd from "../../component/product/ProductCardAdd";
import Register from '../register/Register';
import Login from "../login/Login";
import AuthenticationRequest from '../../request/AuthenticationRequest';
import { login } from '../../reducer/JwtReducer';
import BasketList from '../../component/basket/BasketList';
import BasketRequest from '../../request/BasketRequest';
import { setBasket } from '../../reducer/BasketReducer';

function App() {
  const dispatch = useDispatch(); 
  useEffect(() => {
    const autoLogin = async () => {
      const response = await AuthenticationRequest.autoLogin();
      dispatch(login(response.access_token));
      const userBasket = await BasketRequest.getUserBasket(response.access_token);
      dispatch(setBasket(userBasket));
    }
    autoLogin();
  }, []);

  return (
    <>
      <Navigation />
      <Register />
      <Login />
      <ProductCardAdd />
      <ProductCardList />
      <ProductCardEdit />
      <BasketList/>
      <UserInformation />
    </>
  );
}

export default App
