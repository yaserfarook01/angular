export interface House {
    id?: number; // Optional property for the unique identifier of the house
    address: string; // The address of the house
    type: string; // The type of the house (e.g., detached, semi-detached, apartment)
    bedrooms: number; // The number of bedrooms in the house
    bathrooms: number; // The number of bathrooms in the house
    size: number; // The size of the house in square meters or square feet
}
