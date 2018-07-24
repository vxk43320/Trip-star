import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
        { id: 0, name: 'Zero', imageUrl:'app/images/'},
        { id: 11, name: 'Homes', imageUrl: 'app/images/form1.jpg' },
        { id: 12, name: 'Experiences', imageUrl: 'app/images/form1.jpg'},
        { id: 13, name: 'Restuarants', imageUrl: 'app/images/form1.jpg' },
        { id: 14, name: 'Hotels', imageUrl: 'app/images/form3.jpg' },
        { id: 15, name: 'Hyderbad', imageUrl: 'app/images/Form2.jpg' },
        { id: 16, name: 'Vizag', imageUrl: 'app/images/Form2.jpg' },
        { id: 17, name: 'Ahamadbad', imageUrl: 'app/images/Form2.jpg' },
        { id: 18, name: 'Benagluru', imageUrl: 'app/images/Form2.jpg'},
        { id: 19, name: 'Magma', imageUrl: 'app/images/home.jpg'},
        { id: 20, name: 'taj', imageUrl: 'app/images/home.jpg' },
        { id: 21, name: 'mysore', imageUrl: 'app/images/home.jpg' },
        { id: 22, name: 'novotel', imageUrl: 'app/images/home.jpg' },
        { id: 21, name: 'mysore', imageUrl: 'app/images/home.jpg' },
        { id: 22, name: 'novotel', imageUrl: 'app/images/home.jpg' }
    ];
    return {heroes};
  }
}
