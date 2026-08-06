import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RoomsPage {

  // Add this property for mobile navigation
  mobileNavOpen: boolean = false;

  // Eleven rooms with local images
  allRooms: any[] = [
    // ==================== ROOM 1: DURBAN OCEANIC ROOM 82A ====================
    {
      id: 1,
      name: 'Durban Oceanic Room 82A',
      location: 'Durban Oceanic',
      locationType: 'oceanic',
      sleeps: '2 Guests',
      bed: 'Queen Bed',
      size: '30 m²',
      price: '1,200',
      rating: 6.7,
      reviews: 37,
      distance: '1.8 km from downtown',
      beachDistance: '250 m from beach',
      description: 'Comfortable Living Space: Durban Oceanic Room 82A offers a spacious apartment in Durban.',
      image: 'assets/images/Durban Oceanic Room 82A/1.jpg',
      amenities: ['Swimming pool', 'Free parking', 'Free Wifi', 'Terrace', 'Hot tub', 'Flat-screen TV', 'Shower', 'View'],
      type: 'double',
      popular: true,
      new: false,
      featured: true,
      alternativeDates: [
        { range: 'Aug 9 – Aug 19', nights: '10 nights', price: '6,710.53' },
        { range: 'Aug 9 – Aug 20', nights: '11 nights', price: '7,381.58' },
        { range: 'Aug 9 – Aug 21', nights: '12 nights', price: '8,052.63' }
      ]
    },
    // ==================== ROOM 2: DURBAN OCEANIC APARTMENT 82B ====================
    {
      id: 11,
      name: 'Durban Oceanic Apartment 82B',
      location: 'Durban Oceanic',
      locationType: 'oceanic',
      sleeps: '2 Guests',
      bed: '1 Full Bed',
      size: '30 m²',
      price: '896',
      rating: 8.4,
      reviews: 62,
      distance: '1.8 km from downtown',
      beachDistance: '250 m from beach',
      description: 'Essential Facilities: Durban Oceanic Apartment 82B offers a terrace, outdoor swimming pool, and free WiFi.',
      image: 'assets/images/Durban Oceanic Apartment 82B/8.jpg',
      amenities: ['Outdoor swimming pool', 'Private Parking', 'Free Wifi', 'Terrace', 'Kitchen', 'Bath', 'Washing machine', 'Flat-screen TV'],
      type: 'double',
      popular: true,
      new: true,
      featured: true,
      alternativeDates: [
        { range: 'Aug 9 – Aug 19', nights: '10 nights', price: '6,150.00' },
        { range: 'Aug 9 – Aug 20', nights: '11 nights', price: '6,765.00' },
        { range: 'Aug 9 – Aug 21', nights: '12 nights', price: '7,380.00' }
      ]
    },
    // ==================== ROOM 3: DURBAN OCEANIC APARTMENT 117 ====================
    {
      id: 12,
      name: 'Durban Oceanic Apartment 117',
      location: 'Durban Oceanic',
      locationType: 'oceanic',
      sleeps: '2 Guests',
      bed: '1 Full Bed',
      size: '30 m²',
      price: '896',
      rating: 8.6,
      reviews: 15,
      distance: '1.8 km from downtown',
      beachDistance: '250 m from beach',
      description: 'Comfortable Living Space: Durban Oceanic Apartment 117 offers a one-bedroom apartment with a private pool.',
      image: 'assets/images/Durban Oceanic Apartment 117/3.jpg',
      amenities: ['Swimming pool', 'Free parking', 'Free Wifi', 'Air conditioning', 'Private pool', 'Kitchenette', 'Washing machine', 'Flat-screen TV'],
      type: 'double',
      popular: true,
      new: true,
      featured: true,
      alternativeDates: [
        { range: 'Aug 9 – Aug 19', nights: '10 nights', price: '6,500.00' },
        { range: 'Aug 9 – Aug 20', nights: '11 nights', price: '7,150.00' },
        { range: 'Aug 9 – Aug 21', nights: '12 nights', price: '7,800.00' }
      ]
    },
    // ==================== ROOM 4: TIAH WHYTE (FIXED) ====================
    {
      id: 19,
      name: 'Tiah Whyte',
      location: 'Tiah Musgrave',
      locationType: 'musgrave',
      sleeps: '2 Guests',
      bed: 'Queen Bed',
      size: '24 m²',
      price: '855',
      rating: 8.8,
      reviews: 57,
      distance: '2.3 km from downtown',
      beachDistance: '4.8 km from beach',
      description: 'Comfortable Accommodations: Tiah Whyte offers a guest house with free WiFi and free on-site private parking.',
      image: 'assets/images/Tiah Whyte, Durban/1.jpg',
      amenities: ['Free parking', 'Non-smoking rooms', 'Free Wifi', 'Air conditioning', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker'],
      type: 'double',
      popular: true,
      new: true,
      featured: true,
      alternativeDates: [
        { range: 'Sep 5 – Sep 6', nights: '1 night', price: '855' },
        { range: 'Sep 6 – Sep 7', nights: '1 night', price: '855' }
      ]
    },
    // ==================== ROOM 5: TIAH GREY ====================
    {
      id: 17,
      name: 'Tiah Grey',
      location: 'Tiah Musgrave',
      locationType: 'musgrave',
      sleeps: '2 Guests',
      bed: 'Queen Bed',
      size: '20 m²',
      price: '675',
      rating: 8.2,
      reviews: 45,
      distance: '2.3 km from downtown',
      beachDistance: '4.8 km from beach',
      description: 'Comfortable Accommodations: Tiah Grey offers a homestay experience in Durban, South Africa.',
      image: 'assets/images/Tiah Grey, Durban/1.jpg',
      amenities: ['Free parking', 'Non-smoking rooms', 'Air conditioning', 'Kitchenette', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker'],
      type: 'double',
      popular: true,
      new: true,
      featured: true,
      alternativeDates: [
        { range: 'Sep 6 – Sep 7', nights: '1 night', price: '675' },
        { range: 'Sep 7 – Sep 8', nights: '1 night', price: '675' }
      ]
    },
    // ==================== ROOM 6: TIAH PASTEL ====================
    {
      id: 18,
      name: 'Tiah Pastel',
      location: 'Tiah Musgrave',
      locationType: 'musgrave',
      sleeps: '2 Guests',
      bed: 'Queen Bed',
      size: '20 m²',
      price: '675',
      rating: 7.8,
      reviews: 30,
      distance: '2.3 km from downtown',
      beachDistance: '4.8 km from beach',
      description: 'Comfortable Accommodations: Tiah Pastel offers a guest house with air-conditioning, a kitchenette, and a private bathroom.',
      image: 'assets/images/Tiah Pastel, Durban/1.jpg',
      amenities: ['Free parking', 'Air conditioning', 'Kitchenette', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker'],
      type: 'double',
      popular: true,
      new: true,
      featured: true,
      alternativeDates: [
        { range: 'Sep 3 – Sep 4', nights: '1 night', price: '675' },
        { range: 'Sep 6 – Sep 7', nights: '1 night', price: '675' }
      ]
    },
    // ==================== ROOM 7: LA TIAH ONE ====================
    {
      id: 16,
      name: 'La Tiah One',
      location: 'La Tiah Musgrave',
      locationType: 'musgrave',
      sleeps: '2 Guests',
      bed: 'Full Bed + Queen Bed',
      size: '20 m²',
      price: '553',
      rating: null,
      reviews: 0,
      distance: '2.2 km from downtown',
      beachDistance: '4.6 km from beach',
      description: 'Comfortable Accommodations: La Tiah One offers a guest house experience with free WiFi and free on-site private parking.',
      image: 'assets/images/La Tiah One, Durban/1.jpg',
      amenities: ['Free parking', 'Free Wifi', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker', 'Refrigerator', 'Electric kettle'],
      type: 'double',
      popular: false,
      new: true,
      featured: false,
      isNewToBooking: true,
      alternativeDates: [
        { range: 'Sep 3 – Sep 4', nights: '1 night', price: '553' }
      ]
    },
    // ==================== ROOM 8: LA TIAH TWO ====================
    {
      id: 13,
      name: 'La Tiah Two',
      location: 'La Tiah Musgrave',
      locationType: 'musgrave',
      sleeps: '2 Guests',
      bed: 'Full Bed',
      size: '25 m²',
      price: '513.16',
      rating: 5.8,
      reviews: 6,
      distance: '2.2 km from downtown',
      beachDistance: '4.6 km from beach',
      description: 'Comfortable Accommodations: La Tiah Two offers a guest house experience with free WiFi and a shared kitchen.',
      image: 'assets/images/La Tiah Two, Durban/1.jpg',
      amenities: ['Free parking', 'Free Wifi', 'Shared kitchen', 'Daily housekeeping', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker'],
      type: 'double',
      popular: false,
      new: true,
      featured: false,
      isNewToBooking: true,
      isUnavailable: true,
      unavailableMessage: 'This property is unavailable on our site for your dates',
      availableDates: 'Oct 22 – Oct 23 (1 night)',
      alternativeDates: [
        { range: 'Oct 22 – Oct 23', nights: '1 night', price: '513.16' }
      ]
    },
    // ==================== ROOM 9: LA TIAH THREE ====================
    {
      id: 14,
      name: 'La Tiah Three',
      location: 'La Tiah Musgrave',
      locationType: 'musgrave',
      sleeps: '2 Guests',
      bed: 'Queen Bed',
      size: '16 m²',
      price: '553',
      rating: null,
      reviews: 0,
      distance: '2.5 km from downtown',
      beachDistance: '4.6 km from beach',
      description: 'Comfortable Accommodations: La Tiah Three offers a guest house experience with free WiFi and free on-site private parking.',
      image: 'assets/images/La Tiah Three, Durban/1.jpg',
      amenities: ['Free parking', 'Free Wifi', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker', 'Refrigerator', 'Electric kettle'],
      type: 'double',
      popular: false,
      new: true,
      featured: false,
      alternativeDates: [
        { range: 'Sep 5 – Sep 6', nights: '1 night', price: '553.00' }
      ]
    },
    // ==================== ROOM 10: LA TIAH FOUR ====================
    {
      id: 15,
      name: 'La Tiah Four',
      location: 'La Tiah Musgrave',
      locationType: 'musgrave',
      sleeps: '2 Guests',
      bed: 'King Bed',
      size: '20 m²',
      price: '485',
      rating: 9.5,
      reviews: 2,
      distance: '2.5 km from downtown',
      beachDistance: '4.6 km from beach',
      description: 'Comfortable Accommodations: La Tiah Four offers a guest house experience with free WiFi and free on-site private parking.',
      image: 'assets/images/La Tiah Four, Durban/1.jpg',
      amenities: ['Free parking', 'Free Wifi', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker', 'Refrigerator', 'Electric kettle'],
      type: 'double',
      popular: true,
      new: true,
      featured: true,
      alternativeDates: [
        { range: 'Sep 3 – Sep 4', nights: '1 night', price: '485' }
      ]
    },
    // ==================== ROOM 11: HALFORD BACKPACKERS ====================
    {
      id: 2,
      name: 'Halford Backpackers',
      location: 'Halford Backpackers',
      locationType: 'halford',
      sleeps: '4 Guests',
      bed: 'Bunk Beds',
      size: '20 m²',
      price: '450',
      rating: null,
      reviews: 0,
      distance: '2.3 km from downtown',
      beachDistance: '800 m from beach',
      description: 'Comfortable Accommodations: Halford Backpackers offers a hostel experience with free WiFi and a shared kitchen.',
      image: 'assets/images/Halford Backpackers, Durban/6.jpg',
      amenities: ['Free Wifi', 'Pet Friendly', 'Shower', 'Shared Kitchen', 'Work Desk', 'Microwave', 'Electric Kettle'],
      type: 'single',
      popular: true,
      new: false,
      featured: false,
      alternativeDates: [
        { range: 'Aug 9 – Aug 19', nights: '10 nights', price: '3,850.00' }
      ]
    }
  ];

  get filteredRooms(): any[] {
    return this.allRooms;
  }

  constructor(private router: Router) {}

  // Add these methods for mobile navigation
  toggleMobileNav(): void {
    this.mobileNavOpen = !this.mobileNavOpen;
  }

  closeMobileNav(): void {
    this.mobileNavOpen = false;
  }

  // Add this method for booking navigation
  goToBooking(): void {
    this.router.navigate(['/booking']);
  }

  // Navigation methods
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

  viewRoomDetail(roomId: number) {
    this.router.navigate(['/room-detail'], { queryParams: { roomId: roomId } });
  }

  openWhatsApp() {
    const phone = '27791234567';
    const message = 'Hello STAY@TIAH, I would like to make a booking enquiry.';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  }
}