import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './products-dto/createProductDto';
import { UpdateProductDto } from './products-dto/updateProductDto';
import { Iproduct } from './products-interfaces/Iproduct';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private productModel: Model<Iproduct>) {}

  async getAllUserProducts(user: any) {
    return await this.productModel.find({ owner: user.username });
  }

  async getUserProductById(_id: string, user: any) {
    return await this.productModel.findOne({ _id, email: user.username });
  }

  async createProduct(productToCreate: CreateProductDto, user: any) {
    const newProduct = new this.productModel({
      ...productToCreate,
      owner: user.username,
    });
    return await newProduct.save();
  }

  async updateProduct(
    _id: string,
    productUpdates: UpdateProductDto,
    user: any,
  ) {
    const productToBeUpdated = await this.productModel.findOne({ _id });
    if (!productToBeUpdated || productToBeUpdated.owner !== user.username) {
      return "Product to update doesn't exist in the user account";
    }
    return await this.productModel.findOneAndUpdate({ _id }, productUpdates, {
      new: true,
    });
  }

  async deleteProduct(_id: string, user: any) {
    const productToDeleted = await this.productModel.findOne({ _id });
    if (!productToDeleted || productToDeleted.owner !== user.username) {
      return "Product to delete doesn't exist in the user account";
    }
    return await this.productModel.findOneAndDelete({ _id });
  }
}
