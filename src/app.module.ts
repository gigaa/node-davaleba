import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './prodacts/product.module';
import { WhishlistModule } from './whishlist/whishlist.module';

@Module({
  imports: [ProductModule, WhishlistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
