import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA, HostListener, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonContent, Platform } from '@ionic/angular';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface LocationImages {
  oceanic: string;
  laTiah: string;
  tiah: string;
  halford: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class AboutPage implements OnInit, OnDestroy {

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
  // WHATSAPP NUMBER
  // ==========================================
  private readonly whatsappNumber: string = '27849009821';

  // ==========================================
  // IMAGE PATHS
  // ==========================================
  aboutImage: string = 'assets/images/ChatGPT Image Jul 29, 2026, 08_23_26 AM.png';
  aboutImageFallback: string = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80';

  // Location images with proper typing
  locationImages: LocationImages = {
    oceanic: 'assets/images/Durban Oceanic Apartment 82B/4.jpg',
    laTiah: 'assets/images/La Tiah One, Durban/5.jpg',
    tiah: 'assets/images/Tiah Grey, Durban/6.jpg',
    halford: 'assets/images/Halford Backpackers, Durban/1.jpg'
  };

  // ==========================================
  // FALLBACK IMAGE FOR LOCATION IMAGES
  // ==========================================
  locationFallback: string = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';

  constructor(
    private router: Router,
    private platform: Platform,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    // Track navigation to know where the user came from
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Store the previous URL for back navigation
      const url = event.urlAfterRedirects || event.url;
      // You can use this to determine where the user came from
    });
  }

  // ==========================================
  // LIFECYCLE HOOKS
  // ==========================================
  ngOnInit() {
    // Check if mobile device
    this.isMobile = this.platform.is('mobile') || this.platform.is('mobileweb') || window.innerWidth < 992;
    
    // Prevent swipe to open nav on iOS
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
    // Disable iOS Safari swipe back gesture that can trigger nav
    if (this.platform.is('ios')) {
      // Add touch event listeners to prevent swipe gestures
      const ionContent = this.el.nativeElement.querySelector('ion-content');
      if (ionContent) {
        ionContent.addEventListener('touchstart', (e: TouchEvent) => {
          const touch = e.touches[0];
          // If touch starts near the left edge, prevent default to stop swipe
          if (touch.clientX < 30) {
            e.preventDefault();
          }
        }, { passive: false });
      }
    }

    // Prevent overscroll behavior that can trigger nav
    document.addEventListener('touchmove', (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      // Check if the touch is on the body or ion-content
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
  // BACK BUTTON HANDLING
  // ==========================================
  
  /**
   * Handle the back button - navigates to the previous page or home
   * This is called when the user presses the browser back button
   */
  @HostListener('window:popstate', ['$event'])
  onPopState(event: PopStateEvent) {
    // If we're on the about page and the user presses back,
    // we want to go to the previous page
    const currentUrl = this.router.url;
    
    // Check if there's a previous page in history
    const historyLength = window.history.length;
    if (historyLength > 1) {
      // Go back in history
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
  // SCROLL TO SECTION
  // ==========================================
  async scrollToSection(sectionId: string) {
    this.closeMobileNav();

    const targetElement = document.getElementById(sectionId);
    
    if (targetElement && this.content) {
      try {
        const scrollEl = await this.content.getScrollElement();
        const headerOffset = this.isMobile ? 56 : 72;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + scrollEl.scrollTop - headerOffset;
        this.content.scrollToPoint(0, offsetPosition, 800);
      } catch (error) {
        console.error('Scroll error:', error);
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  // ==========================================
  // IMAGE ERROR HANDLER
  // ==========================================
  onImageError(event: any): void {
    event.target.src = this.aboutImageFallback;
  }

  // ==========================================
  // LOCATION IMAGE ERROR HANDLER
  // ==========================================
  onLocationImageError(event: any): void {
    event.target.src = this.locationFallback;
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
  // NAVIGATION METHODS - WITH HISTORY MANAGEMENT
  // ==========================================
  goToHome(): void {
    this.closeMobileNav();
    // Use replaceUrl to manage history stack properly
    this.router.navigate(['/home'], { replaceUrl: true });
  }

  goToBooking(): void {
    this.closeMobileNav();
    this.router.navigate(['/booking']);
  }

  goToRooms(): void {
    this.closeMobileNav();
    this.router.navigate(['/rooms']);
  }

  goToAttractions(): void {
    this.closeMobileNav();
    this.router.navigate(['/attractions']);
  }

  goToContact(): void {
    this.closeMobileNav();
    this.router.navigate(['/contact']);
  }

  // ==========================================
  // WHATSAPP METHODS - Dynamic Messages Based on Context
  // ==========================================

  // Core WhatsApp sender
  private sendWhatsAppMessage(message: string): void {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`, '_blank');
  }

  // General WhatsApp - for header, footer, floating button
  openWhatsApp(): void {
    const message = 'Hello la tiah, I would like to enquire about your accommodation and availability.';
    this.sendWhatsAppMessage(message);
  }

  // WhatsApp for about page specific
  openWhatsAppForAbout(): void {
    const message = 'Hello la tiah, I would like to learn more about your accommodation options and locations.';
    this.sendWhatsAppMessage(message);
  }

  // WhatsApp for rooms enquiry
  openWhatsAppForRooms(): void {
    const message = 'Hello la tiah, I would like to enquire about your rooms and availability.';
    this.sendWhatsAppMessage(message);
  }

  // WhatsApp for attractions enquiry
  openWhatsAppForAttractions(): void {
    const message = 'Hello la tiah, I would like to enquire about attractions near your accommodation.';
    this.sendWhatsAppMessage(message);
  }

  // WhatsApp for contact
  openWhatsAppForContact(): void {
    const message = 'Hello la tiah, I would like to get in touch regarding your accommodation.';
    this.sendWhatsAppMessage(message);
  }

  // WhatsApp for booking enquiry
  openWhatsAppForBooking(): void {
    const message = 'Hello la tiah, I would like to make a booking enquiry.';
    this.sendWhatsAppMessage(message);
  }

  // WhatsApp with custom message for specific location
  openWhatsAppForLocation(locationName: string): void {
    const message = `Hello la tiah, I'm interested in staying at ${locationName}. Can you please provide more information about availability and rates?`;
    this.sendWhatsAppMessage(message);
  }
}