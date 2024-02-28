import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductFacade } from '../steps/findAllItems/findItems';
import { ProductFilterFacade } from '../steps/findAllItems/filter/filterProducts';
import { ProductFacadeById } from 'src/steps/findById/findItemsById';
@Module({
  controllers: [ProductsController],
  providers: [ ProductFilterFacade, ProductFacadeById, ProductFacade, ProductsService],
})
export class ProductsModule {}
