export interface OrderAttributes {

    date: string,
    status: boolean,

}

export interface Order extends OrderAttributes {

    food: {
        id: string,
        quantity: number;
    }[];

}