import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AboutPage {

  // Image paths
  aboutImage: string = 'assets/images/ChatGPT Image Jul 29, 2026, 08_23_26 AM.png';
  aboutImageFallback: string = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80';

  // Location images
  locationImages = {
    oceanic: 'assets/images/oceanic.jpg',
    laTiah: 'assets/images/la-tiah.jpg',
    tiah: 'assets/images/tiah.jpg',
    halford: 'assets/images/halford.jpg'
  };

  // Navigation state
  mobileNavOpen: boolean = false;

  constructor(private router: Router) {}

  // Navigate to booking
  goToBooking() {
    this.router.navigate(['/booking']);
  }

  // Navigate to home
  goToHome() {
    this.router.navigate(['/home']);
  }

  // Toggle mobile navigation
  toggleMobileNav() {
    this.mobileNavOpen = !this.mobileNavOpen;
    document.body.style.overflow = this.mobileNavOpen ? 'hidden' : '';
  }

  // Close mobile navigation
  closeMobileNav() {
    this.mobileNavOpen = false;
    document.body.style.overflow = '';
  }

  // Handle image error
  onImageError(event: any) {
    event.target.src = this.aboutImageFallback;
  }

  // Open WhatsApp
  openWhatsApp() {
    const phone = '27849009821';
    const message = 'Hello stay@tiah, I would like to make a booking enquiry.';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  }
}