import ProductCard from './ProductCard';
import ProductEntity from '../../entity/ProductEntity';
import { useSelector } from 'react-redux';
import "./ProductCardList.css";
import { useEffect } from 'react';
import { setProducts } from '../../reducer/ProductReducer';
import { useDispatch } from 'react-redux';
import ProductRequest from "../../request/ProductRequest";

function ProductCardList() {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchProduct = async () => {
            const products = await ProductRequest.getProducts();
            dispatch(setProducts(products));
        }
        fetchProduct();
    }, []);


    const GetProducts = () => {
        const products = useSelector(state => state.productReducer.products);
        return (
            products.map((card: ProductEntity) => {
                return <ProductCard key={card._id} data={card} />
            })
        );
    }

    return (
        <section className='list'>
            <div>
                <h3>Produits :</h3>
            </div>
            <div className='cardList'>
            {GetProducts()}
            </div>

        </section>
    );
}

export default ProductCardList;