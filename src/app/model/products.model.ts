export interface Products{
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    image: string;
    stock: string;
}

export interface AddNewProduct{
    name: string;
    description: string;
    price: string;
    category: number;
    stock: string;
    image: string;
}