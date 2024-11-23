import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductRequest from "../../request/ProductRequest";
import ProductEntity from "../../entity/ProductEntity";
import { setAddWindow } from "../../reducer/WindowReducer";
import { setProducts } from "../../reducer/ProductReducer";
import { Button } from "@mui/material";

function ProductCardAdd() {
    const dispatch = useDispatch();
    const window = useSelector(state => state.windowReducer.addWindow);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState(0);
    const [rating, setRating] = useState(0);
    const [warranty, setWarranty] = useState(0);
    const [available, setAvailable] = useState(false);

    if (window) {
        return (
            <>
                <section className="window">
                    <h3>Ajouter un produit</h3>
                    <form onSubmit={async (event) => {
                        event.preventDefault();
                        const product: ProductEntity = { name: name, type: type, price: price, rating: rating, warranty_years: warranty, available: available }
                        await ProductRequest.addProduct(product);
                        dispatch(setProducts(await ProductRequest.getProducts()));
                    }}>
                        <div>
                            <label htmlFor="name">Nom</label>
                            <input id="name" type="text" value={name} onChange={(event) => { setName(event.target.value) }} />
                        </div>
                        <div>
                            <label htmlFor="type">Type</label>
                            <input id="type" type="text" value={type} onChange={(event) => { setType(event.target.value) }} />
                        </div>
                        <div>
                            <label htmlFor="price">Prix</label>
                            <input id="price" type="number" value={price} onChange={(event) => { setPrice(Number(event.target.value)) }} />
                        </div>
                        <div>
                            <label htmlFor="rate">Note</label>
                            <input id="rate" type="number" value={rating} onChange={(event) => { setRating(Number(event.target.value)) }} />
                        </div>
                        <div>
                            <label htmlFor="warranty">Garantie</label>
                            <input id="warranty" type="number" value={warranty} onChange={(event) => { setWarranty(Number(event.target.value)) }} />
                        </div>
                        <div>
                            <label htmlFor="available">Disponible</label>
                            <input id="available" type="checkbox" checked={available} onChange={(event) => { setAvailable(Boolean(event.target.checked)) }} />
                        </div>
                        <div className="choice">
                            <div>
                                <Button variant="outlined" type="submit">Ajouter</Button>
                            </div>
                            <div>
                                <Button variant="outlined" onClick={() => {
                                    dispatch(setAddWindow(false));
                                }}>Annuler</Button>
                            </div>
                        </div>

                    </form>
                </section>
            </>
        );
    }
}

export default ProductCardAdd;