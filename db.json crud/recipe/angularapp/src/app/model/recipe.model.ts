export interface recipe {
    id?: number; // Optional property for the unique identifier of the recipe
    name: string; // The name of the recipe
    ingredients: string; // A list of ingredients required for the recipe
    instructions: string; // Step-by-step instructions for preparing the recipe
    prepTime: number; // Preparation time in minutes
    cookTime: number; // Cooking time in minutes
}
