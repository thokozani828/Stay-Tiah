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
    // ... rest of your attractions data
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