import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonContent } from '@ionic/angular';
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
export class RoomsPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content!: IonContent;

  // ==========================================
  // NAVIGATION STATE
  // ==========================================
  mobileNavOpen: boolean = false;
  isScrolled: boolean = false;
  activeLocation: string = 'all';

  // ==========================================
  // FALLBACK IMAGE
  // ==========================================
  fallbackImage: string = 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80';

  // ==========================================
  // ROOMS DATA - Updated with better bedroom images
  // Removed: rating, reviews, price
  // ==========================================
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
      distance: '250 m from beach',
      description: 'Spacious room with stunning ocean views, perfect for a romantic getaway.',
      image: 'assets/images/Durban Oceanic Room 82A/1.jpg',
      amenities: ['Swimming pool', 'Free parking', 'Free Wifi', 'Terrace', 'Hot tub', 'Flat-screen TV', 'Shower', 'View'],
      popular: true,
      new: false,
      featured: true
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
      distance: '250 m from beach',
      description: 'Modern apartment with a fully equipped kitchen and balcony.',
      image: 'assets/images/Durban Oceanic Apartment 82B/8.jpg',
      amenities: ['Outdoor swimming pool', 'Private Parking', 'Free Wifi', 'Terrace', 'Kitchen', 'Bath', 'Washing machine', 'Flat-screen TV'],
      popular: true,
      new: true,
      featured: true
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
      distance: '250 m from beach',
      description: 'Elegant apartment with modern finishes and city views.',
      image: 'assets/images/Durban Oceanic Apartment 117/3.jpg',
      amenities: ['Swimming pool', 'Free parking', 'Free Wifi', 'Air conditioning', 'Private pool', 'Kitchenette', 'Washing machine', 'Flat-screen TV'],
      popular: true,
      new: true,
      featured: true
    },
    // ==================== ROOM 4: TIAH WHYTE ====================
    {
      id: 19,
      name: 'Tiah Whyte',
      location: 'Tiah Musgrave',
      locationType: 'musgrave',
      sleeps: '2 Guests',
      bed: 'Queen Bed',
      size: '24 m²',
      distance: '2.3 km from downtown',
      description: 'Stylish room in a quiet guesthouse close to all amenities.',
      image: 'assets/images/Tiah Whyte, Durban/1.jpg',
      amenities: ['Free parking', 'Non-smoking rooms', 'Free Wifi', 'Air conditioning', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker'],
      popular: true,
      new: true,
      featured: true
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
      distance: '2.3 km from downtown',
      description: 'Comfortable room with a neutral palette for a relaxing stay.',
      image: 'assets/images/Tiah Grey, Durban/1.jpg',
      amenities: ['Free parking', 'Non-smoking rooms', 'Air conditioning', 'Kitchenette', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker'],
      popular: true,
      new: true,
      featured: true
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
      distance: '2.3 km from downtown',
      description: 'Bright and airy room with a cozy atmosphere.',
      image: 'assets/images/Tiah Pastel, Durban/1.jpg',
      amenities: ['Free parking', 'Air conditioning', 'Kitchenette', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker'],
      popular: true,
      new: true,
      featured: true
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
      distance: '2.2 km from downtown',
      description: 'Luxurious room with premium finishes and comfort.',
      image: 'assets/images/La Tiah One, Durban/1.jpg',
      amenities: ['Free parking', 'Free Wifi', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker', 'Refrigerator', 'Electric kettle'],
      popular: false,
      new: true,
      featured: false
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
      distance: '2.2 km from downtown',
      description: 'Spacious room with a separate seating area.',
      image: 'assets/images/La Tiah Two, Durban/1.jpg',
      amenities: ['Free parking', 'Free Wifi', 'Shared kitchen', 'Daily housekeeping', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker'],
      popular: false,
      new: true,
      featured: false
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
      distance: '2.5 km from downtown',
      description: 'Comfortable room with all essential amenities.',
      image: 'assets/images/La Tiah Three, Durban/1.jpg',
      amenities: ['Free parking', 'Free Wifi', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker', 'Refrigerator', 'Electric kettle'],
      popular: false,
      new: true,
      featured: false
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
      distance: '2.5 km from downtown',
      description: 'Cozy room perfect for a short stay.',
      image: 'assets/images/La Tiah Four, Durban/1.jpg',
      amenities: ['Free parking', 'Free Wifi', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker', 'Refrigerator', 'Electric kettle'],
      popular: true,
      new: true,
      featured: true
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
      distance: '800 m from beach',
      description: 'Affordable shared accommodation perfect for backpackers and groups.',
      image: 'assets/images/Halford Backpackers, Durban/6.jpg',
      amenities: ['Free Wifi', 'Pet Friendly', 'Shower', 'Shared Kitchen', 'Work Desk', 'Microwave', 'Electric Kettle'],
      popular: true,
      new: false,
      featured: false
    }
  ];

  // ==========================================
  // FILTERED ROOMS
  // ==========================================
  get filteredRooms(): any[] {
    if (this.activeLocation === 'all') {
      return this.allRooms;
    }
    return this.allRooms.filter(room => room.locationType === this.activeLocation);
  }

  constructor(private router: Router) {}

  // ==========================================
  // LIFECYCLE HOOKS
  // ==========================================
  ngOnInit() {}

  // ==========================================
  // WINDOW SCROLL LISTENER
  // ==========================================
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  // ==========================================
  // SCROLL EVENT FOR ION-CONTENT
  // ==========================================
  onScroll(event: any) {
    const scrollTop = event.detail.scrollTop;
    const header = document.querySelector('.site-header');
    if (scrollTop > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }

  // ==========================================
  // FILTER ROOMS BY LOCATION
  // ==========================================
  filterRooms(location: string) {
    this.activeLocation = location;
  }

  // ==========================================
  // NAVIGATION METHODS
  // ==========================================
  goToHome() {
    this.router.navigate(['/home']);
  }

  goToBooking() {
    this.router.navigate(['/booking']);
  }

  // ==========================================
  // VIEW ROOM DETAIL
  // ==========================================
  viewRoomDetail(roomId: number) {
    this.router.navigate(['/room-detail'], { queryParams: { roomId: roomId } });
  }

  // ==========================================
  // MOBILE NAVIGATION
  // ==========================================
  toggleMobileNav(): void {
    this.mobileNavOpen = !this.mobileNavOpen;
    document.body.style.overflow = this.mobileNavOpen ? 'hidden' : '';
  }

  closeMobileNav(): void {
    this.mobileNavOpen = false;
    document.body.style.overflow = '';
  }

  // ==========================================
  // IMAGE ERROR HANDLER
  // ==========================================
  onImageError(event: any) {
    event.target.src = this.fallbackImage;
  }

  // ==========================================
  // WHATSAPP METHOD
  // ==========================================
  openWhatsApp() {
    const phone = '27791234567';
    const message = 'Hello STAY@TIAH, I would like to enquire about room availability and pricing.';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  }
}