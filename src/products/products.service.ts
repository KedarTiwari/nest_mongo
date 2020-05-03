import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from './product.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
    products : Product[] = [];
    insertProduct(title: string, desc:string, price:number) {
        const prodId = uuidv4();
        const newProduct = new Product(prodId, title, desc, price);
        this.products.push(newProduct);
        return prodId;
    }

    getProducts() {
        return [...this.products];
    }

    getSingleProduct(productId: string) {
        const [product] = this.findProduct(productId);
        return {...product};
    }

    updateProduct(productId: string, title: string, desc: string, price: number) {
        const [product, productIndex] = this.findProduct(productId);
        const updatedProduct = {...product};
        if(title) {
            updatedProduct.title = title;
        }
        if(desc) {
            updatedProduct.description = desc;
        }
        if(price) {
            updatedProduct.price = price;
        }
        this.products[productIndex] = updatedProduct;
    }

    removeProduct(prodId: string) {
        const [product, productIndex] = this.findProduct(prodId);
        const deletedProduct = this.products.splice(productIndex, 1);
        return {...deletedProduct};
    }

    private findProduct(prodId: string): [Product, number] {
        const productIndex = this.products.findIndex(prod => prod.id === prodId);
        const product = this.products[productIndex];
        if(!product) {
            throw new NotFoundException();
        }
        return [product, productIndex];
    }
}