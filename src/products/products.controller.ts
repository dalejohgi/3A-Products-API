import { Controller, Get, Param, Post, Body, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { ProductsService } from './products.service';
//import { Iproduct } from './products-interfaces/Iproduct';
import { CreateProductDto } from './products-dto/createProductDto';
import { UpdateProductDto } from './products-dto/updateProductDto';
import { JwtAuthGuard } from 'src/auth/jwr-auth.guard';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllProducts(@Request() req): Promise<any> {
    return this.productsService.getAllUserProducts(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getProduct(@Param('id') _id, @Request() req): Promise<any> {
    return this.productsService.getUserProductById(_id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createProduct(@Body() productToCreate: CreateProductDto, @Request() req) {
    return this.productsService.createProduct(productToCreate, req.user);
  }
  
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateProduct(@Body() productUpdates: UpdateProductDto, @Param('id') _id: string, @Request() req) {
    return this.productsService.updateProduct(_id, productUpdates, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteProduct(@Param('id') _id, @Request() req) {
    return this.productsService.deleteProduct(_id, req.user);
  }
}
