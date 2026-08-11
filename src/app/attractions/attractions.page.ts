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

  // WhatsApp number
  private readonly whatsappNumber: string = '27849009821';

  // Locations data
  locations: any[] = [
    {
      name: 'Durban Oceanic',
      address: '82A, 82B & 117, Durban',
      tag: 'Beachfront',
      tagClass: 'beach',
      lat: -29.8593,
      lng: 31.0139
    },
    {
      name: 'La Tiah Musgrave',
      address: 'Musgrave, Durban',
      tag: 'Upscale',
      tagClass: 'upscale',
      lat: -29.8491,
      lng: 30.9925
    },
    {
      name: 'Tiah Musgrave',
      address: 'Musgrave, Durban',
      tag: 'Comfort',
      tagClass: 'comfort',
      lat: -29.8485,
      lng: 30.9918
    },
    {
      name: 'Halford Backpackers',
      address: 'Halford, Durban',
      tag: 'Budget',
      tagClass: 'budget',
      lat: -29.8450,
      lng: 30.9950
    }
  ];

  // All attractions data with Google Maps coordinates
  attractions: any[] = [
    // ===================== BEACHES =====================
    {
      id: 1,
      name: 'Durban Beachfront',
      description: 'Golden miles of sandy beaches with a vibrant promenade, perfect for swimming, sunbathing, and water sports.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      category: 'beach',
      distance: '0.5 km',
      location: 'North Beach',
      hours: '24/7',
      rating: 4.8,
      reviews: 245,
      near: ['Durban Oceanic', 'Halford Backpackers'],
      lat: -29.8390,
      lng: 31.0423
    },
    {
      id: 2,
      name: 'uShaka Marine World',
      description: 'One of the largest marine theme parks in Africa, featuring an aquarium, water park, and dolphin shows.',
      image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=800&q=80',
      category: 'beach',
      distance: '1.2 km',
      location: 'Point Waterfront',
      hours: '09:00 - 17:00',
      rating: 4.7,
      reviews: 189,
      near: ['Durban Oceanic'],
      lat: -29.8650,
      lng: 31.0270
    },
    {
      id: 3,
      name: 'Suncoast Beach & Casino',
      description: 'A popular beachfront destination with a casino, restaurants, and entertainment venues.',
      image: 'https://imgs.search.brave.com/yjZ9xOQsxzrD3UxeEAmPqsx-nB-ENHXl_NhpWpJCXgc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pb2wt/cHJvZC5hcHBzcG90/LmNvbS9pbWFnZS9m/MmMzMWE0NTMzZGM2/ZTM0NTdmMzU0ZjYx/NGI1N2EzNDZhNTlh/MWExPXc3MDA',
      category: 'beach',
      distance: '1.8 km',
      location: 'Suncoast',
      hours: '24/7',
      rating: 4.5,
      reviews: 156,
      near: ['Durban Oceanic'],
      lat: -29.8280,
      lng: 31.0450
    },
    {
      id: 4,
      name: 'North Beach',
      description: 'Popular swimming beach with lifeguards, shark nets, and beautiful views of the Indian Ocean.',
      image: 'https://imgs.search.brave.com/4TUjaxUuobr_P9Tut5361KiFGWuceA3oEE7VvHDA3Sc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9ub3J0/aC1iZWFjaC1iZWFj/aGZyb250LWR1cmJh/bi1zb3V0aC1hZnJp/Y2EtbWFyY2gtbWFu/eS1wZW9wbGUtY2hp/bGRyZW4tMzkwNTg5/NTYuanBn',
      category: 'beach',
      distance: '0.3 km',
      location: 'North Beach',
      hours: '24/7',
      rating: 4.6,
      reviews: 312,
      near: ['Durban Oceanic', 'Halford Backpackers'],
      lat: -29.8330,
      lng: 31.0400
    },
    {
      id: 5,
      name: 'South Beach',
      description: 'A quieter beach area perfect for relaxation and sunset walks along the promenade.',
      image: 'https://imgs.search.brave.com/VPoZr1vcHYion8Ij8r4I25SvmYsfMZWPOZGGgonzzXc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9iZWFj/aC1jaXR5LTQ2MjQ2/ODIuanBn',
      category: 'beach',
      distance: '2.5 km',
      location: 'South Beach',
      hours: '24/7',
      rating: 4.4,
      reviews: 98,
      near: ['Durban Oceanic'],
      lat: -29.8450,
      lng: 31.0450
    },
    {
      id: 6,
      name: 'Umhlanga Rocks Beach',
      description: 'Beautiful beach with golden sand, known for its iconic lighthouse and swimming facilities.',
      image: 'https://imgs.search.brave.com/9jXIej0CT06omT6iffZBUypvVfGnVkIFLSfdAIoor9Q/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE5/NTEwOTk5Ny9waG90/by91bWhsYW5nYS1i/ZWFjaC1idWlsZGlu/Z3MtZnJvbS1vY2Vh/bi5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9dmVRRFVUT2dP/Q0dyVTZVNHN3OUpw/enQtZHRhWnpHaWIt/YXBCVWV6ZlBVZz0',
      category: 'beach',
      distance: '15 km',
      location: 'Umhlanga',
      hours: '24/7',
      rating: 4.9,
      reviews: 420,
      near: ['Musgrave'],
      lat: -29.7270,
      lng: 31.0860
    },

    // ===================== CULTURE =====================
    {
      id: 7,
      name: 'Moses Mabhida Stadium',
      description: 'Iconic 2010 FIFA World Cup stadium with a 350-meter high arch offering breathtaking views of Durban.',
      image: 'https://imgs.search.brave.com/7jKu-Mkxc7-e2pvTu7vnzM0ufHaUNCl4Kv8W3kPT5B4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9tb3Nl/cy1tYWJoaWRhLXN0/YWRpdW0tZHVyYmFu/LXNvdXRoLWFmcmlj/YS1mZWJydWFyeS1l/YXJseS1tb3JuaW5n/LXBhdmVkLXByb21l/bmFkZS1ncmVlbi1n/cmFzcy1sYXduLXBh/bG0tdHJlZXMtYWdh/aW5zdC04NzU5MDYz/NC5qcGc',
      category: 'culture',
      distance: '3.2 km',
      location: 'Stamford Hill',
      hours: '08:00 - 18:00',
      rating: 4.7,
      reviews: 234,
      near: ['Durban Oceanic'],
      lat: -29.8280,
      lng: 31.0320
    },
    {
      id: 8,
      name: 'Durban Botanic Gardens',
      description: 'Africa\'s oldest surviving botanical garden, featuring a stunning collection of indigenous and exotic plants.',
      image: 'https://imgs.search.brave.com/2EF6LDWJlmpaXypd__Dg6XYpB6bC1MsFjfw8UZOBJ1c/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS1w/aG90by9kdXJiYW4t/Ym90YW5pY2FsLWdh/cmRlbnMta3dhenVs/dS1uYXRhbC0yNjBu/dy0xNzA1MTE4MTgy/LmpwZw',
      category: 'nature',
      distance: '2.8 km',
      location: 'Berea',
      hours: '07:30 - 17:00',
      rating: 4.6,
      reviews: 178,
      near: ['La Tiah Musgrave', 'Tiah Musgrave'],
      lat: -29.8450,
      lng: 30.9950
    },
    {
      id: 9,
      name: 'KwaMuhle Museum',
      description: 'Historic museum housed in the former Native Administration Building, telling the story of Durban\'s history.',
      image: 'https://imgs.search.brave.com/LB_V-RGa4KmVyc9BoQfme7k405iZEcwIt4qniq4xiQ0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/dWx3YXppcHJvZ3Jh/bW1lLm9yZy93cC1j/b250ZW50L3VwbG9h/ZHMvMjAxMi8wNC84/MDBweC1Ld2FNdWhs/ZV8wMS0zMDB4MjI1/LmpwZw',
      category: 'culture',
      distance: '4.0 km',
      location: 'City Centre',
      hours: '08:30 - 16:00',
      rating: 4.3,
      reviews: 89,
      near: ['Durban Oceanic'],
      lat: -29.8570,
      lng: 31.0230
    },
    {
      id: 10,
      name: 'Victoria Street Market',
      description: 'Vibrant Indian market offering spices, traditional clothing, and authentic Durban cuisine.',
      image: 'https://imgs.search.brave.com/JSOv6ZrD8YT1yXn8Cx-xBMiIm1eAD-Bg_AhJN_ssIxQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/ZGlzY292ZXJ3YWxr/cy5jb20vYmxvZy93/cC1jb250ZW50L3Vw/bG9hZHMiMjAyMi8w/Ny96YS1kdXJiYW4t/dmljdC1zdHItbWFy/a2V0LmpwZw',
      category: 'culture',
      distance: '3.5 km',
      location: 'City Centre',
      hours: '08:00 - 17:00',
      rating: 4.4,
      reviews: 145,
      near: ['Durban Oceanic'],
      lat: -29.8600,
      lng: 31.0200
    },
    {
      id: 11,
      name: 'Durban City Hall',
      description: 'Historic city hall building with a neo-Renaissance architectural style and the Durban Natural Science Museum.',
      image: 'https://imgs.search.brave.com/IpkMXfW637sO2hCzjvGHYOJv9eu6FN3JAteO8oEmxtg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS50aW1lb3V0LmNv/bS9pbWFnZXMvMTA2/Mjg0NDU0Lzc1MC80/MjIvaW1hZ2UuanBn',
      category: 'culture',
      distance: '3.8 km',
      location: 'City Centre',
      hours: '08:00 - 16:30',
      rating: 4.5,
      reviews: 112,
      near: ['Durban Oceanic'],
      lat: -29.8550,
      lng: 31.0280
    },

    // ===================== NATURE =====================
    {
      id: 12,
      name: 'Umhlanga Lagoon Nature Reserve',
      description: 'A stunning coastal reserve with walking trails, bird watching, and beautiful views of the Umhlanga Estuary.',
      image: 'https://imgs.search.brave.com/9r_R9iFUEG4uDVrCx-FVxyUWQv3lhOk_j1QqF0DPqsQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/dGhlc2F1bnRlci5j/by56YS93cC1jb250/ZW50L3VwbG9hZHMv/MjAxOC8wMi9VbWdo/bGFuZ2EtTGFnb29u/LTYuanBn',
      category: 'nature',
      distance: '16 km',
      location: 'Umhlanga',
      hours: '06:00 - 18:00',
      rating: 4.7,
      reviews: 156,
      near: ['Musgrave'],
      lat: -29.7220,
      lng: 31.0920
    },
    {
      id: 13,
      name: 'Palmiet Nature Reserve',
      description: 'A tranquil nature reserve in the heart of Durban with walking trails, indigenous forests, and birdlife.',
      image: 'https://imgs.search.brave.com/Ih48vE7rTzERWBDTSbC56DfhHXhNDDczQF3rLu0LL8w/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9nb2Jp/cmRpbmcuYmlyZGxp/ZmUub3JnLnphL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIyLzA2/L0taTl9EdXJiYW4t/YW5kLXN1cnJvdW5k/c19QYWxtaWV0LU5h/dHVyZS1SZXNlcnZl/X1Bob3RvLTFfYnlf/U3RldmUtRGF2aWVz/LmpwZw',
      category: 'nature',
      distance: '4.5 km',
      location: 'Westville',
      hours: '07:00 - 17:00',
      rating: 4.5,
      reviews: 98,
      near: ['La Tiah Musgrave', 'Tiah Musgrave'],
      lat: -29.8350,
      lng: 30.9600
    },
    {
      id: 14,
      name: 'Burman Bush Nature Reserve',
      description: 'A small urban nature reserve with coastal forest, walking trails, and a variety of bird species.',
      image: 'https://imgs.search.brave.com/XlvVqiPkn8HNgwnYmnC4cnTZxVOarDG0TtiXBlvgqWg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9kM2Zw/aGt4eWY1bzVibS5j/bG91ZGZyb250Lm5l/dC9pbWFnZS1yZXNp/emUvZm9ybWF0PXdl/YnAsdz0xMjAwL1F3/Ulk1NExpMUhNd0Q3/b05mb2J6OW5SVTEw/ekRpWWVhendkTU1R/NVJxdw',
      category: 'nature',
      distance: '3.8 km',
      location: 'Morningside',
      hours: '06:00 - 18:00',
      rating: 4.3,
      reviews: 67,
      near: ['La Tiah Musgrave', 'Tiah Musgrave'],
      lat: -29.8350,
      lng: 31.0000
    },

    // ===================== ENTERTAINMENT =====================
    {
      id: 15,
      name: 'Gateway Theatre of Shopping',
      description: 'Africa\'s largest shopping centre with over 400 stores, restaurants, and entertainment options.',
      image: 'https://imgs.search.brave.com/m60LWGIOs4YE992e5PFU5_XUdotATE_qy_W5FZjUons/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8w/LzA0L0dhdGV3YXlf/VGhlYXRyZV9vZl9T/aG9wcGluZ19leHRl/cmlvci5qcGc',
      category: 'entertainment',
      distance: '18 km',
      location: 'Umhlanga',
      hours: '09:00 - 21:00',
      rating: 4.6,
      reviews: 567,
      near: ['Musgrave'],
      lat: -29.7200,
      lng: 31.0750
    },
    {
      id: 16,
      name: 'Durban Ice Rink',
      description: 'A fun indoor ice skating rink perfect for families and groups, located in the city centre.',
      image: 'https://imgs.search.brave.com/_3AsZDq9gK1sopMYOMr4O8asMM9trbhM58-cspu8iyM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/bmV0cGFnZXMuY28u/emEvbWVkaWEvemEv/bnBpbWcvMzYzODAx/XzM2MzkwMC9EdXJi/YW4rSWNlK1Jpbmst/MzYzODAxX2JfY3Jh/d2xmODlhY2RjMDhh/MWFiMzVmOGRjNDQ5/YTMyMGUzZmRmZS5q/cGc',
      category: 'entertainment',
      distance: '4.2 km',
      location: 'Berea',
      hours: '10:00 - 20:00',
      rating: 4.2,
      reviews: 78,
      near: ['La Tiah Musgrave', 'Tiah Musgrave'],
      lat: -29.8550,
      lng: 30.9900
    },

    // ===================== MORE ATTRACTIONS =====================
    {
      id: 19,
      name: 'Durban Harbour',
      description: 'One of the busiest ports in Africa, offering harbour cruises and beautiful waterfront views.',
      image: 'https://imgs.search.brave.com/w-dkCv-bNKtzuwF9q__RMsT5ZPOvot65jGgOg2s_AuQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pb2wt/cHJvZC5hcHBzcG90/LmNvbS9pbWFnZS9j/NjZjMjRiNTE4NWM0/YWZjNzBkNTA3ZGRh/YjlkMTVkZjQ4MjQ2/ODYwPXc3MDA',
      category: 'culture',
      distance: '2.8 km',
      location: 'Harbour',
      hours: '24/7',
      rating: 4.5,
      reviews: 145,
      near: ['Durban Oceanic'],
      lat: -29.8700,
      lng: 31.0300
    },
    {
      id: 20,
      name: 'Mitchell Park Zoo',
      description: 'A small zoo and park featuring a variety of animals, a bird aviary, and beautiful gardens.',
      image: 'https://imgs.search.brave.com/DlHLxQVJXb22Eq7P7q6ambirRabYPAqCqeVrXdp2vzY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/dGhlc291dGhhZnJp/Y2FuLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyNS8xMi9k/dXJiYW4tcGxheWdy/b3VuZC1taXRjaGVs/bC5qcGcub3B0aW1h/bC5qcGc',
      category: 'nature',
      distance: '5.0 km',
      location: 'Morningside',
      hours: '08:30 - 17:00',
      rating: 4.3,
      reviews: 89,
      near: ['La Tiah Musgrave', 'Tiah Musgrave'],
      lat: -29.8500,
      lng: 31.0100
    },
    {
      id: 21,
      name: 'Kings Park Stadium',
      description: 'Historic sports stadium, also known as Hollywoodbets Kings Park, home to rugby and soccer matches.',
      image: 'https://imgs.search.brave.com/cnsj10CYMLu612CYU-LQljIQpsZGu2HG61AEe3tbwUQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNjQ3/MzcwMTQ0L3Bob3Rv/L2tpbmdzLXBhcmst/c3RhZGl1bS1mcm9t/LXRoZS10b3Atb2Yt/dGhlLWFyY2gtYXQt/bW0tc3RhZGl1bS1v/ci1tb3Nlcy1tYWJo/aWRhLXN0YWRpdW0t/ZHVyYmFuLW9yLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1l/NkJMNDdzZFVuRzdk/YlNvdUdHdWQwR3Ro/dGpsS1RkRGZVZzd1/SkM2clk4PQ',
      category: 'entertainment',
      distance: '2.5 km',
      location: 'Kings Park',
      hours: 'Varies',
      rating: 4.6,
      reviews: 234,
      near: ['Durban Oceanic'],
      lat: -29.8250,
      lng: 31.0350
    },
    {
      id: 22,
      name: 'Blue Lagoon',
      description: 'A popular spot where the Umgeni River meets the Indian Ocean, perfect for walks and picnics.',
      image: 'https://imgs.search.brave.com/WLNbIvih9cpVdqnOqzlHfXN5z7sd__vT8uqfXKIPaC4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9ibHVl/LWxhZ29vbi1zb3V0/aC1hZnJpY2EtZHVy/YmFuLWFyZWEtdHJh/ZGl0aW9uYWwtbWVl/dGluZy1wb2ludC1p/bmRpYW4tY29tdW5p/dHktNjA3ODY5NDMu/anBn',
      category: 'nature',
      distance: '6.5 km',
      location: 'Blue Lagoon',
      hours: '24/7',
      rating: 4.5,
      reviews: 112,
      near: ['Durban Oceanic'],
      lat: -29.7950,
      lng: 31.0500
    },
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

  // =========================
  // BOOKING FUNCTIONS
  // =========================
  goToBookingPage() {
    this.router.navigate(['/booking']);
  }

  goToBooking() {
    const message = 'Hello STAY@TIAH, I would like to make a booking enquiry.';
    window.open(`https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
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
  // OPEN IN GOOGLE MAPS
  // =========================
  openInGoogleMaps(attraction: any) {
    if (attraction.lat && attraction.lng) {
      // Open with coordinates for exact location
      const url = `https://www.google.com/maps/search/?api=1&query=${attraction.lat},${attraction.lng}`;
      window.open(url, '_blank');
    } else {
      // Fallback to name search
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(attraction.name + ' Durban South Africa')}`;
      window.open(url, '_blank');
    }
  }

  // =========================
  // OPEN LOCATION IN GOOGLE MAPS
  // =========================
  openLocationInMaps(location: any) {
    if (location.lat && location.lng) {
      const url = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
      window.open(url, '_blank');
    } else {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.name + ' Durban South Africa')}`;
      window.open(url, '_blank');
    }
  }

  // =========================
  // WHATSAPP
  // =========================
  openWhatsApp() {
    const message = 'Hello STAY@TIAH, I would like to make a booking enquiry.';
    window.open(`https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  }
}