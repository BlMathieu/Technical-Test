import BasketEntity from "../entity/BasketEntity";
import AbstractRequest from "./AbstractRequest";

class BasketRequest extends AbstractRequest {
    constructor() {
        super("api");
    }

    public async getUserBasket(access_token: string): Promise<BasketEntity[]> {

        return await fetch(`${this.url}/baskets`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${access_token}`,
            },
            credentials: 'include',
            method: "GET",
        }).then((value) => {
            return value.json();
        }).catch((error) => {
            console.error(error);
        });
    }

    public async deleteBasketProductById(access_token: string, id: string) {
        return await fetch(`${this.url}/basket/${encodeURIComponent(id)}`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${access_token}`,
            },
            credentials: 'include',
            method: "DELETE",
        }).then((value) => {
            return value.json();
        }).catch((error) => {
            console.error(error);
        });
    }

    public async updateBasketProductAmountById(access_token: string, id: string, amount: number) {
        return await fetch(`${this.url}/basket/${encodeURIComponent(id)}/${encodeURIComponent(amount)}`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${access_token}`,
            },
            credentials: 'include',
            method: "PATCH",
        }).then((value) => {
            return value.json();
        }).catch((error) => {
            console.error(error);
        });
    }

    public async addToBasket(access_token: string, basket: BasketEntity) {
        return await fetch(`${this.url}/basket`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${access_token}`,
            },
            credentials: 'include',
            method: "POST",
            body: JSON.stringify(basket),
        }).then((value) => {
            return value.json();
        }).catch((error) => {
            console.error(error);
        });
    }
}

export default new BasketRequest();