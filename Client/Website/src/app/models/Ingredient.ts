export interface IngredientAttributes {

    required: boolean,
    quantity: number

}

export interface Ingredient extends IngredientAttributes {

    food_id: string,
    stock_id: string


}