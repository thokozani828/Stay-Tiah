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

  // WhatsApp number
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
    const message = 'Hello STAY@TIAH, I would like to make a booking enquiry.';
    window.open(`https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
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
  // SUBMIT FORM
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
      const firstError = document.querySelector('.form-input.error, .form-select.error, .form-textarea.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (firstError as HTMLElement).focus();
      }
      return;
    }

    // Submit form
    this.isSubmitting = true;

    // Simulate API call
    setTimeout(() => {
      console.log('Form Data:', this.contactData);
      this.isSubmitting = false;
      
      // Show success message
      alert('Thank you for your message! We will get back to you soon.');
      
      // Reset form
      this.contactData = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      };
      
      // Reset touched states
      this.nameTouched = false;
      this.emailTouched = false;
      this.subjectTouched = false;
      this.messageTouched = false;
      
      // Reset errors
      this.nameError = false;
      this.emailError = false;
      this.subjectError = false;
      this.messageError = false;
      
      // Reset focus
      this.focusedField = '';
      
      // Reset form
      this.contactForm?.resetForm();
    }, 1500);
  }
}