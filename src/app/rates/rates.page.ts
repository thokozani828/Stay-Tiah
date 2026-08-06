import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.page.html',
  styleUrls: ['./rates.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RatesPage {

  // Mobile navigation state
  mobileNavOpen: boolean = false;

  activeLocation: string = 'all';

  // WhatsApp number
  private readonly whatsappNumber: string = '27849009821';

  // Rates Data - Matching your actual rooms
  rates: any[] = [
    // ==================== DURBAN OCEANIC ====================
    {
      id: 1,
      name: 'Durban Oceanic Room 82A',
      location: 'Durban Oceanic',
      locationType: 'oceanic',
      sleeps: '2 Guests',
      bed: 'Queen Bed',
      price: '1,200',
      rating: 6.7,
      reviews: 37,
      popular: true,
      new: false,
      featured: true,
      amenities: ['Swimming pool', 'Free parking', 'Free Wifi', 'Terrace', 'Hot tub', 'Flat-screen TV', 'Shower', 'View']
    },
    {
      id: 11,
      name: 'Durban Oceanic Apartment 82B',
      location: 'Durban Oceanic',
      locationType: 'oceanic',
      sleeps: '2 Guests',
      bed: '1 Full Bed',
      price: '896',
      rating: 8.4,
      reviews: 62,
      popular: true,
      new: true,
      featured: true,
      amenities: ['Outdoor swimming pool', 'Private Parking', 'Free Wifi', 'Terrace', 'Kitchen', 'Bath', 'Washing machine', 'Flat-screen TV']
    },
    {
      id: 12,
      name: 'Durban Oceanic Apartment 117',
      location: 'Durban Oceanic',
      locationType: 'oceanic',
      sleeps: '2 Guests',
      bed: '1 Full Bed',
      price: '896',
      rating: 8.6,
      reviews: 15,
      popular: true,
      new: true,
      featured: true,
      amenities: ['Swimming pool', 'Free parking', 'Free Wifi', 'Air conditioning', 'Private pool', 'Kitchenette', 'Washing machine', 'Flat-screen TV']
    },

    // ==================== TIAH MUSGRAVE ====================
    {
      id: 19,
      name: 'Tiah Whyte',
      location: 'Tiah Musgrave',
      locationType: 'musgrave',
      sleeps: '2 Guests',
      bed: 'Queen Bed',
      price: '855',
      rating: 8.8,
      reviews: 57,
      popular: true,
      new: true,
      featured: true,
      amenities: ['Free parking', 'Non-smoking rooms', 'Free Wifi', 'Air conditioning', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker']
    },
    {
      id: 17,
      name: 'Tiah Grey',
      location: 'Tiah Musgrave',
      locationType: 'musgrave',
      sleeps: '2 Guests',
      bed: 'Queen Bed',
      price: '675',
      rating: 8.2,
      reviews: 45,
      popular: true,
      new: true,
      featured: true,
      amenities: ['Free parking', 'Non-smoking rooms', 'Air conditioning', 'Kitchenette', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker']
    },
    {
      id: 18,
      name: 'Tiah Pastel',
      location: 'Tiah Musgrave',
      locationType: 'musgrave',
      sleeps: '2 Guests',
      bed: 'Queen Bed',
      price: '675',
      rating: 7.8,
      reviews: 30,
      popular: true,
      new: true,
      featured: true,
      amenities: ['Free parking', 'Air conditioning', 'Kitchenette', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker']
    },

    // ==================== LA TIAH MUSGRAVE ====================
    {
      id: 16,
      name: 'La Tiah One',
      location: 'La Tiah Musgrave',
      locationType: 'la-musgrave',
      sleeps: '2 Guests',
      bed: 'Full Bed + Queen Bed',
      price: '553',
      rating: null,
      reviews: 0,
      popular: false,
      new: true,
      featured: false,
      isNewToBooking: true,
      amenities: ['Free parking', 'Free Wifi', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker', 'Refrigerator', 'Electric kettle']
    },
    {
      id: 13,
      name: 'La Tiah Two',
      location: 'La Tiah Musgrave',
      locationType: 'la-musgrave',
      sleeps: '2 Guests',
      bed: 'Full Bed',
      price: '513.16',
      rating: 5.8,
      reviews: 6,
      popular: false,
      new: true,
      featured: false,
      isNewToBooking: true,
      amenities: ['Free parking', 'Free Wifi', 'Shared kitchen', 'Daily housekeeping', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker']
    },
    {
      id: 14,
      name: 'La Tiah Three',
      location: 'La Tiah Musgrave',
      locationType: 'la-musgrave',
      sleeps: '2 Guests',
      bed: 'Queen Bed',
      price: '553',
      rating: null,
      reviews: 0,
      popular: false,
      new: true,
      featured: false,
      amenities: ['Free parking', 'Free Wifi', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker', 'Refrigerator', 'Electric kettle']
    },
    {
      id: 15,
      name: 'La Tiah Four',
      location: 'La Tiah Musgrave',
      locationType: 'la-musgrave',
      sleeps: '2 Guests',
      bed: 'King Bed',
      price: '485',
      rating: 9.5,
      reviews: 2,
      popular: true,
      new: true,
      featured: true,
      amenities: ['Free parking', 'Free Wifi', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker', 'Refrigerator', 'Electric kettle']
    },

    // ==================== HALFORD BACKPACKERS ====================
    {
      id: 2,
      name: 'Halford Backpackers',
      location: 'Halford Backpackers',
      locationType: 'halford',
      sleeps: '4 Guests',
      bed: 'Bunk Beds',
      price: '450',
      rating: null,
      reviews: 0,
      popular: true,
      new: false,
      featured: false,
      amenities: ['Free Wifi', 'Pet Friendly', 'Shower', 'Shared Kitchen', 'Work Desk', 'Microwave', 'Electric Kettle']
    }
  ];

  // Filtered rates based on location
  get filteredRates(): any[] {
    if (this.activeLocation === 'all') {
      return this.rates;
    }
    return this.rates.filter(rate => rate.locationType === this.activeLocation);
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
  setLocation(location: string) {
    this.activeLocation = location;
  }

  // =========================
  // VIEW ROOM DETAIL
  // =========================
  viewRoomDetail(roomId: number) {
    this.router.navigate(['/room-detail'], { queryParams: { roomId: roomId } });
  }

  // =========================
  // WHATSAPP
  // =========================
  openWhatsApp() {
    const message = 'Hello STAY@TIAH, I would like to enquire about room rates.';
    window.open(`https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  }
}