import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';

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

  // Mobile navigation state
  mobileNavOpen: boolean = false;

  // Image paths
  aboutImage: string = 'assets/images/ChatGPT Image Jul 29, 2026, 08_23_26 AM.png';
  
  locationImages: any = {
    oceanic: 'assets/images/Durban Oceanic Apartment 82B/4.jpg',
    laTiah: 'assets/images/La Tiah One, Durban/5.jpg',
    tiah: 'assets/images/Tiah Grey, Durban/6.jpg',
    halford: 'assets/images/Halford Backpackers, Durban/1.jpg'
  };

  constructor(private router: Router) {}

  // Mobile navigation methods
  toggleMobileNav(): void {
    this.mobileNavOpen = !this.mobileNavOpen;
  }

  closeMobileNav(): void {
    this.mobileNavOpen = false;
  }

  // Navigation methods
  goToHome(): void {
    this.router.navigate(['/home']);
  }

  goToAbout(): void {
    this.router.navigate(['/about']);
  }

  goToRooms(): void {
    this.router.navigate(['/rooms']);
  }

  goToGallery(): void {
    this.router.navigate(['/gallery']);
  }

  goToRates(): void {
    this.router.navigate(['/rates']);
  }

  goToAttractions(): void {
    this.router.navigate(['/attractions']);
  }

  goToFaq(): void {
    this.router.navigate(['/faq']);
  }

  goToContact(): void {
    this.router.navigate(['/contact']);
  }

  goToBooking(): void {
    this.router.navigate(['/booking']);
  }

  openWhatsApp(): void {
    const phone = '27791234567';
    const message = 'Hello stay@tiah, I would like to make a booking enquiry.';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  }
}