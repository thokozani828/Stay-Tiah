import { Component, OnInit, OnDestroy } from '@angular/core';
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
  ]
})
export class AboutPage implements OnInit, OnDestroy {

  // Mobile navigation state
  mobileNavOpen: boolean = false;
  private originalOverflow: string = '';

  // Image paths
  aboutImage: string = 'assets/images/ChatGPT Image Jul 29, 2026, 08_23_26 AM.png';
  
  locationImages: any = {
    oceanic: 'assets/images/Durban Oceanic Apartment 82B/4.jpg',
    laTiah: 'assets/images/La Tiah One, Durban/5.jpg',
    tiah: 'assets/images/Tiah Grey, Durban/6.jpg',
    halford: 'assets/images/Halford Backpackers, Durban/1.jpg'
  };

  constructor(private router: Router) {}

  ngOnInit() {}

  // =============================================
  // ✅ Mobile Navigation - Same as Home Page
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
    const phone = '27791234567';
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