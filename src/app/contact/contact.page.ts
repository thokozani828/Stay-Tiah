import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

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
export class ContactPage implements OnInit {

  @ViewChild('contactForm') contactForm!: NgForm;

  // ==========================================
  // NAVIGATION STATE
  // ==========================================
  mobileNavOpen: boolean = false;
  isScrolled: boolean = false;

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
    message: ''
  };

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

  constructor(private router: Router) {}

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

  // =========================
  // MOBILE NAVIGATION
  // =========================
  toggleMobileNav() {
    this.mobileNavOpen = !this.mobileNavOpen;
    if (this.mobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileNav() {
    this.mobileNavOpen = false;
    document.body.style.overflow = '';
  }

  // =========================
  // NAVIGATION FUNCTIONS
  // =========================
  goToHome() {
    this.router.navigate(['/home']);
  }

  goToAbout() {
    this.router.navigate(['/about']);
  }

  goToRooms() {
    this.router.navigate(['/rooms']);
  }

  goToAttractions() {
    this.router.navigate(['/attractions']);
  }

  goToContact() {
    this.router.navigate(['/contact']);
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
    const message = 'Hello STAY@TIAH, I would like to make a booking enquiry.';
    this.sendWhatsAppMessage(message);
  }

  // WhatsApp for contact page
  openWhatsAppForContact() {
    const message = 'Hello STAY@TIAH, I would like to get in touch regarding your accommodation.';
    this.sendWhatsAppMessage(message);
  }

  // WhatsApp for rooms enquiry
  openWhatsAppForRooms() {
    const message = 'Hello STAY@TIAH, I would like to enquire about your rooms and availability.';
    this.sendWhatsAppMessage(message);
  }

  // WhatsApp for rates enquiry
  openWhatsAppForRates() {
    const message = 'Hello STAY@TIAH, I would like to enquire about your rates and pricing.';
    this.sendWhatsAppMessage(message);
  }

  // WhatsApp for attractions enquiry
  openWhatsAppForAttractions() {
    const message = 'Hello STAY@TIAH, I would like to enquire about attractions near your accommodation.';
    this.sendWhatsAppMessage(message);
  }

  // WhatsApp for about page
  openWhatsAppForAbout() {
    const message = 'Hello STAY@TIAH, I would like to learn more about your accommodation options.';
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
        this.checkInError = !this.contactData.checkIn;
        break;
      case 'checkOut':
        this.checkOutError = !this.contactData.checkOut;
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

    // Validate all fields
    this.validateField('name');
    this.validateField('email');
    this.validateField('checkIn');
    this.validateField('checkOut');
    this.validateField('guests');
    this.validateField('subject');
    this.validateField('message');

    // Check if form is valid
    if (this.nameError || this.emailError || this.checkInError || this.checkOutError || 
        this.guestsError || this.subjectError || this.messageError) {
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

    // Format message for WhatsApp
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
  // FORMAT WHATSAPP MESSAGE - Availability Check
  // =========================
  private formatWhatsAppMessage(data: any): string {
    // Get current date and time
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const timeStr = now.toLocaleTimeString('en-ZA', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const subjectMap: { [key: string]: string } = {
      'availability': '📅 Availability Check',
      'booking': '🏨 Booking Enquiry',
      'rates': '💰 Rates & Pricing',
      'feedback': '⭐ Feedback',
      'other': '📝 Other'
    };

    const subjectLabel = subjectMap[data.subject] || data.subject || 'General Enquiry';

    // Format check-in and check-out dates
    const checkInDate = data.checkIn ? new Date(data.checkIn).toLocaleDateString('en-ZA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }) : 'Not specified';

    const checkOutDate = data.checkOut ? new Date(data.checkOut).toLocaleDateString('en-ZA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }) : 'Not specified';

    // Calculate number of nights
    let nights = '';
    if (data.checkIn && data.checkOut) {
      const diff = new Date(data.checkOut).getTime() - new Date(data.checkIn).getTime();
      const nightsCount = Math.ceil(diff / (1000 * 60 * 60 * 24));
      nights = nightsCount > 0 ? `${nightsCount} night${nightsCount > 1 ? 's' : ''}` : '1 night';
    }

    const guestsLabel = data.guests ? `${data.guests} guest${data.guests > 1 ? 's' : ''}` : 'Not specified';

    // Format the message with clear sections for easy reading
    return (
      `🔔 *NEW AVAILABILITY REQUEST*%0A` +
      `═══════════════════════════════════%0A%0A` +
      `📋 *CONTACT DETAILS*%0A` +
      `─────────────────────────────────%0A` +
      `👤 Name: ${data.name}%0A` +
      `📧 Email: ${data.email}%0A` +
      `📱 Phone: ${data.phone || 'Not provided'}%0A` +
      `📋 Subject: ${subjectLabel}%0A%0A` +
      `📅 *STAY DETAILS*%0A` +
      `─────────────────────────────────%0A` +
      `📆 Check-in: ${checkInDate}%0A` +
      `📆 Check-out: ${checkOutDate}%0A` +
      `🌙 Nights: ${nights}%0A` +
      `👥 Guests: ${guestsLabel}%0A%0A` +
      `💬 *MESSAGE*%0A` +
      `─────────────────────────────────%0A` +
      `${data.message}%0A%0A` +
      `📅 *RECEIVED*%0A` +
      `─────────────────────────────────%0A` +
      `📆 Date: ${dateStr}%0A` +
      `⏰ Time: ${timeStr}%0A` +
      `📱 Source: Website Contact Form%0A%0A` +
      `═══════════════════════════════════%0A` +
      `💡 *ACTION REQUIRED*%0A` +
      `─────────────────────────────────%0A` +
      `📧 Reply to: ${data.email}%0A` +
      `📞 Call: +27 84 900 9821%0A` +
      `💬 WhatsApp: +27 84 900 9821%0A%0A` +
      `🏨 *STAY@TIAH*%0A` +
      `🌐 staytiah.com`
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
      message: ''
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
    
    this.focusedField = '';
    this.contactForm?.resetForm();
  }
}