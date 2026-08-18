import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, Platform } from '@ionic/angular';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContactPage implements OnInit, OnDestroy {

  @ViewChild('contactForm') contactForm!: NgForm;

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
  private originalPosition: string = '';
  private originalWidth: string = '';
  private originalHeight: string = '';

  // ==========================================
  // PAGE TRANSITION STATE
  // ==========================================
  isTransitioning: boolean = false;
  private transitionTimeout: any;
  private routerSubscription: Subscription | null = null;

  // ==========================================
  // ROUTE HISTORY FOR BACK NAVIGATION
  // ==========================================
  currentRoute: string = '/contact';
  private routeHistory: string[] = ['/home', '/contact'];
  private isNavigatingBack: boolean = false;

  // ==========================================
  // BACK BUTTON SUBSCRIPTION
  // ==========================================
  private backButtonSubscription: any;

  // ==========================================
  // FORM DATA - Updated with availability fields
  // ==========================================
  contactData = {
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    subject: '',
    message: '',
    property: '',
    category: ''
  };

  // ==========================================
  // DATE VALIDATION PROPERTIES
  // ==========================================
  todayDate: string = '';
  minCheckOutDate: string = '';
  dateError: string = '';

  // ==========================================
  // FORM VALIDATION STATES
  // ==========================================
  nameError: boolean = false;
  emailError: boolean = false;
  checkInError: boolean = false;
  checkOutError: boolean = false;
  guestsError: boolean = false;
  subjectError: boolean = false;
  messageError: boolean = false;
  isSubmitting: boolean = false;

  // Field focus states
  focusedField: string = '';

  // Touched states for validation
  nameTouched: boolean = false;
  emailTouched: boolean = false;
  checkInTouched: boolean = false;
  checkOutTouched: boolean = false;
  guestsTouched: boolean = false;
  subjectTouched: boolean = false;
  messageTouched: boolean = false;

  // WhatsApp number
  private readonly whatsappNumber: string = '27849009821';

  constructor(
    private router: Router,
    private location: Location,
    private platform: Platform
  ) {}

  ngOnInit() {
    // Hide splash screen after 2.5 seconds
    setTimeout(() => {
      this.splashHidden = true;
    }, 2500);

    // Set today's date for validation
    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0];
    this.minCheckOutDate = this.todayDate;

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

  ngOnDestroy() {
    this.restoreScroll();
    this.restoreBodyStyles();
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
  // DATE VALIDATION METHODS
  // ==========================================
  
  onCheckInChange() {
    if (this.contactData.checkIn) {
      const checkInDate = new Date(this.contactData.checkIn);
      const nextDay = new Date(checkInDate);
      nextDay.setDate(checkInDate.getDate() + 1);
      this.minCheckOutDate = nextDay.toISOString().split('T')[0];
      
      if (this.contactData.checkOut && this.contactData.checkOut < this.minCheckOutDate) {
        this.contactData.checkOut = '';
        this.checkOutError = false;
        this.dateError = '';
      }
      
      this.validateDates();
    }
  }

  onCheckOutChange() {
    this.validateDates();
  }

  validateDates() {
    this.dateError = '';
    
    if (this.contactData.checkIn && this.contactData.checkOut) {
      const checkIn = new Date(this.contactData.checkIn);
      const checkOut = new Date(this.contactData.checkOut);
      
      if (checkOut <= checkIn) {
        this.dateError = 'Check-out date must be after check-in date';
        this.checkOutError = true;
        this.contactData.checkOut = '';
      } else {
        this.checkOutError = false;
      }
    }
  }

  isPastDate(dateStr: string): boolean {
    if (!dateStr) return false;
    const selectedDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate < today;
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
    // Handle resize if needed
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
    this.closeMobileNav();
    if (this.currentRoute === '/booking' || this.isTransitioning) return;
    
    this.startTransition();
    setTimeout(() => {
      this.router.navigate(['/booking']);
      setTimeout(() => {
        this.endTransition();
      }, 300);
    }, 400);
  }

  /**
   * Navigate to home page
   */
  goToHome() {
    if (this.currentRoute === '/home') return;
    this.onNavClick('/home');
  }

  /**
   * Navigate to about page
   */
  goToAbout() {
    this.onNavClick('/about');
  }

  /**
   * Navigate to rooms page
   */
  goToRooms() {
    this.onNavClick('/rooms');
  }

  /**
   * Navigate to attractions page
   */
  goToAttractions() {
    this.onNavClick('/attractions');
  }

  /**
   * Navigate to contact page
   */
  goToContact() {
    this.onNavClick('/contact');
  }

  /**
   * Smart back navigation using Location service for proper browser history
   */
  goBack() {
    // Prevent multiple back navigations
    if (this.isNavigatingBack || this.isTransitioning) {
      return;
    }

    this.closeMobileNav();

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

  // =========================
  // MOBILE NAVIGATION
  // =========================
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

  private restoreScroll() {
    document.body.style.overflow = this.originalOverflow || '';
    document.documentElement.style.overflow = this.originalOverflow || '';
  }

  private restoreBodyStyles() {
    document.body.style.position = this.originalPosition || '';
    document.body.style.width = this.originalWidth || '';
    document.body.style.height = this.originalHeight || '';
  }

  // =========================
  // WHATSAPP - Now redirects to Booking
  // =========================

  /**
   * Core WhatsApp sender - Now navigates to booking
   */
  private sendWhatsAppMessage(message: string) {
    // Redirect to booking page instead of WhatsApp
    this.navigateToBooking();
  }

  /**
   * General WhatsApp - redirects to booking
   */
  openWhatsApp() {
    this.navigateToBooking();
  }

  /**
   * WhatsApp for contact page
   */
  openWhatsAppForContact() {
    this.navigateToBooking();
  }

  /**
   * WhatsApp for rooms enquiry
   */
  openWhatsAppForRooms() {
    this.navigateToBooking();
  }

  /**
   * WhatsApp for rates enquiry
   */
  openWhatsAppForRates() {
    this.navigateToBooking();
  }

  /**
   * WhatsApp for attractions enquiry
   */
  openWhatsAppForAttractions() {
    this.navigateToBooking();
  }

  /**
   * WhatsApp for about page
   */
  openWhatsAppForAbout() {
    this.navigateToBooking();
  }

  // =========================
  // FORM VALIDATION
  // =========================
  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  onFieldFocus(fieldName: string) {
    this.focusedField = fieldName;
    setTimeout(() => {
      const element = document.querySelector(`[name="${fieldName}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 300);
  }

  onFieldBlur(fieldName: string) {
    this.focusedField = '';
    
    if (fieldName === 'name') this.nameTouched = true;
    if (fieldName === 'email') this.emailTouched = true;
    if (fieldName === 'checkIn') this.checkInTouched = true;
    if (fieldName === 'checkOut') this.checkOutTouched = true;
    if (fieldName === 'guests') this.guestsTouched = true;
    if (fieldName === 'subject') this.subjectTouched = true;
    if (fieldName === 'message') this.messageTouched = true;
    
    this.validateField(fieldName);
  }

  validateField(fieldName: string) {
    switch(fieldName) {
      case 'name':
        this.nameError = !this.contactData.name || this.contactData.name.trim().length < 2;
        break;
      case 'email':
        this.emailError = !this.contactData.email || !this.isValidEmail(this.contactData.email);
        break;
      case 'checkIn':
        this.checkInError = !this.contactData.checkIn || this.isPastDate(this.contactData.checkIn);
        break;
      case 'checkOut':
        this.checkOutError = !this.contactData.checkOut || this.isPastDate(this.contactData.checkOut);
        break;
      case 'guests':
        this.guestsError = !this.contactData.guests;
        break;
      case 'subject':
        this.subjectError = !this.contactData.subject;
        break;
      case 'message':
        this.messageError = !this.contactData.message || this.contactData.message.trim().length < 5;
        break;
    }
  }

  shouldShowError(fieldName: string): boolean {
    switch(fieldName) {
      case 'name':
        return this.nameError && this.nameTouched;
      case 'email':
        return this.emailError && this.emailTouched;
      case 'checkIn':
        return this.checkInError && this.checkInTouched;
      case 'checkOut':
        return this.checkOutError && this.checkOutTouched;
      case 'guests':
        return this.guestsError && this.guestsTouched;
      case 'subject':
        return this.subjectError && this.subjectTouched;
      case 'message':
        return this.messageError && this.messageTouched;
      default:
        return false;
    }
  }

  // =========================
  // SUBMIT FORM - Send to WhatsApp
  // =========================
  submitContactForm() {
    // Mark all fields as touched
    this.nameTouched = true;
    this.emailTouched = true;
    this.checkInTouched = true;
    this.checkOutTouched = true;
    this.guestsTouched = true;
    this.subjectTouched = true;
    this.messageTouched = true;

    // Reset errors
    this.nameError = false;
    this.emailError = false;
    this.checkInError = false;
    this.checkOutError = false;
    this.guestsError = false;
    this.subjectError = false;
    this.messageError = false;
    this.dateError = '';

    // Validate all fields
    this.validateField('name');
    this.validateField('email');
    this.validateField('checkIn');
    this.validateField('checkOut');
    this.validateField('guests');
    this.validateField('subject');
    this.validateField('message');
    
    this.validateDates();

    // Check if form is valid
    if (this.nameError || this.emailError || this.checkInError || this.checkOutError || 
        this.guestsError || this.subjectError || this.messageError || this.dateError) {
      const firstError = document.querySelector('.input-wrapper.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const input = firstError.querySelector('input, select, textarea');
        if (input) {
          (input as HTMLElement).focus();
        }
      }
      return;
    }

    this.isSubmitting = true;

    // Format message for WhatsApp
    const message = this.formatWhatsAppMessage(this.contactData);
    
    // Send to WhatsApp
    window.open(`https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    
    // Reset form after submission
    setTimeout(() => {
      this.resetForm();
      this.isSubmitting = false;
    }, 1000);
  }

  // =========================
  // FORMAT WHATSAPP MESSAGE
  // =========================
  private formatWhatsAppMessage(data: any): string {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    const timeStr = now.toLocaleTimeString('en-ZA', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const checkInDate = data.checkIn ? new Date(data.checkIn).toLocaleDateString('en-ZA', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }) : 'Not specified';

    const checkOutDate = data.checkOut ? new Date(data.checkOut).toLocaleDateString('en-ZA', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }) : 'Not specified';

    let nights = '';
    if (data.checkIn && data.checkOut) {
      const diff = new Date(data.checkOut).getTime() - new Date(data.checkIn).getTime();
      const nightsCount = Math.ceil(diff / (1000 * 60 * 60 * 24));
      nights = nightsCount > 0 ? `${nightsCount} Night${nightsCount > 1 ? 's' : ''}` : '1 Night';
    }

    const guestsLabel = data.guests ? `${data.guests}` : 'Not specified';

    const subjectMap: { [key: string]: string } = {
      'availability': '📅 Availability Check',
      'booking': '🏨 Booking Enquiry',
      'rates': '💰 Rates & Pricing',
      'feedback': '⭐ Feedback',
      'other': '📝 Other'
    };
    const subjectLabel = subjectMap[data.subject] || data.subject || 'General Enquiry';

    const divider = '──────────────────────────────────';
    const topDivider = '┌──────────────────────────────────┐';
    const bottomDivider = '└──────────────────────────────────┘';

    return (
      `${topDivider}%0A` +
      `│       STAY@TIAH BOOKING FORM     │%0A` +
      `${bottomDivider}%0A%0A` +
      `[ GUEST DETAILS ]%0A` +
      `• Name    : ${data.name || 'Not provided'}%0A` +
      `• Phone   : ${data.phone || 'Not provided'}%0A` +
      `• Email   : ${data.email || 'Not provided'}%0A%0A` +
      `[ RESERVATION SUMMARY ]%0A` +
      `• Property : ${data.property || 'Not specified'}%0A` +
      `• Category : ${data.category || 'Not specified'}%0A` +
      `• Check-In : ${checkInDate}%0A` +
      `• Check-Out: ${checkOutDate}%0A` +
      `• Duration : ${nights}%0A` +
      `• Guests   : ${guestsLabel}%0A%0A` +
      `[ ADDITIONAL NOTES ]%0A` +
      `• ${data.message || 'None'}%0A%0A` +
      `${divider}%0A` +
      `Submitted : ${dateStr} at ${timeStr}%0A` +
      `Channel   : Web Application%0A` +
      `${divider}`
    );
  }

  // =========================
  // RESET FORM
  // =========================
  private resetForm() {
    this.contactData = {
      name: '',
      email: '',
      phone: '',
      checkIn: '',
      checkOut: '',
      guests: '',
      subject: '',
      message: '',
      property: '',
      category: ''
    };
    
    this.nameTouched = false;
    this.emailTouched = false;
    this.checkInTouched = false;
    this.checkOutTouched = false;
    this.guestsTouched = false;
    this.subjectTouched = false;
    this.messageTouched = false;
    
    this.nameError = false;
    this.emailError = false;
    this.checkInError = false;
    this.checkOutError = false;
    this.guestsError = false;
    this.subjectError = false;
    this.messageError = false;
    this.dateError = '';
    
    this.focusedField = '';
    this.contactForm?.resetForm();
  }

  // =========================
  // IMAGE ERROR HANDLER
  // =========================
  onImageError(event: any) {
    event.target.src = 'assets/images/logo2.png';
  }
}