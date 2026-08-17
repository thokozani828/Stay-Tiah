import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, OnInit, HostListener, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonContent, Platform } from '@ionic/angular';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

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
export class HomePage implements OnInit {

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
  isMobile: boolean = false;
  private lastPage: string = '';

  // ==========================================
  // WHATSAPP NUMBER
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
    private platform: Platform,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    // Track navigation to know where the user came from
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.lastPage = event.urlAfterRedirects || event.url;
    });
  }

  // ==========================================
  // LIFECYCLE HOOKS
  // ==========================================

  ngOnInit() {
    // Check if mobile device
    this.isMobile = this.platform.is('mobile') || this.platform.is('mobileweb') || window.innerWidth < 992;
    
    // Hide splash screen after 2.5 seconds
    setTimeout(() => {
      this.splashHidden = true;
    }, 2500);

    // Prevent swipe to open nav on iOS
    this.preventSwipeToOpenNav();
  }

  // ==========================================
  // PREVENT SWIPE TO OPEN NAV
  // ==========================================
  private preventSwipeToOpenNav() {
    // Disable iOS Safari swipe back gesture that can trigger nav
    if (this.platform.is('ios')) {
      // Add touch event listeners to prevent swipe gestures
      const ionContent = this.el.nativeElement.querySelector('ion-content');
      if (ionContent) {
        ionContent.addEventListener('touchstart', (e: TouchEvent) => {
          const touch = e.touches[0];
          // If touch starts near the left edge, prevent default to stop swipe
          if (touch.clientX < 30) {
            // Only prevent if not in a scrollable area
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
        // Allow scroll but prevent swipe to open nav
        const touch = e.touches[0];
        if (touch.clientX < 20) {
          e.preventDefault();
        }
      }
    }, { passive: false });
  }

  // ==========================================
  // WINDOW SCROLL LISTENER (for header)
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
  // NAVIGATION METHODS - WITH BACK BUTTON HANDLING
  // ==========================================

  // Navigate to home - clear history and go to home
  goToHome() {
    this.currentSection = 'home';
    this.closeMobileNav();
    // Navigate to home and replace the current history entry
    this.router.navigate(['/home'], { replaceUrl: true });
    setTimeout(() => {
      this.scrollToSection('home');
    }, 100);
  }

  // Navigate to rooms page
  goToRooms() {
    this.closeMobileNav();
    this.router.navigate(['/rooms']);
  }

  // Navigate to about page
  goToAbout() {
    this.closeMobileNav();
    this.router.navigate(['/about']);
  }

  // Navigate to attractions page
  goToAttractions() {
    this.closeMobileNav();
    this.router.navigate(['/attractions']);
  }

  // Navigate to contact page
  goToContact() {
    this.closeMobileNav();
    this.router.navigate(['/contact']);
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
    // If we're on the home page and the user presses back, 
    // we want to stay on home or go to the previous page
    const currentUrl = this.router.url;
    
    // If the user is on the home page and presses back,
    // we want to either stay or navigate to the previous page
    if (currentUrl === '/home') {
      // Check if there's a previous page in history
      const historyLength = window.history.length;
      if (historyLength > 1) {
        // Go back in history
        window.history.back();
      }
      // Otherwise, stay on home
    }
  }

  // ==========================================
  // SCROLL METHODS
  // ==========================================

  // Scroll to specific section using Ionic's internal engine
  async scrollToSection(sectionId: string) {
    // Close mobile nav if it's open
    this.closeMobileNav();

    const targetElement = document.getElementById(sectionId);
    
    if (targetElement && this.content) {
      try {
        // Get Ionic's internal scroll element (Shadow DOM)
        const scrollEl = await this.content.getScrollElement();

        // Calculate the top position of the target element
        const headerOffset = this.isMobile ? 56 : 72; // Account for fixed header
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + scrollEl.scrollTop - headerOffset;

        // Use Ionic's native scrollToPoint method
        this.content.scrollToPoint(0, offsetPosition, 800);
      } catch (error) {
        console.error('Scroll error:', error);
        // Fallback: use native scrollIntoView
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  // ==========================================
  // MOBILE NAVIGATION - FIXED
  // ==========================================

  // Toggle mobile navigation
  toggleMobileNav() {
    this.mobileNavOpen = !this.mobileNavOpen;
    if (this.mobileNavOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.body.classList.add('nav-open');
      
      // Prevent swipe to close on iOS
      if (this.platform.is('ios')) {
        document.body.style.touchAction = 'none';
      }
    } else {
      this.closeMobileNav();
    }
  }

  // Close mobile navigation
  closeMobileNav() {
    this.mobileNavOpen = false;
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.height = '';
    document.body.classList.remove('nav-open');
    
    if (this.platform.is('ios')) {
      document.body.style.touchAction = '';
    }
  }

  // ==========================================
  // EVENT HANDLERS
  // ==========================================

  // Scroll event for ion-content
  onScroll(event: any) {
    const scrollTop = event.detail.scrollTop;
    const heroHeight = window.innerHeight;
    
    this.showHero = scrollTop < heroHeight - 100;
    
    // Also update scrolled state from ion-scroll
    const header = document.querySelector('.site-header');
    if (scrollTop > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }

  // Handle image error
  onImageError(event: any) {
    event.target.src = this.aboutImageFallback;
  }

  // ==========================================
  // FAQ METHODS
  // ==========================================

  // Toggle FAQ item
  toggleFaq(index: number) {
    this.faqs[index].active = !this.faqs[index].active;
  }

  // ==========================================
  // WHATSAPP METHOD - Direct WhatsApp only
  // ==========================================
  openWhatsApp() {
    const phone = this.whatsappNumber; // +27 84 900 9821
    const message = 'Hello la tiah, I would like to enquire about room availability and pricing.';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  }
}