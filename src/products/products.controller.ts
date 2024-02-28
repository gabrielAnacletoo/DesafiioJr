import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiTags, ApiResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { NotFoundGetDoc } from './docs/notFound.doc';
import { GetSuccess } from './docs/getSuccess.doc';
import { NotFoundByIdGetDoc } from './docs/notFoundById.doc';
import { GetSuccessDoc } from './docs/getSuccessById.doc';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    type: NotFoundGetDoc,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetSuccess,
  })
  @Get()
  async findProducts(
    @Query('nutrition') nutrition: string,
    @Query('nova') nova: string,
  ) {
    return this.productsService.findProducts(nutrition, nova);
  }

  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    type: NotFoundByIdGetDoc,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetSuccessDoc,
  })
  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.productsService.findProductsById(id);
  }
}
