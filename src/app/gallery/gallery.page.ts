import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GalleryPage {

  // Mobile navigation state
  mobileNavOpen: boolean = false;

  activeCategory: string = 'all';
  lightboxOpen: boolean = false;
  currentIndex: number = 0;

  // Gallery Images Data - Using Local Images
  galleryImages: any[] = [
    // ==================== ROOMS ====================
    {
      id: 1,
      src: 'assets/images/Durban Oceanic Apartment 82B/8.jpg',
      title: 'Deluxe Ocean View Room',
      description: 'Spacious room with stunning ocean views, premium bedding, and modern amenities.',
      category: 'rooms',
      featured: true,
      landscape: false
    },
    {
      id: 2,
      src: 'assets/images/Durban Oceanic Apartment 117/11.jpg',
      title: 'Executive Suite Living Area',
      description: 'Elegant living space with comfortable seating, work desk, and premium finishes.',
      category: 'rooms',
      featured: false,
      landscape: true
    },
    {
      id: 3,
      src: 'assets/images/Durban Oceanic Room 82A/1.jpg',
      title: 'Family Room with Ocean View',
      description: 'Spacious family accommodation with beautiful ocean views and comfortable bedding.',
      category: 'rooms',
      featured: false,
      landscape: false
    },
    {
      id: 4,
      src: 'assets/images/Halford Backpackers, Durban/7.jpg',
      title: 'Premium Suite Bedroom',
      description: 'Luxurious suite with king-size bed, premium linens, and elegant decor.',
      category: 'rooms',
      featured: true,
      landscape: false
    },
    {
      id: 5,
      src: 'assets/images/La Tiah Four, Durban/3.jpg',
      title: 'Modern Bathroom',
      description: 'Contemporary en-suite bathroom with premium fixtures and rainfall shower.',
      category: 'rooms',
      featured: false,
      landscape: true
    },

    // ==================== EXTERIOR ====================
    {
      id: 6,
      src: 'assets/images/La Tiah One, Durban/5.jpg',
      title: 'Hotel Exterior - Musgrave',
      description: 'Beautiful exterior of our Musgrave property with lush landscaping.',
      category: 'exterior',
      featured: true,
      landscape: true
    },
    {
      id: 7,
      src: 'assets/images/La Tiah Two, Durban/10.jpg',
      title: 'Property Entrance',
      description: 'Welcoming entrance to our Durban Oceanic property with modern architecture.',
      category: 'exterior',
      featured: false,
      landscape: true
    },
    {
      id: 8,
      src: 'assets/images/Tiah Grey, Durban/8.jpg',
      title: 'Building Facade - Tiah Musgrave',
      description: 'Elegant facade of Tiah Musgrave with classic architectural design.',
      category: 'exterior',
      featured: false,
      landscape: true
    },

    // ==================== AMENITIES ====================
    {
      id: 9,
      src: 'assets/images/Durban Oceanic Apartment 82B/4.jpg',
      title: 'Swimming Pool Area',
      description: 'Relaxing pool area with sun loungers and beautiful surrounding gardens.',
      category: 'amenities',
      featured: true,
      landscape: true
    },
    {
      id: 10,
      src: 'assets/images/Durban Oceanic Apartment 117/8.jpg',
      title: 'Common Lounge Area',
      description: 'Comfortable lounge area for guests to relax and socialize.',
      category: 'amenities',
      featured: false,
      landscape: true
    },
    {
      id: 11,
      src: 'assets/images/Durban Oceanic Room 82A/7.jpg',
      title: 'Dining Area',
      description: 'Elegant dining space where guests can enjoy their meals.',
      category: 'amenities',
      featured: false,
      landscape: true
    },
    {
      id: 12,
      src: 'assets/images/Tiah Grey, Durban/6.jpg',
      title: 'Outdoor Patio',
      description: 'Beautiful outdoor patio area perfect for relaxation and enjoying the weather.',
      category: 'amenities',
      featured: false,
      landscape: true
    },

    // ==================== VIEWS ====================
    {
      id: 13,
      src: 'assets/images/Tiah Grey, Durban/4.jpg',
      title: 'Durban Beachfront View',
      description: 'Breathtaking view of Durban\'s golden beaches from our ocean-facing rooms.',
      category: 'views',
      featured: true,
      landscape: true
    },
    {
      id: 14,
      src: 'assets/images/Tiah Whyte, Durban/7.jpg',
      title: 'Sunset Over Durban',
      description: 'Spectacular sunset views over the Durban coastline from our properties.',
      category: 'views',
      featured: false,
      landscape: true
    },
    {
      id: 15,
      src: 'assets/images/moses-mabhida-stadium-in-durban.webp',
      title: 'City Skyline View',
      description: 'Panoramic views of Durban\'s vibrant city skyline at night.',
      category: 'views',
      featured: false,
      landscape: true
    },
    {
      id: 16,
      src: 'assets/images/view-of-pier-and-beachfront-golden-mile-from-durbans-beach.webp',
      title: 'Moses Mabhida Stadium View',
      description: 'Iconic view of Moses Mabhida Stadium from our Musgrave location.',
      category: 'views',
      featured: false,
      landscape: true
    }
  ];

  // Get filtered images based on active category
  get filteredImages(): any[] {
    if (this.activeCategory === 'all') {
      return this.galleryImages;
    }
    return this.galleryImages.filter(img => img.category === this.activeCategory);
  }

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
    const message = 'Hello STAY@TIAH, I would like to make a booking enquiry.';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  }

  // =========================
  // FILTER FUNCTIONS
  // =========================
  setCategory(category: string) {
    this.activeCategory = category;
    // Close lightbox when changing category
    if (this.lightboxOpen) {
      this.closeLightbox();
    }
  }

  // =========================
  // LIGHTBOX FUNCTIONS
  // =========================
  openLightbox(index: number) {
    this.currentIndex = index;
    this.lightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.lightboxOpen = false;
    document.body.style.overflow = '';
  }

  nextImage(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    if (this.currentIndex < this.filteredImages.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prevImage(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.filteredImages.length - 1;
    }
  }

  goToImage(index: number, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.currentIndex = index;
  }

  // =========================
  // KEYBOARD NAVIGATION
  // =========================
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.lightboxOpen) {
      if (event.key === 'ArrowRight') {
        this.nextImage();
      } else if (event.key === 'ArrowLeft') {
        this.prevImage();
      } else if (event.key === 'Escape') {
        this.closeLightbox();
      }
    }
  }

  // =========================
  // WHATSAPP
  // =========================
  openWhatsApp() {
    const phone = '27791234567';
    const message = 'Hello STAY@TIAH, I would like to make a booking enquiry.';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  }
}