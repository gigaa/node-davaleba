import { Injectable } from '@nestjs/common';

@Injectable()
export class WhishlistService {
  getWhishlistByLang(lang) {
    const whishlist = {
      ka: [{ id: 1, name: 'სათამაშო', descreption: 'ტრანსფორმერი მანქანა' }],
      ru: [{ id: 2, name: 'Игрушка', descreption: 'Машина-трансформер' }],
      en: [{ id: 3, name: 'Toy', descreption: 'Transformer car' }],
      ger: [{ id: 4, name: 'Spielzeug', descreption: 'Transformer-Auto' }],
      fr: [{ id: 5, name: 'Jouet', descreption: 'Voiture transformable' }],
      it: [{ id: 6, name: 'Giocattolo', descreption: 'Macchina transformer' }],
    };

    return whishlist[lang];
  }
}
