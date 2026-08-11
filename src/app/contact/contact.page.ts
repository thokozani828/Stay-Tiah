import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
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
export class ContactPage {

  @ViewChild('contactForm') contactForm!: NgForm;

  // Mobile navigation state
  mobileNavOpen: boolean = false;

  // Form data
  contactData = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  // Form validation states
  nameError: boolean = false;
  emailError: boolean = false;
  subjectError: boolean = false;
  messageError: boolean = false;
  isSubmitting: boolean = false;

  // Field focus states for highlighting
  focusedField: string = '';

  // Touched states for validation
  nameTouched: boolean = false;
  emailTouched: boolean = false;
  subjectTouched: boolean = false;
  messageTouched: boolean = false;

  // WhatsApp number (without + sign for URL)
  private readonly whatsappNumber: string = '27849009821';

  constructor(private router: Router) {}

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

  goToAccommodation() {
    this.router.navigate(['/accommodation']);
  }

  goToGallery() {
    this.router.navigate(['/gallery']);
  }

  goToRates() {
    this.router.navigate(['/rates']);
  }

  goToAttractions() {
    this.router.navigate(['/attractions']);
  }

  goToFaq() {
    this.router.navigate(['/faq']);
  }

  goToContact() {
    this.router.navigate(['/contact']);
  }

  // =========================
  // BOOKING FUNCTIONS
  // =========================
  goToBookingPage() {
    this.router.navigate(['/booking']);
  }

  goToBooking() {
    const message = 'Hello STAY@TIAH, I would like to make a booking enquiry.';
    window.open(`https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  }

  // =========================
  // WHATSAPP
  // =========================
  openWhatsApp() {
    const phone = '27849009821';
    const message = 'Hello STAY@TIAH, I would like to make a booking enquiry.';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
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
    // Scroll to the field on mobile for better UX
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
    this.subjectTouched = true;
    this.messageTouched = true;

    // Reset errors
    this.nameError = false;
    this.emailError = false;
    this.subjectError = false;
    this.messageError = false;

    // Validate all fields
    this.validateField('name');
    this.validateField('email');
    this.validateField('subject');
    this.validateField('message');

    // Check if form is valid
    if (this.nameError || this.emailError || this.subjectError || this.messageError) {
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

    // Format message for WhatsApp (REDESIGNED)
    const message = this.formatWhatsAppMessage(this.contactData);
    
    const phone = '27849009821';
    
    // Open WhatsApp
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    
    // Reset form after submission
    setTimeout(() => {
      this.resetForm();
      this.isSubmitting = false;
    }, 1000);
  }

  // =========================
  // FORMAT WHATSAPP MESSAGE - REDESIGNED FOR EASY READING
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
      'booking': '🏨 Booking Enquiry',
      'availability': '📅 Availability Check',
      'rates': '💰 Rates & Pricing',
      'feedback': '⭐ Feedback',
      'other': '📝 Other'
    };

    const subjectLabel = subjectMap[data.subject] || data.subject || 'General Enquiry';

    // Format the message with clear sections for easy reading
    return (
      `🔔 *NEW CONTACT FORM SUBMISSION*%0A` +
      `═══════════════════════════════════%0A%0A` +
      `📋 *CONTACT DETAILS*%0A` +
      `─────────────────────────────────%0A` +
      `👤 Name: ${data.name}%0A` +
      `📧 Email: ${data.email}%0A` +
      `📱 Phone: ${data.phone || 'Not provided'}%0A` +
      `📋 Subject: ${subjectLabel}%0A%0A` +
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
      subject: '',
      message: ''
    };
    
    this.nameTouched = false;
    this.emailTouched = false;
    this.subjectTouched = false;
    this.messageTouched = false;
    
    this.nameError = false;
    this.emailError = false;
    this.subjectError = false;
    this.messageError = false;
    
    this.focusedField = '';
    this.contactForm?.resetForm();
  }
}