import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';

interface LocationImages {
  oceanic: string;
  laTiah: string;
  tiah: string;
  halford: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class AboutPage implements OnInit, OnDestroy {

  // Mobile navigation state
  mobileNavOpen: boolean = false;
  private originalOverflow: string = '';

  // Image paths
  aboutImage: string = 'assets/images/ChatGPT Image Jul 29, 2026, 08_23_26 AM.png';
  aboutImageFallback: string = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80';

  // Location images with proper typing
  locationImages: LocationImages = {
    oceanic: 'assets/images/Durban Oceanic Apartment 82B/4.jpg',
    laTiah: 'assets/images/La Tiah One, Durban/5.jpg',
    tiah: 'assets/images/Tiah Grey, Durban/6.jpg',
    halford: 'assets/images/Halford Backpackers, Durban/1.jpg'
  };

  constructor(private router: Router) {}

  ngOnInit() {}

  // =============================================
  // ✅ Image Error Handler - ADD THIS METHOD
  // =============================================
  
  onImageError(event: any): void {
    event.target.src = this.aboutImageFallback;
  }

  // =============================================
  // ✅ Mobile Navigation
  // =============================================
  
  toggleMobileNav(): void {
    this.mobileNavOpen = !this.mobileNavOpen;
    
    if (this.mobileNavOpen) {
      this.originalOverflow = document.body.style.overflow || '';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      this.restoreScroll();
    }
  }

  closeMobileNav(): void {
    this.mobileNavOpen = false;
    this.restoreScroll();
  }

  private restoreScroll(): void {
    document.body.style.overflow = this.originalOverflow || '';
    document.documentElement.style.overflow = this.originalOverflow || '';
  }

  // =============================================
  // Navigation methods
  // =============================================

  goToHome(): void {
    this.router.navigate(['/home']);
    this.closeMobileNav();
  }

  goToBooking(): void {
    this.router.navigate(['/booking']);
    this.closeMobileNav();
  }

  goToRooms(): void {
    this.router.navigate(['/rooms']);
    this.closeMobileNav();
  }

  openWhatsApp(): void {
    const phone = '27849009821';
    const message = 'Hello stay@tiah, I would like to make a booking enquiry.';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  }

  // =============================================
  // ✅ Clean up on destroy
  // =============================================

  ngOnDestroy(): void {
    this.restoreScroll();
  }
}