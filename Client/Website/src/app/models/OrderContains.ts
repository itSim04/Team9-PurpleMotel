export interface OrderContainsAttributes {

    quantity: number;


}

export interface OrderContains extends OrderContainsAttributes {

    order_id: string;
    food_id: string;

}