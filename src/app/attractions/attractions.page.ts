import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-attractions',
  templateUrl: './attractions.page.html',
  styleUrls: ['./attractions.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AttractionsPage {

  // Mobile navigation state
  mobileNavOpen: boolean = false;

  activeFilter: string = 'all';

  // Locations data
  locations: any[] = [
    {
      name: 'Durban Oceanic',
      address: '82A, 82B & 117, Durban',
      tag: 'Beachfront',
      tagClass: 'beach'
    },
    {
      name: 'La Tiah Musgrave',
      address: 'Musgrave, Durban',
      tag: 'Upscale',
      tagClass: 'upscale'
    },
    {
      name: 'Tiah Musgrave',
      address: 'Musgrave, Durban',
      tag: 'Comfort',
      tagClass: 'comfort'
    },
    {
      name: 'Halford Backpackers',
      address: 'Halford, Durban',
      tag: 'Budget',
      tagClass: 'budget'
    }
  ];

  // All attractions data
  attractions: any[] = [
    // Beaches
    {
      id: 1,
      name: 'Durban Beachfront',
      description: 'Golden miles of sandy beaches with a vibrant promenade, perfect for swimming, sunbathing, and water sports.',
      image: 'https://imgs.search.brave.com/QlWGxVPskcSLzln70grI7prJG82_RjddbqGseFUnUIU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDU4/MDkxODg5L3Bob3Rv/L2R1cmJhbi1iZWFj/aGZyb250LmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1BTEJM/Smlmd3FscmdmbXo0/MWtZal9NbGZ0clot/TG9DcTJYa2tVYTJB/bW13PQ',
      category: 'beach',
      distance: '0.5 km',
      location: 'North Beach',
      hours: '24/7',
      rating: 4.8,
      reviews: 245,
      near: ['Durban Oceanic', 'Halford Backpackers']
    },
    {
      id: 2,
      name: 'uShaka Marine World',
      description: 'World-class aquarium, water park, and marine theme park with dolphin shows, shark dives, and exciting water slides.',
      image: 'https://imgs.search.brave.com/RH7jCh9IFfzmrLt_kZWDu5CdqYRme--8oVfxhky2D0w/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9mYWN0/cy5uZXQvd3AtY29u/dGVudC91cGxvYWRz/LzIwMjMvMDkvMTgt/dW5iZWxpZXZhYmxl/LWZhY3RzLWFib3V0/LXVzaGFrYS1tYXJp/bmUtd29ybGQtMTY5/NTQwOTg3OC5qcGc',
      category: 'entertainment',
      distance: '1.2 km',
      location: 'Point Waterfront',
      hours: '9:00 AM - 5:00 PM',
      rating: 4.7,
      reviews: 312,
      near: ['Durban Oceanic', 'Halford Backpackers']
    },
    {
      id: 3,
      name: 'Golden Mile',
      description: 'Durban\'s famous Golden Mile stretches along the coastline with beautiful beaches, restaurants, and entertainment venues.',
      image: 'https://imgs.search.brave.com/FUpWu51-1toI8jb23sdKZ17lQ7KB4oAqd2dWzqmIwjs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9kdXJi/YW4tZ29sZGVuLW1p/bGUtYmVhY2gtd2hp/dGUtc2FuZC1za3ls/aW5lLXNvdXRoLWFm/cmljYS1rem4tMTg1/ODE4MDMwLmpwZw',
      category: 'beach',
      distance: '0.3 km',
      location: 'Beachfront',
      hours: '24/7',
      rating: 4.6,
      reviews: 189,
      near: ['Durban Oceanic', 'Halford Backpackers']
    },
    {
      id: 4,
      name: 'Suncoast Casino & Entertainment',
      description: 'Premier entertainment destination with casino, restaurants, cinema, and nightlife options.',
      image: 'https://imgs.search.brave.com/yjZ9xOQsxzrD3UxeEAmPqsx-nB-ENHXl_NhpWpJCXgc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pb2wt/cHJvZC5hcHBzcG90/LmNvbS9pbWFnZS9m/MmMzMWE0NTMzZGM2/ZTM0NTdmMzU0ZjYx/NGI1N2EzNDZhNTlh/MWExPXc3MDA',
      category: 'entertainment',
      distance: '2.5 km',
      location: 'Suncoast',
      hours: '24/7',
      rating: 4.3,
      reviews: 156,
      near: ['Durban Oceanic', 'Halford Backpackers']
    },

    // Culture
    {
      id: 5,
      name: 'Moses Mabhida Stadium',
      description: 'Iconic stadium with a unique arch design. Take the sky-car to the top for breathtaking 360-degree views of Durban.',
      image: 'https://imgs.search.brave.com/65z5kUO3wRRT9tD4-cNr1kZuMGOrlrFZwLDYbadKllM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNjc0/MTA4NzY4L3Bob3Rv/L21vc2VzLW1hYmhp/ZGEtc3RhZGl1bS1p/bi1kdXJiYW4tZnJv/bS1hYm92ZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9dm16/aFRoTU5WQTI5U19q/ZEZaZFl3Skt2eFR6/U29OOTRvYzIxbmhk/T29JYz0',
      category: 'culture',
      distance: '3.0 km',
      location: 'Stamford Hill',
      hours: '8:00 AM - 6:00 PM',
      rating: 4.5,
      reviews: 278,
      near: ['La Tiah Musgrave', 'Tiah Musgrave']
    },
    {
      id: 6,
      name: 'Durban Botanic Gardens',
      description: 'Africa\'s oldest surviving botanic gardens featuring diverse plant species, walking trails, and peaceful picnic spots.',
      image: 'https://imgs.search.brave.com/2EF6LDWJlmpaXypd__Dg6XYpB6bC1MsFjfw8UZOBJ1c/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS1w/aG90by9kdXJiYW4t/Ym90YW5pY2FsLWdh/cmRlbnMta3dhenVs/dS1uYXRhbC0yNjBu/dy0xNzA1MTE4MTgy/LmpwZw',
      category: 'nature',
      distance: '1.8 km',
      location: 'Musgrave',
      hours: '7:30 AM - 5:30 PM',
      rating: 4.6,
      reviews: 198,
      near: ['La Tiah Musgrave', 'Tiah Musgrave']
    },
    {
      id: 7,
      name: 'KwaMuhle Museum',
      description: 'Historical museum showcasing Durban\'s rich cultural heritage, apartheid history, and African art exhibitions.',
      image: 'https://imgs.search.brave.com/LB_V-RGa4KmVyc9BoQfme7k405iZEcwIt4qniq4xiQ0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/dWx3YXppcHJvZ3Jh/bW1lLm9yZy93cC1j/b250ZW50L3VwbG9h/ZHMvMjAxMi8wNC84/MDBweC1Ld2FNdWhs/ZV8wMS0zMDB4MjI1/LmpwZw',
      category: 'culture',
      distance: '2.2 km',
      location: 'Durban City',
      hours: '8:30 AM - 4:00 PM',
      rating: 4.2,
      reviews: 134,
      near: ['La Tiah Musgrave', 'Tiah Musgrave']
    },
    {
      id: 8,
      name: 'Durban City Hall',
      description: 'Historic building with a stunning colonial architecture, housing a library, art gallery, and exhibition spaces.',
      image: 'https://imgs.search.brave.com/IpkMXfW637sO2hCzjvGHYOJv9eu6FN3JAteO8oEmxtg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS50aW1lb3V0LmNv/bS9pbWFnZXMvMTA2/Mjg0NDU0Lzc1MC80/MjIvaW1hZ2UuanBn',
      category: 'culture',
      distance: '2.5 km',
      location: 'Durban City',
      hours: '8:00 AM - 5:00 PM',
      rating: 4.4,
      reviews: 112,
      near: ['La Tiah Musgrave', 'Tiah Musgrave']
    },

    // Nature
    {
      id: 9,
      name: 'Mitchell Park Zoo',
      description: 'A charming zoo in the heart of Durban, featuring a variety of animals, a tranquil park, and children\'s play areas.',
      image: 'https://imgs.search.brave.com/DlHLxQVJXb22Eq7P7q6ambirRabYPAqCqeVrXdp2vzY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/dGhlc291dGhhZnJp/Y2FuLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyNS8xMi9k/dXJiYW4tcGxheWdy/b3VuZC1taXRjaGVs/bC5qcGcub3B0aW1h/bC5qcGc',
      category: 'nature',
      distance: '1.5 km',
      location: 'Musgrave',
      hours: '8:30 AM - 5:00 PM',
      rating: 4.3,
      reviews: 167,
      near: ['La Tiah Musgrave', 'Tiah Musgrave']
    },
    {
      id: 10,
      name: 'Durban Harbour',
      description: 'Africa\'s busiest port with scenic views, boat tours, and a variety of waterfront dining and entertainment options.',
      image: 'https://imgs.search.brave.com/w-dkCv-bNKtzuwF9q__RMsT5ZPOvot65jGgOg2s_AuQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pb2wt/cHJvZC5hcHBzcG90/LmNvbS9pbWFnZS9j/NjZjMjRiNTE4NWM0/YWZjNzBkNTA3ZGRh/YjlkMTVkZjQ4MjQ2/ODYwPXc3MDA',
      category: 'nature',
      distance: '2.0 km',
      location: 'Durban Harbour',
      hours: '24/7',
      rating: 4.4,
      reviews: 145,
      near: ['Durban Oceanic', 'Halford Backpackers']
    },
    {
      id: 11,
      name: 'Umgeni River Bird Park',
      description: 'A lush park with a large collection of exotic birds, waterfowl, and peaceful walking trails along the river.',
      image: 'https://imgs.search.brave.com/mN2EsZWwWdjWl5xHuehL28stnva9sgk4C3W8rg1WMG0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9oYmxp/bWcubW10Y2RuLmNv/bS9jb250ZW50L2h1/YmJsZS9pbWcvZHVy/YmFuL21tdC9hY3Rp/dml0aWVzL3RfdHJw/L21fRHVyYmFuX1Vt/Z2VuaV9SaXZlcl9C/aXJkX1BhcmtfMV9s/XzQ1Ml82NzguanBn/P2ltPVJlc2l6ZT0o/MTIwMCw1NzAp',
      category: 'nature',
      distance: '4.5 km',
      location: 'Umgeni',
      hours: '9:00 AM - 5:00 PM',
      rating: 4.5,
      reviews: 189,
      near: ['La Tiah Musgrave', 'Tiah Musgrave']
    },

    // Entertainment
    {
      id: 12,
      name: 'Gateway Theatre of Shopping',
      description: 'Massive shopping centre with over 400 stores, restaurants, entertainment options, and a large cinema complex.',
      image: 'https://imgs.search.brave.com/m60LWGIOs4YE992e5PFU5_XUdotATE_qy_W5FZjUons/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8w/LzA0L0dhdGV3YXlf/VGhlYXRyZV9vZl9T/aG9wcGluZ19leHRl/cmlvci5qcGc',
      category: 'entertainment',
      distance: '8.0 km',
      location: 'Umhlanga',
      hours: '9:00 AM - 9:00 PM',
      rating: 4.7,
      reviews: 423,
      near: ['La Tiah Musgrave', 'Tiah Musgrave']
    },
    {
      id: 13,
      name: 'HollywoodBets Kings Park',
      description: 'Multi-purpose stadium hosting major sporting events, concerts, and entertainment shows.',
      image: 'https://imgs.search.brave.com/OiYdEKHkw9wWS_8OjgE3T9az7EvWOutQr467ys3nRhk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS50aW1lb3V0LmNv/bS9pbWFnZXMvMTA2/MjgyMTIwLzc1MC80/MjIvaW1hZ2UuanBn',
      category: 'entertainment',
      distance: '3.5 km',
      location: 'Kings Park',
      hours: 'Varies by event',
      rating: 4.4,
      reviews: 234,
      near: ['La Tiah Musgrave', 'Tiah Musgrave']
    },
    {
      id: 14,
      name: 'Durban Golf Club',
      description: 'Prestigious golf course with stunning views, challenging fairways, and excellent clubhouse facilities.',
      image: 'https://imgs.search.brave.com/OEvu1QzYDT9dITWNKRLmJ5OdaguuMDUP5x6qUz459RI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9kdXJi/YW5jb3VudHJ5Y2x1/Yi5jby56YS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyNC8wNy9E/dXJiYW4tQ291bnRy/eS1DbHViLUdvbGYw/MDAwNS1zY2FsZWQu/d2VicA',
      category: 'entertainment',
      distance: '2.8 km',
      location: 'Musgrave',
      hours: '6:00 AM - 6:00 PM',
      rating: 4.3,
      reviews: 178,
      near: ['La Tiah Musgrave', 'Tiah Musgrave']
    }
  ];

  // Get filtered attractions
  get filteredAttractions(): any[] {
    if (this.activeFilter === 'all') {
      return this.attractions;
    }
    return this.attractions.filter(a => a.category === this.activeFilter);
  }

  constructor(private router: Router) {}

  // =========================
  // MOBILE NAVIGATION
  // =========================
  toggleMobileNav() {
    this.mobileNavOpen = !this.mobileNavOpen;
    if (this.mobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileNav() {
    this.mobileNavOpen = false;
    document.body.style.overflow = '';
  }

  // =========================
  // NAVIGATION FUNCTIONS
  // =========================
  goToHome() {
    this.router.navigate(['/home']);
  }

  goToAbout() {
    this.router.navigate(['/about']);
  }

  goToRooms() {
    this.router.navigate(['/rooms']);
  }

  goToGallery() {
    this.router.navigate(['/gallery']);
  }

  goToRates() {
    this.router.navigate(['/rates']);
  }

  goToAttractions() {
    this.router.navigate(['/attractions']);
  }

  goToFaq() {
    this.router.navigate(['/faq']);
  }

  goToContact() {
    this.router.navigate(['/contact']);
  }

  goToBooking() {
    const phone = '27791234567';
    const message = 'Hello STAY@TIAH, I would like to make a booking enquiry.';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  }

  // =========================
  // FILTER FUNCTIONS
  // =========================
  setFilter(filter: string) {
    this.activeFilter = filter;
  }

  // =========================
  // GET CATEGORY ICON
  // =========================
  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'beach': 'water-outline',
      'culture': 'book-outline',
      'nature': 'leaf-outline',
      'entertainment': 'game-controller-outline'
    };
    return icons[category] || 'star-outline';
  }

  // =========================
  // WHATSAPP
  // =========================
  openWhatsApp() {
    const phone = '27791234567';
    const message = 'Hello STAY@TIAH, I would like to make a booking enquiry.';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  }
}