import ProductRequest from "../../request/ProductRequest";
import { setCurrentProduct, setProducts } from "../../reducer/ProductReducer";
import ProductEntity from "../../entity/ProductEntity";
import { useDispatch, useSelector } from "react-redux";
import { setEditWindow } from "../../reducer/WindowReducer";
import BasketRequest from "../../request/BasketRequest";
import BasketEntity from "../../entity/BasketEntity";
import { setBasket } from "../../reducer/BasketReducer";
function ProductCard(props: { data: ProductEntity }) {
    
    const dispatch = useDispatch();
    const token = useSelector(state => state.jwtReducer.access_token);
    const user = useSelector(state => state.jwtReducer.user);
    const addToBasket = async () => {
        const product_id: string = (props.data._id != null) ? props.data._id : "";
        const basket: BasketEntity = {
            product_id: product_id,
            user_id: user._id,
            product_name: props.data.name,
            product_price: props.data.price,
            amount: 1,
        }
        await BasketRequest.addToBasket(token, basket);
        const newBasket = await BasketRequest.getUserBasket(token);
        dispatch(setBasket(newBasket));
    }

    const getAvailable = () => {
        if (props.data.available) {
            return "oui";
        } else {
            return "non"
        }
    }
    return (
        <>
            <div className="card">
                <div>
                    <p>Nom : {props.data.name}</p>
                    <p>Type :  {props.data.type}</p>
                    <p>Prix : {props.data.price}</p>
                    <p>Note : {props.data.rating}</p>
                    <p>Garantie : {props.data.warranty_years}</p>
                    <p>Disponible : {getAvailable()}</p>
                </div>
                <div>
                    <input value="Panier" type="button" onClick={addToBasket} />
                </div>
                <div>
                    <input value="Modifier" type="button" onClick={async () => {
                        dispatch(setEditWindow(true));
                        const product: ProductEntity = {
                            _id: props.data._id,
                            name: props.data.name,
                            type: props.data.type,
                            price: props.data.price,
                            rating: props.data.rating,
                            warranty_years: props.data.warranty_years,
                            available: props.data.available,
                        }
                        dispatch(setCurrentProduct(product));
                    }} />
                </div>
                <div>
                    <input value="Supprimer" type="button" onClick={async () => {
                        const id: string = (props.data._id != null) ? props.data._id : "";
                        await ProductRequest.deleteProduct(id);
                        const products = await ProductRequest.getProducts();
                        dispatch(setProducts(products));
                    }} />
                </div>
            </div>
        </>
    );
}

export default ProductCard