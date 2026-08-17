import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, OnInit, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonContent, Platform } from '@ionic/angular';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit, OnDestroy {

  // ==========================================
  // VIEW CHILD REFERENCE
  // ==========================================
  @ViewChild(IonContent, { static: false }) content!: IonContent;

  // ==========================================
  // SPLASH SCREEN STATE
  // ==========================================
  splashHidden: boolean = false;

  // ==========================================
  // NAVIGATION STATE
  // ==========================================
  activeTab: string = 'musgrave';
  currentSection: string = 'home';
  showHero: boolean = true;
  mobileNavOpen: boolean = false;
  isScrolled: boolean = false;
  
  // ==========================================
  // PAGE TRANSITION STATE
  // ==========================================
  isTransitioning: boolean = false;
  private transitionTimeout: any;
  private routerSubscription: Subscription | null = null;

  // ==========================================
  // ROUTE HISTORY FOR BACK NAVIGATION
  // ==========================================
  currentRoute: string = '/home';
  private routeHistory: string[] = ['/home'];
  private isNavigatingBack: boolean = false;

  // ==========================================
  // BACK BUTTON SUBSCRIPTION
  // ==========================================
  private backButtonSubscription: any;

  // ==========================================
  // WHATSAPP NUMBER - Now used for booking link
  // ==========================================
  whatsappNumber: string = '27849009821';

  // ==========================================
  // IMAGE PATHS
  // ==========================================
  aboutImage: string = 'assets/images/ChatGPT Image Jul 29, 2026, 08_23_26 AM.png';
  aboutImageFallback: string = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80';

  // ==========================================
  // FAQ DATA
  // ==========================================
  faqs: any[] = [
    {
      question: 'What are the check-in and check-out times?',
      answer: 'Check-in is from 2:00 PM and check-out is by 10:00 AM. Early check-in and late check-out may be available upon request.',
      active: false
    },
    {
      question: 'Is parking available?',
      answer: 'Yes, secure parking is available at both our Musgrave and North Beach locations. Please inform us in advance if you require parking.',
      active: false
    },
    {
      question: 'Do you offer airport transfers?',
      answer: 'Guests can travel from the airport using an e-hailing system.',
      active: false
    },
    {
      question: 'Are pets allowed?',
      answer: 'We admire pets however kindly make an alternative arrangement stay for them.',
      active: false
    },
    {
      question: 'Is there Wi-Fi available?',
      answer: 'Yes, complimentary high-speed Wi-Fi is available throughout all our properties.',
      active: false
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept EFT Payments.',
      active: false
    },
    {
      question: 'Do you have a cancellation policy?',
      answer: 'Yes, we have a flexible cancellation policy. Free cancellation is available up to 24 hours before check-in. Please refer to our terms and conditions for more details.',
      active: false
    }
  ];

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
        // Avoid duplicates
        if (this.routeHistory.length === 0 || this.routeHistory[this.routeHistory.length - 1] !== url) {
          this.routeHistory.push(url);
        }
      }
      
      // Reset back navigation flag after navigation completes
      this.isNavigatingBack = false;
    });

    // Handle hardware back button on mobile devices
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(10, () => {
      this.goBack();
    });
  }

  ngOnDestroy() {
    // Clean up subscriptions and timeouts
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
  // WINDOW SCROLL LISTENER (for header)
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
   * Sets the current route and triggers smooth transitions
   */
  onNavClick(route: string) {
    // Prevent duplicate navigation
    if (this.currentRoute === route || this.isTransitioning) return;
    
    // Close mobile nav if open
    this.closeMobileNav();
    
    // Start transition animation
    this.startTransition();
    
    // Navigate after animation starts
    setTimeout(() => {
      this.router.navigate([route]);
      // End transition after navigation completes
      setTimeout(() => {
        this.endTransition();
      }, 300);
    }, 400);
  }

  /**
   * Navigate to booking page (replaces WhatsApp functionality)
   */
  navigateToBooking() {
    this.onNavClick('/booking');
  }

  /**
   * Smart back navigation - goes back to previous page
   * Uses route history stack for proper back behavior
   */
  goBack() {
    // Prevent multiple back actions
    if (this.isNavigatingBack || this.isTransitioning) return;
    
    // Get current URL without query params
    const currentPath = this.router.url.split('?')[0];
    
    // Don't go back if we're on home page
    if (currentPath === '/home') {
      return;
    }
    
    // Check if we have a history to go back to
    if (this.routeHistory.length > 1) {
      this.isNavigatingBack = true;
      
      // Remove current page from history (pop)
      this.routeHistory.pop();
      
      // Get the previous page
      const previousPage = this.routeHistory[this.routeHistory.length - 1];
      
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
        // Fallback to location back if history is empty
        this.location.back();
        this.isNavigatingBack = false;
      }
    } else {
      // Fallback to location back
      this.location.back();
    }
  }

  /**
   * Start page transition animation
   */
  private startTransition() {
    this.isTransitioning = true;
    // Add transition class to body for global styling
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
  // ORIGINAL NAVIGATION METHODS
  // ==========================================

  // Navigate to home
  goToHome() {
    if (this.currentRoute === '/home') return;
    this.currentSection = 'home';
    this.closeMobileNav();
    this.onNavClick('/home');
  }

  // Navigate to rooms page
  goToRooms() {
    this.onNavClick('/rooms');
  }

  // Navigate to about page
  goToAbout() {
    this.onNavClick('/about');
  }

  // Navigate to attractions page
  goToAttractions() {
    this.onNavClick('/attractions');
  }

  // Navigate to contact page
  goToContact() {
    this.onNavClick('/contact');
  }

  // ==========================================
  // SCROLL METHODS
  // ==========================================

  /**
   * Scroll to specific section using Ionic's internal engine
   */
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
  // MOBILE NAVIGATION
  // ==========================================

  toggleMobileNav() {
    this.mobileNavOpen = !this.mobileNavOpen;
    document.body.style.overflow = this.mobileNavOpen ? 'hidden' : '';
  }

  closeMobileNav() {
    this.mobileNavOpen = false;
    document.body.style.overflow = '';
  }

  // ==========================================
  // EVENT HANDLERS
  // ==========================================

  onScroll(event: any) {
    const scrollTop = event.detail.scrollTop;
    const heroHeight = window.innerHeight;
    
    this.showHero = scrollTop < heroHeight - 100;
    
    const header = document.querySelector('.site-header');
    if (scrollTop > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }

  onImageError(event: any) {
    event.target.src = this.aboutImageFallback;
  }

  // ==========================================
  // FAQ METHODS
  // ==========================================

  toggleFaq(index: number) {
    this.faqs[index].active = !this.faqs[index].active;
  }

  // ==========================================
  // LEGACY WHATSAPP METHOD (kept for compatibility)
  // ==========================================
  openWhatsApp() {
    // Redirect to booking page instead of WhatsApp
    this.navigateToBooking();
  }
}