import { Body, Controller, Get, Post, Query, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { CreateProduct } from './create-product.dto.js';


interface TermekListaInterface {
  name: string
  category: string
  price: number
  stock: number
}


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private termekLista: TermekListaInterface[] = [
  {
    "name": "Vezeték nélküli egér",
    "category": "elektronika",
    "price": 8990,
    "stock": 12
  },
  {
    "name": "Programozás kezdőknek",
    "category": "könyv",
    "price": 6490,
    "stock": 4
  },
  {
    "name": "Mechanikus billentyűzet",
    "category": "elektronika",
    "price": 24990,
    "stock": 3
  },
  {
    "name": "Fekete kapucnis pulóver",
    "category": "ruházat",
    "price": 12990,
    "stock": 8
  },
  {
    "name": "Catan társasjáték",
    "category": "játék",
    "price": 11990,
    "stock": 0
  },
  {
    "name": "USB-C töltőkábel",
    "category": "elektronika",
    "price": 4990,
    "stock": 25
  },
  {
    "name": "Adidas sportcipő",
    "category": "ruházat",
    "price": 27990,
    "stock": 2
  },
  {
    "name": "A kis herceg",
    "category": "könyv",
    "price": 3990,
    "stock": 15
  },
  {
    "name": "LEGO City rendőrségi állomás",
    "category": "játék",
    "price": 34990,
    "stock": 5
  },
  {
    "name": "Bluetooth hangszóró",
    "category": "elektronika",
    "price": 15990,
    "stock": 7
  }
]


  @Get()
  @Render('index')
  readData() {
    return {
      title: 'Adat listazas',
      termekLista: this.termekLista.toSorted((a, b) => a.price - b.price)
    }
  }

  @Get("filter")
  @Render('filter')
  szures(@Query('category') category: string) {
    return {
      title: 'Termek szures',
      selectedCategory: category ?? '',
      termekLista: this.termekLista
        .filter((termek) => !category || termek.category === category)
        .toSorted((a, b) => b.stock - a.stock),
    }
  }

   @Get('new')
  @Render('new')
  GiveNewData() {
    return {
      title: 'Uj termek felvetel',
      successMessage: '',
    }
  }
  @Post('new')
  @Render('new')
  appendProduct(@Body() createProductDto: CreateProduct) {
    this.termekLista.push({
      name: createProductDto.name,
      category: createProductDto.category,
      price: Number(createProductDto.price),
      stock: Number(createProductDto.stock),
    });

    return {
      title: 'Termek felveve',
      successMessage: 'Sikieres feltoltes',
    };
  }
}
