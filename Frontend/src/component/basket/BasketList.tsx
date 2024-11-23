import { useSelector } from "react-redux";
import BasketEntity from "../../entity/BasketEntity";
import BasketCard from "./BasketCard";
function BasketList() {


    const basket = useSelector(state => state.basketReducer.basket);
    const GetBasket = () => {
        return (
            basket.map((card: BasketEntity) => {
                return <BasketCard key={card._id} data={card} />
            })
        );
    }

    const basketWindow = useSelector(state => state.windowReducer.basketWindow);

    if (basketWindow) {
        return (
            <section className='list'>
                <div>
                    <h3>Panier : </h3>
                </div>
                <div className="cardList">
                    {GetBasket()}
                </div>
            </section>
        );
    }

}

export default BasketList;
