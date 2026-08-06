import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FaqPage {

  // Mobile navigation state
  mobileNavOpen: boolean = false;

  searchTerm: string = '';
  activeCategory: string = 'all';
  userQuestion: string = '';
  questionSubmitted: boolean = false;

  // WhatsApp number
  private readonly whatsappNumber: string = '27849009821';

  // FAQ Data
  faqs: any[] = [
    // Booking Questions
    {
      id: 1,
      question: 'How do I make a booking?',
      answer: 'You can make a booking by clicking the "Book Now" button on our website, filling out the booking form, or contacting us directly via phone or WhatsApp. We\'ll confirm your booking within 24 hours.',
      category: 'booking',
      open: true,
      relatedQuestions: ['Can I book online?', 'How do I confirm my booking?']
    },
    {
      id: 2,
      question: 'Can I book online?',
      answer: 'Yes! You can book online through our website by filling out the booking form. We\'ll respond with availability and confirmation within 24 hours.',
      category: 'booking',
      open: false,
      relatedQuestions: ['How do I make a booking?', 'How do I confirm my booking?']
    },
    {
      id: 3,
      question: 'How do I confirm my booking?',
      answer: 'You\'ll receive a confirmation email or WhatsApp message once your booking is confirmed. Please ensure your contact details are correct when booking.',
      category: 'booking',
      open: false,
      relatedQuestions: ['How do I make a booking?', 'Can I book online?']
    },

    // Check-in Questions
    {
      id: 4,
      question: 'What are the check-in and check-out times?',
      answer: 'Check-in is from 2:00 PM and check-out is by 10:00 AM. Early check-in and late check-out may be available upon request, subject to availability.',
      category: 'checkin',
      open: false,
      relatedQuestions: ['Can I get early check-in?', 'Can I get late check-out?']
    },
    {
      id: 5,
      question: 'Can I get early check-in?',
      answer: 'Early check-in is subject to availability. Please contact us in advance to request early check-in, and we\'ll do our best to accommodate you.',
      category: 'checkin',
      open: false,
      relatedQuestions: ['What are the check-in and check-out times?', 'Can I get late check-out?']
    },
    {
      id: 6,
      question: 'Can I get late check-out?',
      answer: 'Late check-out is subject to availability. Please inform us in advance if you require a late check-out, and we\'ll try our best to accommodate your request.',
      category: 'checkin',
      open: false,
      relatedQuestions: ['What are the check-in and check-out times?', 'Can I get early check-in?']
    },

    // Amenities Questions
    {
      id: 7,
      question: 'Is there Wi-Fi available?',
      answer: 'Yes, complimentary high-speed Wi-Fi is available throughout all our properties. You\'ll receive the Wi-Fi password upon check-in.',
      category: 'amenities',
      open: false,
      relatedQuestions: ['Is parking available?', 'What amenities are included?']
    },
    {
      id: 8,
      question: 'Is parking available?',
      answer: 'Yes, secure free parking is available at all our locations. Please inform us in advance if you require parking so we can reserve a spot for you.',
      category: 'amenities',
      open: false,
      relatedQuestions: ['Is there Wi-Fi available?', 'What amenities are included?']
    },
    {
      id: 9,
      question: 'What amenities are included?',
      answer: 'Our rooms include free Wi-Fi, flat-screen TV, air conditioning, tea and coffee maker, en-suite bathroom, and premium bedding. Some rooms also offer ocean views and kitchenettes.',
      category: 'amenities',
      open: false,
      relatedQuestions: ['Is there Wi-Fi available?', 'Is parking available?']
    },

    // Location Questions
    {
      id: 10,
      question: 'Where are you located?',
      answer: 'We have four convenient locations in Durban: Durban Oceanic (82A, 82B, and 117), La Tiah Musgrave, Tiah Musgrave, and Halford Backpackers. Each location offers unique amenities and proximity to different attractions.',
      category: 'location',
      open: false,
      relatedQuestions: ['Which location is best for me?', 'What attractions are nearby?']
    },
    {
      id: 11,
      question: 'Which location is best for me?',
      answer: 'It depends on your preferences! Durban Oceanic is perfect for beach lovers, Musgrave locations offer a quiet upscale experience, and Halford Backpackers is ideal for budget travelers. Contact us for personalized recommendations.',
      category: 'location',
      open: false,
      relatedQuestions: ['Where are you located?', 'What attractions are nearby?']
    },
    {
      id: 12,
      question: 'What attractions are nearby?',
      answer: 'All our locations are close to Durban\'s top attractions including the Beachfront, uShaka Marine World, Moses Mabhida Stadium, Durban Botanic Gardens, and more. Check our Attractions page for details.',
      category: 'location',
      open: false,
      relatedQuestions: ['Where are you located?', 'Which location is best for me?']
    },

    // Policies Questions
    {
      id: 13,
      question: 'What is your cancellation policy?',
      answer: 'You can cancel your booking up to 24 hours before check-in for a full refund. Cancellations within 24 hours may incur a charge. Please contact us directly for any cancellation requests.',
      category: 'policies',
      open: false,
      relatedQuestions: ['What is your payment policy?', 'Are pets allowed?']
    },
    {
      id: 14,
      question: 'What is your payment policy?',
      answer: 'We accept payments via bank transfer, cash, and major credit cards. A 50% deposit may be required to confirm your booking, with the balance due on arrival.',
      category: 'policies',
      open: false,
      relatedQuestions: ['What is your cancellation policy?', 'Are pets allowed?']
    },
    {
      id: 15,
      question: 'Are pets allowed?',
      answer: 'Yes, we welcome well-behaved pets at our Musgrave locations. Please inform us when booking so we can prepare accordingly. Additional fees may apply.',
      category: 'policies',
      open: false,
      relatedQuestions: ['What is your cancellation policy?', 'What is your payment policy?']
    }
  ];

  // Filtered FAQs
  get filteredFAQs(): any[] {
    let filtered = this.faqs;

    // Filter by category
    if (this.activeCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === this.activeCategory);
    }

    // Filter by search term
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      const search = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(search) || 
        faq.answer.toLowerCase().includes(search)
      );
    }

    return filtered;
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
  // CATEGORY FILTER
  // =========================
  setCategory(category: string) {
    this.activeCategory = category;
    // Close all FAQs when changing category
    this.faqs.forEach(faq => faq.open = false);
  }

  // =========================
  // FAQ ACCORDION
  // =========================
  toggleFAQ(index: number) {
    // Close all other FAQs
    this.faqs.forEach((faq, i) => {
      if (i !== index) {
        faq.open = false;
      }
    });
    // Toggle the clicked FAQ
    this.faqs[index].open = !this.faqs[index].open;
  }

  // =========================
  // SEARCH FUNCTIONS
  // =========================
  filterFAQs() {
    // Auto-open first result if search term exists
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      this.faqs.forEach(faq => faq.open = false);
      const filtered = this.filteredFAQs;
      if (filtered.length > 0) {
        const index = this.faqs.indexOf(filtered[0]);
        if (index !== -1) {
          this.faqs[index].open = true;
        }
      }
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.faqs.forEach(faq => faq.open = false);
  }

  resetFilters() {
    this.searchTerm = '';
    this.activeCategory = 'all';
    this.faqs.forEach(faq => faq.open = false);
  }

  // =========================
  // SCROLL TO QUESTION - FIXED
  // =========================
  scrollToQuestion(questionText: string) {
    // Find the FAQ with this question
    const faq = this.faqs.find(f => f.question === questionText);
    if (faq) {
      const index = this.faqs.indexOf(faq);
      // Open the FAQ
      this.faqs.forEach((f, i) => {
        f.open = i === index;
      });
      // Scroll to the question - using setTimeout to ensure DOM is updated
      setTimeout(() => {
        const elements = document.querySelectorAll('.faq-item');
        if (elements && elements.length > 0) {
          // Convert NodeList to Array and find the matching element
          const elementArray = Array.from(elements);
          for (let el of elementArray) {
            const questionEl = el.querySelector('.faq-question-content h3');
            if (questionEl && questionEl.textContent === questionText) {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              break;
            }
          }
        }
      }, 100);
    }
  }

  // =========================
  // SUBMIT QUESTION
  // =========================
  submitQuestion() {
    if (this.userQuestion && this.userQuestion.trim() !== '') {
      // Send the question via WhatsApp
      const message = 
        `❓ *New Question from FAQ Page - STAY@TIAH*%0A%0A` +
        `📝 *Question:* ${this.userQuestion.trim()}`;

      window.open(`https://wa.me/${this.whatsappNumber}?text=${message}`, '_blank');
      
      // Show success message
      this.questionSubmitted = true;
      this.userQuestion = '';
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        this.questionSubmitted = false;
      }, 5000);
    }
  }

  // =========================
  // WHATSAPP
  // =========================
  openWhatsApp() {
    const message = 'Hello STAY@TIAH, I have a question about my stay.';
    window.open(`https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  }
}