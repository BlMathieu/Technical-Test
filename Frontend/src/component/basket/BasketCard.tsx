import { useDispatch, useSelector } from "react-redux";
import BasketEntity from "../../entity/BasketEntity";
import BasketRequest from "../../request/BasketRequest";
import { setBasket } from "../../reducer/BasketReducer";
function BasketCard(props: { data: BasketEntity }) {
    const dispatch = useDispatch();
    const token = useSelector(state => state.jwtReducer.access_token);

    return (
        <>
            <div className="card">
                <div>
                    <p>Nom du produit : {props.data.product_name}</p>
                    <p>Prix du produit : {props.data.product_price} €</p>
                    <p>Nombres : {props.data.amount}</p>
                    <p>Total : {props.data.product_price * props.data.amount} €</p>
                </div>
                <div>
                    <input type="button" value="Ajouter" onClick={async () => {
                        await BasketRequest.addToBasket(token, props.data);
                        const basket = await BasketRequest.getUserBasket(token);
                        dispatch(setBasket(basket));
                    }} />
                </div>
                <div>
                    <input type="button" value="Supprimer" onClick={async () => {
                        const id: string = (props.data._id != null) ? props.data._id : "";
                        await BasketRequest.deleteBasketProductById(token, id);
                        const basket = await BasketRequest.getUserBasket(token);
                        dispatch(setBasket(basket));
                    }} />
                </div>

            </div>
        </>
    );
}

export default BasketCard;