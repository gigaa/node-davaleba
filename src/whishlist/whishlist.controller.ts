import { Controller, DefaultValuePipe, Get, Query } from '@nestjs/common';
import { WhishlistService } from './whishlist.service';

@Controller('whishlist')
export class WhishlistController {
  constructor(private readonly WhishlistService: WhishlistService) {}

  @Get('')
  getAnimalByLang(@Query('lang', new DefaultValuePipe('en')) lang) {
    return this.WhishlistService.getWhishlistByLang(lang);
  }
}
