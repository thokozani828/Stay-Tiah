import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, HostListener, OnInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonContent, Platform } from '@ionic/angular';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { filter } from 'rxjs/operators';

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
  private lastPage: string = '';

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
    property: '', // Added property field
    category: ''  // Added category field
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

  ngOnInit() {
    // Set today's date for validation
    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0];
    this.minCheckOutDate = this.todayDate;
    
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
  // DATE VALIDATION METHODS
  // ==========================================
  
  // Called when check-in date changes
  onCheckInChange() {
    if (this.contactData.checkIn) {
      // Set min checkout date to check-in date + 1 day
      const checkInDate = new Date(this.contactData.checkIn);
      const nextDay = new Date(checkInDate);
      nextDay.setDate(checkInDate.getDate() + 1);
      this.minCheckOutDate = nextDay.toISOString().split('T')[0];
      
      // If checkout date is before the new minimum, clear it
      if (this.contactData.checkOut && this.contactData.checkOut < this.minCheckOutDate) {
        this.contactData.checkOut = '';
        this.checkOutError = false;
        this.dateError = '';
      }
      
      // Validate the date
      this.validateDates();
    }
  }

  // Called when check-out date changes
  onCheckOutChange() {
    this.validateDates();
  }

  // Validate date logic
  validateDates() {
    this.dateError = '';
    
    if (this.contactData.checkIn && this.contactData.checkOut) {
      const checkIn = new Date(this.contactData.checkIn);
      const checkOut = new Date(this.contactData.checkOut);
      
      // Check if check-out is after check-in
      if (checkOut <= checkIn) {
        this.dateError = 'Check-out date must be after check-in date';
        this.checkOutError = true;
        this.contactData.checkOut = '';
      } else {
        this.checkOutError = false;
      }
    }
  }

  // Check if date is in the past
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

  // =========================
  // MOBILE NAVIGATION - IMPROVED
  // =========================
  toggleMobileNav() {
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

  // =========================
  // NAVIGATION FUNCTIONS
  // =========================
  goToHome() {
    this.closeMobileNav();
    this.router.navigate(['/home'], { replaceUrl: true });
  }

  goToAbout() {
    this.closeMobileNav();
    this.router.navigate(['/about']);
  }

  goToRooms() {
    this.closeMobileNav();
    this.router.navigate(['/rooms']);
  }

  goToAttractions() {
    this.closeMobileNav();
    this.router.navigate(['/attractions']);
  }

  goToContact() {
    this.closeMobileNav();
    this.router.navigate(['/contact']);
  }

  goToBooking() {
    this.closeMobileNav();
    this.router.navigate(['/booking']);
  }

  // =========================
  // WHATSAPP - Dynamic Messages Based on Context
  // =========================

  // Core WhatsApp sender
  private sendWhatsAppMessage(message: string) {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`, '_blank');
  }

  // General WhatsApp - for header, footer, floating button
  openWhatsApp() {
    const message = 'Hello La Tiah, I would like to make a booking enquiry.';
    this.sendWhatsAppMessage(message);
  }

  // WhatsApp for contact page
  openWhatsAppForContact() {
    const message = 'Hello La Tiah, I would like to get in touch regarding your accommodation.';
    this.sendWhatsAppMessage(message);
  }

  // WhatsApp for rooms enquiry
  openWhatsAppForRooms() {
    const message = 'Hello La Tiah, I would like to enquire about your rooms and availability.';
    this.sendWhatsAppMessage(message);
  }

  // WhatsApp for rates enquiry
  openWhatsAppForRates() {
    const message = 'Hello La Tiah, I would like to enquire about your rates and pricing.';
    this.sendWhatsAppMessage(message);
  }

  // WhatsApp for attractions enquiry
  openWhatsAppForAttractions() {
    const message = 'Hello La Tiah, I would like to enquire about attractions near your accommodation.';
    this.sendWhatsAppMessage(message);
  }

  // WhatsApp for about page
  openWhatsAppForAbout() {
    const message = 'Hello La Tiah, I would like to learn more about your accommodation options.';
    this.sendWhatsAppMessage(message);
  }

  // =========================
  // FORM VALIDATION
  // =========================
  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  // Field focus handlers
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
    
    // Mark as touched when blurred
    if (fieldName === 'name') this.nameTouched = true;
    if (fieldName === 'email') this.emailTouched = true;
    if (fieldName === 'checkIn') this.checkInTouched = true;
    if (fieldName === 'checkOut') this.checkOutTouched = true;
    if (fieldName === 'guests') this.guestsTouched = true;
    if (fieldName === 'subject') this.subjectTouched = true;
    if (fieldName === 'message') this.messageTouched = true;
    
    // Validate on blur
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

  // Check if field should show error
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
  // SUBMIT FORM - SEND TO WHATSAPP
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
    
    // Validate date logic
    this.validateDates();

    // Check if form is valid
    if (this.nameError || this.emailError || this.checkInError || this.checkOutError || 
        this.guestsError || this.subjectError || this.messageError || this.dateError) {
      // Scroll to first error field
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

    // Format message for WhatsApp with new style
    const message = this.formatWhatsAppMessage(this.contactData);
    
    // Use the whatsappNumber variable
    window.open(`https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    
    // Reset form after submission
    setTimeout(() => {
      this.resetForm();
      this.isSubmitting = false;
    }, 1000);
  }

  // =========================
  // FORMAT WHATSAPP MESSAGE - New Professional Format
  // =========================
  private formatWhatsAppMessage(data: any): string {
    // Get current date and time
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

    // Format check-in and check-out dates
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

    // Calculate number of nights
    let nights = '';
    let nightsCount = 0;
    if (data.checkIn && data.checkOut) {
      const diff = new Date(data.checkOut).getTime() - new Date(data.checkIn).getTime();
      nightsCount = Math.ceil(diff / (1000 * 60 * 60 * 24));
      nights = nightsCount > 0 ? `${nightsCount} Night${nightsCount > 1 ? 's' : ''}` : '1 Night';
    }

    const guestsLabel = data.guests ? `${data.guests}` : 'Not specified';

    // Get subject label
    const subjectMap: { [key: string]: string } = {
      'availability': '📅 Availability Check',
      'booking': '🏨 Booking Enquiry',
      'rates': '💰 Rates & Pricing',
      'feedback': '⭐ Feedback',
      'other': '📝 Other'
    };
    const subjectLabel = subjectMap[data.subject] || data.subject || 'General Enquiry';

    // Build the professional message
    const divider = '──────────────────────────────────';
    const topDivider = '┌──────────────────────────────────┐';
    const bottomDivider = '└──────────────────────────────────┘';

    return (
      `${topDivider}%0A` +
      `│       LA TIAH BOOKING FORM      │%0A` +
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
}