import  * as Mongoose  from "mongoose";

export const ProductSchema = new Mongoose.Schema({
    title: String,
    description: String,
    price: Number,
})

export interface Product extends Mongoose.Document {    
    id: string;
    title: string;
    description: string;
    price: number;
}