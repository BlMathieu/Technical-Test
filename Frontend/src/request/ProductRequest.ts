import AbstractRequest from "./AbstractRequest";
import ProductEntity from "../entity/ProductEntity";
class ProductRequest extends AbstractRequest {
    constructor() {
        super("api");
    }

    public async getProducts(): Promise<ProductEntity[]> {
        const url = `${this.url}/products`;
        return await fetch(url, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }).then((value) => {
            return value.json();
        }).catch((error) => {
            console.error(error);
            return [];
        });
    }

    public async getProductById(id: string): Promise<ProductEntity> {
        const url = `${this.url}/product/${encodeURIComponent(id)}`;
        return await fetch(url, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET",
        }).then((value) => {
            return value.json();
        }).catch((error) => {
            console.error(error);
            return [];
        });
    }

    public async addProduct(product: ProductEntity) {
        const url = `${this.url}/product`;
        return await fetch(url,{
            headers:{
                "Content-Type":"application/json"
            },
            method:"POST",
            body: JSON.stringify(product),
        }).then((value)=>{
            return value.json();
        }).catch((error)=>{
            console.error(error);
        });
    }

    public async deleteProduct(id: string): Promise<string> {
        const url = `${this.url}/product/${encodeURIComponent(id)}`;
        return await fetch(url, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "DELETE",
        }).then((value) => {
            return value.json();
        }).catch((error)=>{
            console.error(error);
        })
    }

    public async updateProduct(id: string, product: ProductEntity): Promise<string> {
        const url = `${this.url}/product/${encodeURIComponent(id)}`;
        return await fetch(url, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PATCH",
            body: JSON.stringify(product),
        }).then((value) => {
            return value.json();
        }).catch((error)=>{
            console.error(error);
        });
    }
}

export default new ProductRequest();