export interface Food extends FoodAttributes {

    ingredients: number[], //The ingredients constituting the food

}

export interface FoodAttributes {
    label: string, //Name of the food
    description: string, //A detailed description
    price: number, //Price of the food
    is_served: boolean, //Is it currently served at the restaurant?
    image_path: string; //Path of the image representing the food

}