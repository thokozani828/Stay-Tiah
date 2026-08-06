import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContactPage {

  // Mobile navigation state
  mobileNavOpen: boolean = false;

  // Contact form data
  contactData: any = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  // Form validation flags
  nameError: boolean = false;
  emailError: boolean = false;
  isSubmitting: boolean = false;

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

  goToRooms() {
    this.router.navigate(['/rooms']);
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

  goToBooking() {
    const phone = '27791234567';
    const message = 'Hello stay@tiah, I would like to make a booking enquiry.';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  }

  goToBookingWithRoom(roomId: number) {
    const phone = '27791234567';
    const message = `Hello stay@tiah, I would like to enquire about room ${roomId}.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  }

  // =========================
  // WHATSAPP FUNCTIONS
  // =========================
  openWhatsApp() {
    const phone = '27791234567';
    const message = 'Hello stay@tiah, I would like to make a booking enquiry.';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  }

  // =========================
  // CONTACT FORM SUBMISSION
  // =========================
  submitContactForm() {
    // Reset errors
    this.nameError = false;
    this.emailError = false;

    // Validate name
    if (!this.contactData.name || this.contactData.name.trim() === '') {
      this.nameError = true;
      return;
    }

    // Validate email
    if (!this.contactData.email || this.contactData.email.trim() === '') {
      this.emailError = true;
      return;
    }

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.contactData.email)) {
      this.emailError = true;
      return;
    }

    // Validate subject
    if (!this.contactData.subject) {
      return;
    }

    // Validate message
    if (!this.contactData.message || this.contactData.message.trim() === '') {
      return;
    }

    this.isSubmitting = true;

    // Prepare WhatsApp message
    const message = 
      `📧 *New Contact Form Submission - stay@tiah*%0A%0A` +
      `👤 *Name:* ${this.contactData.name}%0A` +
      `📧 *Email:* ${this.contactData.email}%0A` +
      `📱 *Phone:* ${this.contactData.phone || 'Not provided'}%0A` +
      `📋 *Subject:* ${this.contactData.subject}%0A` +
      `📝 *Message:* ${this.contactData.message}`;

    const phone = '27791234567';
    
    // Open WhatsApp
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    
    // Reset form after submission
    setTimeout(() => {
      this.contactData = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      };
      this.nameError = false;
      this.emailError = false;
      this.isSubmitting = false;
    }, 1000);
  }

  // =========================
  // SCROLL FUNCTIONS
  // =========================
  onScroll(event: any) {
    // Handle scroll events if needed
    // You can add scroll-based animations here
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // =========================
  // IMAGE ERROR HANDLING
  // =========================
  onImageError(event: any) {
    event.target.src = 'https://placehold.co/800x600/f8f7f4/c9a84c?text=stay@tiah';
  }

  // =========================
  // FAQ TOGGLE (if needed)
  // =========================
  toggleFaq(index: number) {
    // This is for FAQ section if you have one
  }
}