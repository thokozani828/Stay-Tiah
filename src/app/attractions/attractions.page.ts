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

  // All attractions data - Full list
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
      near: ['Durban Oceanic', 'Halford Backpackers']
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
      near: ['Durban Oceanic']
    },
    {
      id: 3,
      name: 'Suncoast Beach & Casino',
      description: 'A popular beachfront destination with a casino, restaurants, and entertainment venues.',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      category: 'beach',
      distance: '1.8 km',
      location: 'Suncoast',
      hours: '24/7',
      rating: 4.5,
      reviews: 156,
      near: ['Durban Oceanic']
    },
    {
      id: 4,
      name: 'North Beach',
      description: 'Popular swimming beach with lifeguards, shark nets, and beautiful views of the Indian Ocean.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      category: 'beach',
      distance: '0.3 km',
      location: 'North Beach',
      hours: '24/7',
      rating: 4.6,
      reviews: 312,
      near: ['Durban Oceanic', 'Halford Backpackers']
    },
    {
      id: 5,
      name: 'South Beach',
      description: 'A quieter beach area perfect for relaxation and sunset walks along the promenade.',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      category: 'beach',
      distance: '2.5 km',
      location: 'South Beach',
      hours: '24/7',
      rating: 4.4,
      reviews: 98,
      near: ['Durban Oceanic']
    },
    {
      id: 6,
      name: 'Umhlanga Rocks Beach',
      description: 'Beautiful beach with golden sand, known for its iconic lighthouse and swimming facilities.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      category: 'beach',
      distance: '15 km',
      location: 'Umhlanga',
      hours: '24/7',
      rating: 4.9,
      reviews: 420,
      near: ['Musgrave']
    },

    // ===================== CULTURE =====================
    {
      id: 7,
      name: 'Moses Mabhida Stadium',
      description: 'Iconic 2010 FIFA World Cup stadium with a 350-meter high arch offering breathtaking views of Durban.',
      image: 'https://images.unsplash.com/photo-1577212019881-6b0f5b9ecae3?auto=format&fit=crop&w=800&q=80',
      category: 'culture',
      distance: '3.2 km',
      location: 'Stamford Hill',
      hours: '08:00 - 18:00',
      rating: 4.7,
      reviews: 234,
      near: ['Durban Oceanic']
    },
    {
      id: 8,
      name: 'Durban Botanic Gardens',
      description: 'Africa\'s oldest surviving botanical garden, featuring a stunning collection of indigenous and exotic plants.',
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
      category: 'nature',
      distance: '2.8 km',
      location: 'Berea',
      hours: '07:30 - 17:00',
      rating: 4.6,
      reviews: 178,
      near: ['La Tiah Musgrave', 'Tiah Musgrave']
    },
    {
      id: 9,
      name: 'KwaMuhle Museum',
      description: 'Historic museum housed in the former Native Administration Building, telling the story of Durban\'s history.',
      image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?auto=format&fit=crop&w=800&q=80',
      category: 'culture',
      distance: '4.0 km',
      location: 'City Centre',
      hours: '08:30 - 16:00',
      rating: 4.3,
      reviews: 89,
      near: ['Durban Oceanic']
    },
    {
      id: 10,
      name: 'Victoria Street Market',
      description: 'Vibrant Indian market offering spices, traditional clothing, and authentic Durban cuisine.',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80',
      category: 'culture',
      distance: '3.5 km',
      location: 'City Centre',
      hours: '08:00 - 17:00',
      rating: 4.4,
      reviews: 145,
      near: ['Durban Oceanic']
    },
    {
      id: 11,
      name: 'Durban City Hall',
      description: 'Historic city hall building with a neo-Renaissance architectural style and the Durban Natural Science Museum.',
      image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?auto=format&fit=crop&w=800&q=80',
      category: 'culture',
      distance: '3.8 km',
      location: 'City Centre',
      hours: '08:00 - 16:30',
      rating: 4.5,
      reviews: 112,
      near: ['Durban Oceanic']
    },

    // ===================== NATURE =====================
    {
      id: 12,
      name: 'Umhlanga Lagoon Nature Reserve',
      description: 'A stunning coastal reserve with walking trails, bird watching, and beautiful views of the Umhlanga Estuary.',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
      category: 'nature',
      distance: '16 km',
      location: 'Umhlanga',
      hours: '06:00 - 18:00',
      rating: 4.7,
      reviews: 156,
      near: ['Musgrave']
    },
    {
      id: 13,
      name: 'Palmiet Nature Reserve',
      description: 'A tranquil nature reserve in the heart of Durban with walking trails, indigenous forests, and birdlife.',
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
      category: 'nature',
      distance: '4.5 km',
      location: 'Westville',
      hours: '07:00 - 17:00',
      rating: 4.5,
      reviews: 98,
      near: ['La Tiah Musgrave', 'Tiah Musgrave']
    },
    {
      id: 14,
      name: 'Burman Bush Nature Reserve',
      description: 'A small urban nature reserve with coastal forest, walking trails, and a variety of bird species.',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
      category: 'nature',
      distance: '3.8 km',
      location: 'Morningside',
      hours: '06:00 - 18:00',
      rating: 4.3,
      reviews: 67,
      near: ['La Tiah Musgrave', 'Tiah Musgrave']
    },

    // ===================== ENTERTAINMENT =====================
    {
      id: 15,
      name: 'Gateway Theatre of Shopping',
      description: 'Africa\'s largest shopping centre with over 400 stores, restaurants, and entertainment options.',
      image: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&w=800&q=80',
      category: 'entertainment',
      distance: '18 km',
      location: 'Umhlanga',
      hours: '09:00 - 21:00',
      rating: 4.6,
      reviews: 567,
      near: ['Musgrave']
    },
    {
      id: 16,
      name: 'Durban Ice Rink',
      description: 'A fun indoor ice skating rink perfect for families and groups, located in the city centre.',
      image: 'https://images.unsplash.com/photo-1530382801179-1563ea9ac1fe?auto=format&fit=crop&w=800&q=80',
      category: 'entertainment',
      distance: '4.2 km',
      location: 'Berea',
      hours: '10:00 - 20:00',
      rating: 4.2,
      reviews: 78,
      near: ['La Tiah Musgrave', 'Tiah Musgrave']
    },
    {
      id: 17,
      name: 'Bat Centre',
      description: 'Cultural and entertainment hub featuring live music, art exhibitions, and performances.',
      image: 'https://images.unsplash.com/photo-1528605105345-5344ea20e269?auto=format&fit=crop&w=800&q=80',
      category: 'entertainment',
      distance: '3.5 km',
      location: 'Point Waterfront',
      hours: '09:00 - 22:00',
      rating: 4.3,
      reviews: 134,
      near: ['Durban Oceanic']
    },
    {
      id: 18,
      name: 'Funworld',
      description: 'An amusement park on the Durban beachfront with rides, games, and family-friendly attractions.',
      image: 'https://images.unsplash.com/photo-1517457373951-e8883afeef98?auto=format&fit=crop&w=800&q=80',
      category: 'entertainment',
      distance: '1.0 km',
      location: 'North Beach',
      hours: '10:00 - 18:00',
      rating: 4.4,
      reviews: 156,
      near: ['Durban Oceanic', 'Halford Backpackers']
    },

    // ===================== MORE ATTRACTIONS =====================
    {
      id: 19,
      name: 'Durban Harbour',
      description: 'One of the busiest ports in Africa, offering harbour cruises and beautiful waterfront views.',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      category: 'culture',
      distance: '2.8 km',
      location: 'Harbour',
      hours: '24/7',
      rating: 4.5,
      reviews: 145,
      near: ['Durban Oceanic']
    },
    {
      id: 20,
      name: 'Mitchell Park Zoo',
      description: 'A small zoo and park featuring a variety of animals, a bird aviary, and beautiful gardens.',
      image: 'https://images.unsplash.com/photo-1576858577544-b4cf3c0d7b7f?auto=format&fit=crop&w=800&q=80',
      category: 'nature',
      distance: '5.0 km',
      location: 'Morningside',
      hours: '08:30 - 17:00',
      rating: 4.3,
      reviews: 89,
      near: ['La Tiah Musgrave', 'Tiah Musgrave']
    },
    {
      id: 21,
      name: 'Kings Park Stadium',
      description: 'Historic sports stadium, also known as Hollywoodbets Kings Park, home to rugby and soccer matches.',
      image: 'https://images.unsplash.com/photo-1577212019881-6b0f5b9ecae3?auto=format&fit=crop&w=800&q=80',
      category: 'entertainment',
      distance: '2.5 km',
      location: 'Kings Park',
      hours: 'Varies',
      rating: 4.6,
      reviews: 234,
      near: ['Durban Oceanic']
    },
    {
      id: 22,
      name: 'Blue Lagoon',
      description: 'A popular spot where the Umgeni River meets the Indian Ocean, perfect for walks and picnics.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      category: 'nature',
      distance: '6.5 km',
      location: 'Blue Lagoon',
      hours: '24/7',
      rating: 4.5,
      reviews: 112,
      near: ['Durban Oceanic']
    },
    {
      id: 23,
      name: 'Westville Art Gallery',
      description: 'Contemporary art gallery showcasing local and international artists in a modern setting.',
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
      category: 'culture',
      distance: '7.0 km',
      location: 'Westville',
      hours: '10:00 - 17:00',
      rating: 4.4,
      reviews: 67,
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
  // WHATSAPP
  // =========================
  openWhatsApp() {
    const message = 'Hello STAY@TIAH, I would like to make a booking enquiry.';
    window.open(`https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  }
}