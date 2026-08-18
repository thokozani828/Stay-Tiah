import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, ViewChild, OnInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonContent, Platform } from '@ionic/angular';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

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
export class RoomsPage implements OnInit, OnDestroy {

  @ViewChild(IonContent, { static: false }) content!: IonContent;

  // ==========================================
  // NAVIGATION STATE
  // ==========================================
  mobileNavOpen: boolean = false;
  isScrolled: boolean = false;
  isMobile: boolean = false;
  activeLocation: string = 'all';
  private originalOverflow: string = '';
  private originalPosition: string = '';
  private originalWidth: string = '';
  private originalHeight: string = '';

  // ==========================================
  // ROUTE HISTORY FOR BACK NAVIGATION
  // ==========================================
  currentRoute: string = '/rooms';
  private routeHistory: string[] = ['/home', '/rooms'];
  private isNavigatingBack: boolean = false;
  private routerSubscription: Subscription | null = null;
  private backButtonSubscription: any;

  // ==========================================
  // PAGE TRANSITION STATE
  // ==========================================
  isTransitioning: boolean = false;
  private transitionTimeout: any;

  // ==========================================
  // FALLBACK IMAGE
  // ==========================================
  fallbackImage: string = 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80';

  // ==========================================
  // WHATSAPP NUMBER
  // ==========================================
  whatsappNumber: string = '27849009821';

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
      description: 'Comfortable compact copy room for overnight transit.',
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
      description: 'Comfortable apartment with a kitchenette and a partial view to the Moses Mabhida Stadium.',
      image: 'assets/images/Durban Oceanic Apartment 82B/2.png',
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
      description: 'Comfortable stay with city views.',
      image: 'assets/images/Durban Oceanic Apartment 117/12.png',
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
      description: 'Comfortable stay in a convenient location.',
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
      description: 'Comfortable room.',
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
      image: 'assets/images/Halford Backpackers, Durban/2.3.jpeg',
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

  constructor(
    private router: Router,
    private platform: Platform,
    private renderer: Renderer2,
    private el: ElementRef,
    private location: Location
  ) {}

  // ==========================================
  // LIFECYCLE HOOKS
  // ==========================================
  ngOnInit() {
    // Check if mobile device
    this.isMobile = this.platform.is('mobile') || this.platform.is('mobileweb') || window.innerWidth < 992;
    
    // Prevent swipe to open nav on iOS
    this.preventSwipeToOpenNav();

    // Track route changes for back navigation
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
      this.currentRoute = url;
      
      if (!this.isNavigatingBack) {
        if (this.routeHistory.length === 0 || this.routeHistory[this.routeHistory.length - 1] !== url) {
          this.routeHistory.push(url);
        }
      }
      
      this.isNavigatingBack = false;
    });

    // Handle hardware back button on mobile devices
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(10, () => {
      this.goBack();
    });
  }

  ngOnDestroy(): void {
    this.restoreScroll();
    this.restoreBodyStyles();
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }
    if (this.transitionTimeout) {
      clearTimeout(this.transitionTimeout);
    }
  }

  // ==========================================
  // PREVENT SWIPE TO OPEN NAV
  // ==========================================
  private preventSwipeToOpenNav(): void {
    // Disable iOS Safari swipe back gesture that can trigger nav
    if (this.platform.is('ios')) {
      const ionContent = this.el.nativeElement.querySelector('ion-content');
      if (ionContent) {
        ionContent.addEventListener('touchstart', (e: TouchEvent) => {
          const touch = e.touches[0];
          if (touch.clientX < 30) {
            e.preventDefault();
          }
        }, { passive: false });
      }
    }

    // Prevent overscroll behavior that can trigger nav
    document.addEventListener('touchmove', (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('ion-content') || target.closest('ion-app')) {
        const touch = e.touches[0];
        if (touch.clientX < 20) {
          e.preventDefault();
        }
      }
    }, { passive: false });
  }

  // ==========================================
  // WINDOW SCROLL LISTENER
  // ==========================================
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  // ==========================================
  // WINDOW RESIZE LISTENER
  // ==========================================
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobile = window.innerWidth < 992;
  }

  // ==========================================
  // GO BACK - Proper navigation with history
  // ==========================================
  goBack(): void {
    // Prevent multiple back navigations
    if (this.isNavigatingBack || this.isTransitioning) {
      return;
    }

    this.closeMobileNav();

    // Get current URL without query params
    const currentPath = this.router.url.split('?')[0];

    // If we're on home page, do nothing
    if (currentPath === '/home') {
      return;
    }

    // Check if we have previous page in our history
    if (this.routeHistory.length > 1) {
      this.isNavigatingBack = true;
      
      // Remove current page from history
      this.routeHistory.pop();
      
      // Get the previous page
      const previousPage = this.routeHistory[this.routeHistory.length - 1];
      
      // If previous page exists and is different from current
      if (previousPage && previousPage !== currentPath) {
        this.startTransition();
        setTimeout(() => {
          this.router.navigate([previousPage]);
          setTimeout(() => {
            this.endTransition();
            this.isNavigatingBack = false;
          }, 300);
        }, 400);
      } else {
        // Fallback to browser's back
        this.location.back();
        this.isNavigatingBack = false;
      }
    } else {
      // If no history, use browser's back
      this.location.back();
    }
  }

  /**
   * Start page transition animation
   */
  private startTransition() {
    this.isTransitioning = true;
    document.body.classList.add('page-transitioning');
  }

  /**
   * End page transition animation
   */
  private endTransition() {
    this.isTransitioning = false;
    document.body.classList.remove('page-transitioning');
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
    this.closeMobileNav();
    this.router.navigate(['/home'], { replaceUrl: true });
  }

  goToBooking() {
    this.closeMobileNav();
    this.router.navigate(['/booking']);
  }

  goToAbout() {
    this.closeMobileNav();
    this.router.navigate(['/about']);
  }

  goToAttractions() {
    this.closeMobileNav();
    this.router.navigate(['/attractions']);
  }

  goToContact() {
    this.closeMobileNav();
    this.router.navigate(['/contact']);
  }

  // ==========================================
  // VIEW ROOM DETAIL
  // ==========================================
  viewRoomDetail(roomId: number) {
    this.closeMobileNav();
    this.router.navigate(['/room-detail'], { queryParams: { roomId: roomId } });
  }

  // ==========================================
  // MOBILE NAVIGATION - IMPROVED
  // ==========================================
  toggleMobileNav(): void {
    this.mobileNavOpen = !this.mobileNavOpen;
    
    if (this.mobileNavOpen) {
      // Store original styles
      this.originalOverflow = document.body.style.overflow || '';
      this.originalPosition = document.body.style.position || '';
      this.originalWidth = document.body.style.width || '';
      this.originalHeight = document.body.style.height || '';
      
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.documentElement.style.overflow = 'hidden';
      
      // Prevent iOS swipe
      if (this.platform.is('ios')) {
        document.body.style.touchAction = 'none';
      }
      
      document.body.classList.add('nav-open');
    } else {
      this.closeMobileNav();
    }
  }

  closeMobileNav(): void {
    this.mobileNavOpen = false;
    this.restoreBodyStyles();
    this.restoreScroll();
    document.body.classList.remove('nav-open');
    
    if (this.platform.is('ios')) {
      document.body.style.touchAction = '';
    }
  }

  private restoreScroll(): void {
    document.body.style.overflow = this.originalOverflow || '';
    document.documentElement.style.overflow = this.originalOverflow || '';
  }

  private restoreBodyStyles(): void {
    document.body.style.position = this.originalPosition || '';
    document.body.style.width = this.originalWidth || '';
    document.body.style.height = this.originalHeight || '';
  }

  // ==========================================
  // IMAGE ERROR HANDLER
  // ==========================================
  onImageError(event: any) {
    event.target.src = this.fallbackImage;
  }

  // ==========================================
  // WHATSAPP METHODS - Dynamic Messages Based on Context
  // ==========================================

  // Core WhatsApp sender
  private sendWhatsAppMessage(message: string) {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`, '_blank');
  }

  // General WhatsApp - for header, footer, floating button
  openWhatsApp() {
    const message = 'Hello La Tiah, I would like to enquire about room availability and pricing.';
    this.sendWhatsAppMessage(message);
  }

  // WhatsApp for a specific room enquiry
  openWhatsAppForRoom(room: any) {
    const message = `Hello La Tiah, I'm interested in the "${room.name}" located at ${room.location}. Can you please provide more information about availability, pricing, and booking options?`;
    this.sendWhatsAppMessage(message);
  }

  // WhatsApp for room detail page
  openWhatsAppForRoomDetail(roomId: number) {
    const room = this.allRooms.find(r => r.id === roomId);
    if (room) {
      const message = `Hello La Tiah, I'm interested in the "${room.name}" located at ${room.location}. I would like to enquire about availability and rates.`;
      this.sendWhatsAppMessage(message);
    } else {
      this.openWhatsApp();
    }
  }

  // WhatsApp for location enquiry
  openWhatsAppForLocation(location: string) {
    const message = `Hello La Tiah, I'm interested in staying at your ${location} location. Can you please provide more information about availability and rates?`;
    this.sendWhatsAppMessage(message);
  }

  // WhatsApp for CTA section
  openWhatsAppForCTA() {
    const message = 'Hello La Tiah, I would like to book my stay. Can you please check availability and provide pricing?';
    this.sendWhatsAppMessage(message);
  }

  // WhatsApp for contact page
  openWhatsAppForContact() {
    const message = 'Hello La Tiah, I would like to get in touch regarding your accommodation.';
    this.sendWhatsAppMessage(message);
  }

  // WhatsApp for attractions
  openWhatsAppForAttractions() {
    const message = 'Hello La Tiah, I would like to enquire about attractions near your accommodation.';
    this.sendWhatsAppMessage(message);
  }

  // WhatsApp for about page
  openWhatsAppForAbout() {
    const message = 'Hello La Tiah, I would like to learn more about your accommodation options.';
    this.sendWhatsAppMessage(message);
  }
}