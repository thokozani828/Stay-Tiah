import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonContent } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {

  // ==========================================
  // VIEW CHILD REFERENCE
  // ==========================================
  @ViewChild(IonContent, { static: false }) content!: IonContent;

  // ==========================================
  // SPLASH SCREEN STATE
  // ==========================================
  splashHidden: boolean = false;

  // ==========================================
  // NAVIGATION STATE
  // ==========================================
  activeTab: string = 'musgrave';
  currentSection: string = 'home';
  showHero: boolean = true;
  mobileNavOpen: boolean = false;
  isScrolled: boolean = false;

  // ==========================================
  // WHATSAPP NUMBER
  // ==========================================
  whatsappNumber: string = '27849009821';

  // ==========================================
  // IMAGE PATHS
  // ==========================================
  aboutImage: string = 'assets/images/ChatGPT Image Jul 29, 2026, 08_23_26 AM.png';
  aboutImageFallback: string = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80';

  // ==========================================
  // FAQ DATA
  // ==========================================
  faqs: any[] = [
    {
      question: 'What are the check-in and check-out times?',
      answer: 'Check-in is from 2:00 PM and check-out is by 10:00 AM. Early check-in and late check-out may be available upon request.',
      active: false
    },
    {
      question: 'Is parking available?',
      answer: 'Yes, secure parking is available at both our Musgrave and North Beach locations. Please inform us in advance if you require parking.',
      active: false
    },
    {
      question: 'Do you offer airport transfers?',
      answer: 'We can arrange airport transfers upon request for an additional fee. Please contact us at least 24 hours in advance.',
      active: false
    },
    {
      question: 'Are pets allowed?',
      answer: 'We welcome well-behaved pets at our Musgrave location. Please inform us when booking so we can prepare accordingly.',
      active: false
    },
    {
      question: 'Is there Wi-Fi available?',
      answer: 'Yes, complimentary high-speed Wi-Fi is available throughout all our properties.',
      active: false
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, and cash payments. Online payments can also be made via our secure booking system.',
      active: false
    },
    {
      question: 'Do you have a cancellation policy?',
      answer: 'Yes, we have a flexible cancellation policy. Free cancellation is available up to 24 hours before check-in. Please refer to our terms and conditions for more details.',
      active: false
    },
    {
      question: 'Is breakfast included?',
      answer: 'No, breakfast is not included in the room rate. However, we offer a variety of breakfast options at nearby restaurants.',
      active: false
    }
  ];

  constructor(private router: Router) {}

  // ==========================================
  // LIFECYCLE HOOKS
  // ==========================================

  ngOnInit() {
    // Hide splash screen after 2.5 seconds
    setTimeout(() => {
      this.splashHidden = true;
    }, 2500);
  }

  // ==========================================
  // WINDOW SCROLL LISTENER (for header)
  // ==========================================
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  // ==========================================
  // NAVIGATION METHODS
  // ==========================================

  // Navigate to home
  goToHome() {
    this.currentSection = 'home';
    this.closeMobileNav();
    this.scrollToSection('home');
  }

  // Navigate to rooms page
  goToRooms() {
    this.router.navigate(['/rooms']);
    this.closeMobileNav();
  }

  // Navigate to about page
  goToAbout() {
    this.router.navigate(['/about']);
    this.closeMobileNav();
  }

  // Navigate to attractions page
  goToAttractions() {
    this.router.navigate(['/attractions']);
    this.closeMobileNav();
  }

  // Navigate to contact page
  goToContact() {
    this.router.navigate(['/contact']);
    this.closeMobileNav();
  }

  // ==========================================
  // SCROLL METHODS (Fixed)
  // ==========================================

  // Scroll to specific section using Ionic's internal engine
  async scrollToSection(sectionId: string) {
    // Close mobile nav if it's open
    this.closeMobileNav();

    const targetElement = document.getElementById(sectionId);
    
    if (targetElement && this.content) {
      try {
        // Get Ionic's internal scroll element (Shadow DOM)
        const scrollEl = await this.content.getScrollElement();

        // Calculate the top position of the target element
        const headerOffset = 72; // Account for fixed header
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + scrollEl.scrollTop - headerOffset;

        // Use Ionic's native scrollToPoint method
        this.content.scrollToPoint(0, offsetPosition, 800);
      } catch (error) {
        console.error('Scroll error:', error);
        // Fallback: use native scrollIntoView
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  // ==========================================
  // MOBILE NAVIGATION
  // ==========================================

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

  // ==========================================
  // EVENT HANDLERS
  // ==========================================

  // Scroll event for ion-content
  onScroll(event: any) {
    const scrollTop = event.detail.scrollTop;
    const heroHeight = window.innerHeight;
    
    this.showHero = scrollTop < heroHeight - 100;
    
    // Also update scrolled state from ion-scroll
    const header = document.querySelector('.site-header');
    if (scrollTop > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }

  // Handle image error
  onImageError(event: any) {
    event.target.src = this.aboutImageFallback;
  }

  // ==========================================
  // FAQ METHODS
  // ==========================================

  // Toggle FAQ item
  toggleFaq(index: number) {
    this.faqs[index].active = !this.faqs[index].active;
  }

  // ==========================================
  // WHATSAPP METHOD - Direct WhatsApp only
  // ==========================================
  openWhatsApp() {
    const phone = this.whatsappNumber; // +27 84 900 9821
    const message = 'Hello STAY@TIAH, I would like to enquire about room availability and pricing.';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  }
}