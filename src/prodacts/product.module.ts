import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { blockBrowser } from 'middleware/blockBrowser.middleware';
import { AuthMidlleware } from 'middleware/Auth.middleware';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(blockBrowser)
      .exclude({ path: 'products', method: RequestMethod.GET })
      .forRoutes(ProductController);

    consumer
      .apply(AuthMidlleware)
      .exclude({ path: 'products', method: RequestMethod.GET })
      .forRoutes(ProductController);
  }
}
