import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, ViewChild, OnInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonContent, Platform } from '@ionic/angular';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookingPage implements OnInit, OnDestroy {

  @ViewChild(IonContent, { static: false }) content!: IonContent;

  // ==========================================
  // NAVIGATION STATE
  // ==========================================
  mobileNavOpen: boolean = false;
  isScrolled: boolean = false;
  isMobile: boolean = false;
  private originalOverflow: string = '';
  private originalPosition: string = '';
  private originalWidth: string = '';
  private originalHeight: string = '';

  // ==========================================
  // BOOKING DATA
  // ==========================================
  bookingData = {
    location: '',
    room: '',
    checkIn: '',
    checkOut: '',
    guests: 2
  };

  // Step tracking
  showSummary: boolean = false;
  isSubmitting: boolean = false;

  // Locations
  locations: any[] = [
    { id: 'musgrave', name: 'Musgrave' },
    { id: 'north-beach', name: 'North Beach' }
  ];

  // Rooms by location
  roomsByLocation: { [key: string]: any[] } = {
    'musgrave': [
      { id: 'la-tiah-1', name: 'La Tiah Room 1', sleeps: 2 },
      { id: 'la-tiah-2', name: 'La Tiah Room 2', sleeps: 2 },
      { id: 'la-tiah-3', name: 'La Tiah Room 3', sleeps: 2 },
      { id: 'la-tiah-4', name: 'La Tiah Room 4', sleeps: 2 },
      { id: 'tiah-whyte', name: 'Tiah Whyte', sleeps: 2 },
      { id: 'tiah-grey', name: 'Tiah Grey', sleeps: 2 },
      { id: 'tiah-pastel', name: 'Tiah Pastel', sleeps: 2 }
    ],
    'north-beach': [
      { id: 'oceanic-82a', name: 'Durban Oceanic 82A', sleeps: 2 },
      { id: 'oceanic-82b', name: 'Durban Oceanic 82B', sleeps: 2 },
      { id: 'oceanic-117', name: 'Durban Oceanic 117', sleeps: 2 }
    ]
  };

  // Available rooms based on selected location
  availableRooms: any[] = [];

  // Min date for check-in (today)
  minDate: string = '';
  minCheckOutDate: string = '';

  // Form errors
  errors: { [key: string]: string } = {};

  // WhatsApp number
  private readonly whatsappNumber: string = '27849009821';

  constructor(
    private router: Router,
    private platform: Platform,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects || event.url;
    });
  }

  // ==========================================
  // LIFECYCLE HOOKS
  // ==========================================
  ngOnInit() {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.minCheckOutDate = this.minDate;
    
    this.isMobile = this.platform.is('mobile') || this.platform.is('mobileweb') || window.innerWidth < 992;
    this.preventSwipeToOpenNav();
  }

  ngOnDestroy(): void {
    this.restoreScroll();
    this.restoreBodyStyles();
  }

  // ==========================================
  // PREVENT SWIPE TO OPEN NAV
  // ==========================================
  private preventSwipeToOpenNav(): void {
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

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobile = window.innerWidth < 992;
  }

  // ==========================================
  // BACK BUTTON HANDLING
  // ==========================================
  @HostListener('window:popstate', ['$event'])
  onPopState(event: PopStateEvent) {
    const historyLength = window.history.length;
    if (historyLength > 1) {
      window.history.back();
    } else {
      this.router.navigate(['/home']);
    }
  }

  // ==========================================
  // GO BACK - Navigate to previous page
  // ==========================================
  goBack(): void {
    this.closeMobileNav();
    // Try to go back in history
    const historyLength = window.history.length;
    if (historyLength > 1) {
      window.history.back();
    } else {
      // If no history, go to home
      this.router.navigate(['/home']);
    }
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
  // MOBILE NAVIGATION
  // ==========================================
  toggleMobileNav() {
    this.mobileNavOpen = !this.mobileNavOpen;
    
    if (this.mobileNavOpen) {
      this.originalOverflow = document.body.style.overflow || '';
      this.originalPosition = document.body.style.position || '';
      this.originalWidth = document.body.style.width || '';
      this.originalHeight = document.body.style.height || '';
      
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.documentElement.style.overflow = 'hidden';
      
      if (this.platform.is('ios')) {
        document.body.style.touchAction = 'none';
      }
      
      document.body.classList.add('nav-open');
    } else {
      this.closeMobileNav();
    }
  }

  closeMobileNav() {
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
  // NAVIGATION METHODS
  // ==========================================
  goToHome() {
    this.closeMobileNav();
    this.router.navigate(['/home'], { replaceUrl: true });
  }

  // ==========================================
  // BOOKING FORM METHODS
  // ==========================================
  
  onLocationChange() {
    if (this.bookingData.location) {
      this.availableRooms = this.roomsByLocation[this.bookingData.location] || [];
      this.bookingData.room = '';
    }
  }

  onCheckInChange() {
    if (this.bookingData.checkIn) {
      const checkInDate = new Date(this.bookingData.checkIn);
      const nextDay = new Date(checkInDate);
      nextDay.setDate(checkInDate.getDate() + 1);
      this.minCheckOutDate = nextDay.toISOString().split('T')[0];
      
      if (this.bookingData.checkOut && this.bookingData.checkOut < this.minCheckOutDate) {
        this.bookingData.checkOut = '';
      }
    }
  }

  onCheckOutChange() {
    if (this.bookingData.checkIn && this.bookingData.checkOut) {
      const checkIn = new Date(this.bookingData.checkIn);
      const checkOut = new Date(this.bookingData.checkOut);
      if (checkOut <= checkIn) {
        this.errors['checkOut'] = 'Check-out must be after check-in';
      } else {
        this.errors['checkOut'] = '';
      }
    }
  }

  incrementGuests() {
    if (this.bookingData.guests < 10) {
      this.bookingData.guests++;
    }
  }

  decrementGuests() {
    if (this.bookingData.guests > 1) {
      this.bookingData.guests--;
    }
  }

  validateForm(): boolean {
    this.errors = {};
    let isValid = true;

    if (!this.bookingData.location) {
      this.errors['location'] = 'Please select a location';
      isValid = false;
    }

    if (!this.bookingData.room) {
      this.errors['room'] = 'Please select a room';
      isValid = false;
    }

    if (!this.bookingData.checkIn) {
      this.errors['checkIn'] = 'Please select check-in date';
      isValid = false;
    }

    if (!this.bookingData.checkOut) {
      this.errors['checkOut'] = 'Please select check-out date';
      isValid = false;
    }

    if (this.bookingData.checkIn && this.bookingData.checkOut) {
      const checkIn = new Date(this.bookingData.checkIn);
      const checkOut = new Date(this.bookingData.checkOut);
      if (checkOut <= checkIn) {
        this.errors['checkOut'] = 'Check-out must be after check-in';
        isValid = false;
      }
    }

    return isValid;
  }

  checkAvailability() {
    if (this.validateForm()) {
      this.showSummary = true;
    }
  }

  goBackToEdit() {
    this.showSummary = false;
  }

  // ==========================================
  // WHATSAPP ENQUIRY
  // ==========================================
  sendWhatsAppEnquiry() {
    this.isSubmitting = true;

    const locationName = this.locations.find(l => l.id === this.bookingData.location)?.name || '';
    const roomName = this.availableRooms.find(r => r.id === this.bookingData.room)?.name || '';

    const checkInDate = this.bookingData.checkIn ? 
      new Date(this.bookingData.checkIn).toLocaleDateString('en-ZA', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }) : '';
    
    const checkOutDate = this.bookingData.checkOut ? 
      new Date(this.bookingData.checkOut).toLocaleDateString('en-ZA', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }) : '';

    let nights = 0;
    if (this.bookingData.checkIn && this.bookingData.checkOut) {
      const diff = new Date(this.bookingData.checkOut).getTime() - new Date(this.bookingData.checkIn).getTime();
      nights = Math.ceil(diff / (1000 * 60 * 60 * 24));
    }

    const message = `Hello La Tiah 👋

I would like to enquire about availability:

🏠 Location: ${locationName}
🛏️ Room: ${roomName}
📅 Check-in: ${checkInDate}
📅 Check-out: ${checkOutDate}
👥 Guests: ${this.bookingData.guests}
${nights > 0 ? `📆 Nights: ${nights}` : ''}

Please confirm availability and the total price.

Thank you.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`, '_blank');

    this.isSubmitting = false;
    this.showSummary = false;
    this.resetForm();
  }

  resetForm() {
    this.bookingData = {
      location: '',
      room: '',
      checkIn: '',
      checkOut: '',
      guests: 2
    };
    this.availableRooms = [];
    this.errors = {};
  }

  // ==========================================
  // HELPER METHODS
  // ==========================================
  
  getLocationName(): string {
    const location = this.locations.find(l => l.id === this.bookingData.location);
    return location ? location.name : '';
  }

  getRoomName(): string {
    const room = this.availableRooms.find(r => r.id === this.bookingData.room);
    return room ? room.name : '';
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-ZA', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  }

  getNights(): number {
    if (this.bookingData.checkIn && this.bookingData.checkOut) {
      const diff = new Date(this.bookingData.checkOut).getTime() - new Date(this.bookingData.checkIn).getTime();
      return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }
    return 0;
  }

  // ==========================================
  // WHATSAPP METHODS
  // ==========================================
  openWhatsApp() {
    const message = 'Hello La Tiah, I would like to enquire about room availability and pricing.';
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`, '_blank');
  }
}