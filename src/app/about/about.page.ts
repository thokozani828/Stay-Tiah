import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AboutPage {

  // Add this property for mobile navigation
  mobileNavOpen: boolean = false;

  // YOUR IMAGES - Update these paths to match your image locations
  
  // About Intro Image
  aboutImage: string = 'assets/images/ChatGPT Image Jul 29, 2026, 08_23_26 AM.png';
  
  // Location Images - Replace these with your PC images
  locationImages: any = {
    oceanic: 'assets/images/Durban Oceanic Apartment 82B/4.jpg',
    laTiah: 'assets/images/La Tiah One, Durban/5.jpg',
    tiah: 'assets/images/Tiah Grey, Durban/6.jpg',
    halford: 'assets/images/Halford Backpackers, Durban/1.jpg'
  };

  constructor(
    private router: Router,
    private location: Location
  ) {}

  // Mobile navigation methods
  toggleMobileNav(): void {
    this.mobileNavOpen = !this.mobileNavOpen;
  }

  closeMobileNav(): void {
    this.mobileNavOpen = false;
  }

  // Go back method
  goBack() {
    this.location.back();
  }

  // Navigation functions
  goToHome() {
    this.router.navigate(['/home']);
  }

  goToAbout() {
    this.router.navigate(['/about']);
  }

  goToRooms() {
    this.router.navigate(['/rooms']);
  }

  goToAccommodation() {
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

  // Booking navigation
  goToBooking() {
    this.router.navigate(['/booking']);
  }

  // Open WhatsApp
  openWhatsApp() {
    const phone = '27791234567';
    const message = 'Hello stay@tiah, I would like to make a booking enquiry.';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  }
}