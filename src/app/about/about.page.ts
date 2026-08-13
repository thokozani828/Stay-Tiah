import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonContent } from '@ionic/angular';
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

  @ViewChild(IonContent, { static: false }) content!: IonContent;

  // ==========================================
  // NAVIGATION STATE
  // ==========================================
  mobileNavOpen: boolean = false;
  isScrolled: boolean = false;
  private originalOverflow: string = '';

  // ==========================================
  // IMAGE PATHS
  // ==========================================
  aboutImage: string = 'assets/images/ChatGPT Image Jul 29, 2026, 08_23_26 AM.png';
  aboutImageFallback: string = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80';

  // Location images with proper typing
  locationImages: LocationImages = {
    oceanic: 'assets/images/Durban Oceanic Apartment 82B/4.jpg',
    laTiah: 'assets/images/La Tiah One, Durban/5.jpg',
    tiah: 'assets/images/Tiah Grey, Durban/6.jpg',
    halford: 'assets/images/Halford Backpackers, Durban/1.jpg'
  };

  // ==========================================
  // FALLBACK IMAGE FOR LOCATION IMAGES
  // ==========================================
  locationFallback: string = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';

  constructor(private router: Router) {}

  // ==========================================
  // LIFECYCLE HOOKS
  // ==========================================
  ngOnInit() {}

  ngOnDestroy(): void {
    this.restoreScroll();
  }

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

  // ==========================================
  // SCROLL TO SECTION
  // ==========================================
  async scrollToSection(sectionId: string) {
    this.closeMobileNav();

    const targetElement = document.getElementById(sectionId);
    
    if (targetElement && this.content) {
      try {
        const scrollEl = await this.content.getScrollElement();
        const headerOffset = 72;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + scrollEl.scrollTop - headerOffset;
        this.content.scrollToPoint(0, offsetPosition, 800);
      } catch (error) {
        console.error('Scroll error:', error);
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  // ==========================================
  // IMAGE ERROR HANDLER
  // ==========================================
  onImageError(event: any): void {
    event.target.src = this.aboutImageFallback;
  }

  // ==========================================
  // LOCATION IMAGE ERROR HANDLER
  // ==========================================
  onLocationImageError(event: any): void {
    event.target.src = this.locationFallback;
  }

  // ==========================================
  // MOBILE NAVIGATION
  // ==========================================
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

  // ==========================================
  // NAVIGATION METHODS
  // ==========================================
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

  goToAttractions(): void {
    this.router.navigate(['/attractions']);
    this.closeMobileNav();
  }

  goToContact(): void {
    this.router.navigate(['/contact']);
    this.closeMobileNav();
  }

  // ==========================================
  // WHATSAPP METHOD
  // ==========================================
  openWhatsApp(): void {
    const phone = '27849009821';
    const message = 'Hello stay@tiah, I would like to make a booking enquiry.';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  }
}