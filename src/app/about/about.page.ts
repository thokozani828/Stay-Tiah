import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonContent, Platform } from '@ionic/angular';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

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
  // SPLASH SCREEN STATE
  // ==========================================
  splashHidden: boolean = false;

  // ==========================================
  // NAVIGATION STATE
  // ==========================================
  mobileNavOpen: boolean = false;
  isScrolled: boolean = false;
  private originalOverflow: string = '';

  // ==========================================
  // PAGE TRANSITION STATE
  // ==========================================
  isTransitioning: boolean = false;
  private transitionTimeout: any;
  private routerSubscription: Subscription | null = null;

  // ==========================================
  // ROUTE HISTORY FOR BACK NAVIGATION
  // ==========================================
  currentRoute: string = '/about';
  private routeHistory: string[] = ['/home', '/about'];
  private isNavigatingBack: boolean = false;

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

  // ==========================================
  // BACK BUTTON SUBSCRIPTION
  // ==========================================
  private backButtonSubscription: any;

  constructor(
    private router: Router,
    private location: Location,
    private platform: Platform
  ) {}

  // ==========================================
  // LIFECYCLE HOOKS
  // ==========================================
  
  ngOnInit() {
    // Hide splash screen after 2.5 seconds
    setTimeout(() => {
      this.splashHidden = true;
    }, 2500);

    // Track route changes for back navigation
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
      this.currentRoute = url;
      
      // Only push to history if not navigating back
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

  ngOnDestroy() {
    this.restoreScroll();
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.transitionTimeout) {
      clearTimeout(this.transitionTimeout);
    }
    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }
  }

  // ==========================================
  // WINDOW SCROLL LISTENER
  // ==========================================
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  // ==========================================
  // NAVIGATION METHODS WITH TRANSITIONS
  // ==========================================

  /**
   * Handle navigation with page transition animation
   */
  onNavClick(route: string) {
    if (this.currentRoute === route || this.isTransitioning) return;
    
    this.closeMobileNav();
    this.startTransition();
    
    setTimeout(() => {
      this.router.navigate([route]);
      setTimeout(() => {
        this.endTransition();
      }, 300);
    }, 400);
  }

  /**
   * Navigate to booking page
   */
  navigateToBooking() {
    this.onNavClick('/booking');
  }

  /**
   * Smart back navigation using Location service for proper browser history
   */
  goBack() {
    // Prevent multiple back navigations
    if (this.isNavigatingBack || this.isTransitioning) {
      return;
    }

    // Get current URL without query params
    const currentPath = this.router.url.split('?')[0];

    // If we're on home page, do nothing (or exit app)
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
  // SCROLL TO SECTION
  // ==========================================
  async scrollToSection(sectionId: string) {
    this.closeMobileNav();

    const targetElement = document.getElementById(sectionId);
    
    if (targetElement && this.content) {
      try {
        const scrollEl = await this.content.getScrollElement();
        const headerOffset = 72;
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
  // MOBILE NAVIGATION
  // ==========================================
  toggleMobileNav(): void {
    this.mobileNavOpen = !this.mobileNavOpen;
    
    if (this.mobileNavOpen) {
      this.originalOverflow = document.body.style.overflow || '';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      this.restoreScroll();
    }
  }

  closeMobileNav(): void {
    this.mobileNavOpen = false;
    this.restoreScroll();
  }

  private restoreScroll(): void {
    document.body.style.overflow = this.originalOverflow || '';
    document.documentElement.style.overflow = this.originalOverflow || '';
  }

  // ==========================================
  // NAVIGATION METHODS (Legacy - kept for compatibility)
  // ==========================================
  goToHome(): void {
    if (this.currentRoute === '/home') return;
    this.closeMobileNav();
    this.onNavClick('/home');
  }

  goToBooking(): void {
    this.onNavClick('/booking');
  }

  goToRooms(): void {
    this.onNavClick('/rooms');
  }

  goToAttractions(): void {
    this.onNavClick('/attractions');
  }

  goToContact(): void {
    this.onNavClick('/contact');
  }

  // ==========================================
  // WHATSAPP METHODS - Now redirects to booking
  // ==========================================

  /**
   * Core WhatsApp sender - Now navigates to booking
   */
  private sendWhatsAppMessage(message: string): void {
    // Redirect to booking page instead of WhatsApp
    this.navigateToBooking();
  }

  /**
   * General WhatsApp - redirects to booking
   */
  openWhatsApp(): void {
    this.navigateToBooking();
  }

  /**
   * WhatsApp for about page specific
   */
  openWhatsAppForAbout(): void {
    this.navigateToBooking();
  }

  /**
   * WhatsApp for rooms enquiry
   */
  openWhatsAppForRooms(): void {
    this.navigateToBooking();
  }

  /**
   * WhatsApp for attractions enquiry
   */
  openWhatsAppForAttractions(): void {
    this.navigateToBooking();
  }

  /**
   * WhatsApp for contact
   */
  openWhatsAppForContact(): void {
    this.navigateToBooking();
  }

  /**
   * WhatsApp for booking enquiry
   */
  openWhatsAppForBooking(): void {
    this.navigateToBooking();
  }

  /**
   * WhatsApp with custom message for specific location
   */
  openWhatsAppForLocation(locationName: string): void {
    this.navigateToBooking();
  }
}