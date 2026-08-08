import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

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

  // =========================
  // SUBMIT FORM
  // =========================
  submitContactForm() {
    // Reset errors
    this.nameError = false;
    this.emailError = false;
    this.subjectError = false;
    this.messageError = false;

    // Validate
    let isValid = true;

    if (!this.contactData.name) {
      this.nameError = true;
      isValid = false;
    }

    if (!this.contactData.email) {
      this.emailError = true;
      isValid = false;
    } else if (!this.isValidEmail(this.contactData.email)) {
      this.emailError = true;
      isValid = false;
    }

    if (!this.contactData.subject) {
      this.subjectError = true;
      isValid = false;
    }

    if (!this.contactData.message) {
      this.messageError = true;
      isValid = false;
    }

    if (!isValid) {
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
    }, 1500);
  }
}