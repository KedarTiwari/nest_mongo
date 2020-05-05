import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from './product.model';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
    constructor(@InjectModel('Product') private readonly ProductModel: Model<Product>) { }

    async insertProduct(title: string, desc: string, price: number) {
        const newProduct = new this.ProductModel({ title, description: desc, price });
        await newProduct.save();
        return newProduct.id;
    }

    async getProducts() {
        const products = await this.ProductModel.find().exec();
        return products.map((prod) => ({
            id: prod.id,
            title: prod.title,
            desc: prod.description,
            price: prod.price,
        }));
    }

    async getSingleProduct(productId: string) {
        let product;
        try {
            product = await this.ProductModel.findById(productId);
        } catch (error) {
            throw new NotFoundException("product not found");
        }
        return product;
    }

    async updateProduct(productId: string, title: string, desc: string, price: number) {
        let updatedProduct;
        try {
            updatedProduct = await this.ProductModel.findById(productId);
            if (!updatedProduct) {
                throw new NotFoundException("product not found");
            }
            if (title) {
                updatedProduct.title = title;
            }
            if (desc) {
                updatedProduct.description = desc;
            }
            if (price) {
                updatedProduct.price = price;
            }
            await updatedProduct.save();
        } catch (error) {
            throw new NotFoundException("product not found")
        }
        return updatedProduct;
    }

    async removeProduct(prodId: string) {
        let product;
        try {
            product = await this.ProductModel.findById(prodId);
        } catch (error) {
            throw new NotFoundException("product not found");
        }
        if(!product) throw new NotFoundException("product not found");
        return await product.remove();
    }
}