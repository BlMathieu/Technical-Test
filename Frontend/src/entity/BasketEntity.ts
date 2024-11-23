interface BasketEntity{
    _id?:string,
    product_id:string,
    user_id:string,
    product_name:string,
    product_price:number,
    amount:number,
}
export default BasketEntity;