import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
  open: boolean;
  relatedQuestions?: string[];
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FaqPage {

  // Mobile navigation state
  mobileNavOpen: boolean = false;

  // Search and filter
  searchTerm: string = '';
  activeCategory: string = 'all';
  filteredFAQs: FAQ[] = [];

  // Question submission
  userQuestion: string = '';
  questionSubmitted: boolean = false;
  questionError: boolean = false;
  questionTouched: boolean = false;
  isSubmittingQuestion: boolean = false;

  // WhatsApp number (without + sign for URL)
  private readonly whatsappNumber: string = '27849009821';

  // FAQ Data
  private faqs: FAQ[] = [
    // Booking Questions
    {
      id: 1,
      category: 'booking',
      question: 'How do I make a booking?',
      answer: 'You can make a booking by clicking the "Book on WhatsApp" button on our website. Simply send us a message with your preferred dates, room type, and number of guests. Alternatively, you can call us directly at +27 84 900 9821.',
      open: false,
      relatedQuestions: ['What is the check-in time?', 'What payment methods do you accept?']
    },
    {
      id: 2,
      category: 'booking',
      question: 'How early should I book?',
      answer: 'We recommend booking at least 2-3 weeks in advance, especially during peak seasons (December holidays, Easter, and major events). Last-minute bookings may be available depending on availability.',
      open: false
    },
    {
      id: 3,
      category: 'booking',
      question: 'Do I need to pay a deposit?',
      answer: 'Yes, a 50% deposit is required to confirm your booking. The balance is due on arrival. We accept cash, bank transfers, and major credit cards.',
      open: false
    },

    // Check-in Questions
    {
      id: 4,
      category: 'checkin',
      question: 'What is the check-in time?',
      answer: 'Check-in is from 2:00 PM onwards. Early check-in may be available upon request and subject to availability. Please contact us in advance if you need early check-in.',
      open: false,
      relatedQuestions: ['What is the check-out time?', 'Can I check in early?']
    },
    {
      id: 5,
      category: 'checkin',
      question: 'What is the check-out time?',
      answer: 'Check-out is at 10:00 AM. Late check-out may be available upon request. Please inform us in advance if you need a late check-out.',
      open: false
    },
    {
      id: 6,
      category: 'checkin',
      question: 'What do I need to check in?',
      answer: 'Please bring your ID or passport, booking confirmation (if you have it), and the balance payment if not paid online. We recommend having all documents ready for a smooth check-in process.',
      open: false
    },

    // Amenities Questions
    {
      id: 7,
      category: 'amenities',
      question: 'What amenities are available at STAY@TIAH?',
      answer: 'We offer free Wi-Fi, comfortable bedding, smart TVs, minibar, air conditioning, 24-hour security, and housekeeping. Some rooms come with stunning ocean views and private balconies.',
      open: false,
      relatedQuestions: ['Is there parking available?', 'Is there a restaurant on site?']
    },
    {
      id: 8,
      category: 'amenities',
      question: 'Is there free Wi-Fi?',
      answer: 'Yes! We provide free high-speed Wi-Fi throughout all our properties. Perfect for staying connected, streaming your favorite shows, or working remotely.',
      open: false
    },
    {
      id: 9,
      category: 'amenities',
      question: 'Is there parking available?',
      answer: 'Yes, secure parking is available at our Musgrave and North Beach locations. Please inform us in advance if you need a parking spot, as space is limited.',
      open: false
    },

    // Location Questions
    {
      id: 10,
      category: 'location',
      question: 'Where are the STAY@TIAH properties located?',
      answer: 'We have properties in Musgrave and North Beach, Durban. Our Musgrave location is at 57 Vause Rd, Musgrave, Berea, 4001. The North Beach location is just steps away from the beach.',
      open: false,
      relatedQuestions: ['How close are you to the beach?', 'Are you near tourist attractions?']
    },
    {
      id: 11,
      category: 'location',
      question: 'How close are you to the beach?',
      answer: 'Our North Beach property is just 2 minutes walk from the beach. The Musgrave location is a short 10-minute drive to the beachfront.',
      open: false
    },
    {
      id: 12,
      category: 'location',
      question: 'Are you near tourist attractions?',
      answer: 'Yes! We\'re close to uShaka Marine World, Moses Mabhida Stadium, Durban Botanical Gardens, and the Golden Mile. We\'re also near excellent restaurants and shopping centers.',
      open: false
    },

    // Policies Questions
    {
      id: 13,
      category: 'policies',
      question: 'What is your cancellation policy?',
      answer: 'You can cancel up to 48 hours before check-in without any charge. Cancellations within 48 hours of check-in will forfeit the deposit. Please contact us directly for any cancellation requests.',
      open: false,
      relatedQuestions: ['Can I get a refund?', 'What happens if I need to change my dates?']
    },
    {
      id: 14,
      category: 'policies',
      question: 'Can I get a refund if I cancel?',
      answer: 'If you cancel more than 48 hours before check-in, you\'ll receive a full refund of your deposit. For cancellations within 48 hours, the deposit is non-refundable. Please check our cancellation policy when booking.',
      open: false
    },
    {
      id: 15,
      category: 'policies',
      question: 'Are pets allowed?',
      answer: 'We currently do not allow pets at our properties. We maintain a clean and hypoallergenic environment for all our guests. Service animals are welcome with prior notice.',
      open: false
    }
  ];

  constructor(private router: Router) {
    // Initialize filtered FAQs
    this.filteredFAQs = [...this.faqs];
  }

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

  goToBookingPage() {
    this.router.navigate(['/booking']);
  }

  openWhatsApp() {
    const phone = '27849009821';
    const message = 'Hello STAY@TIAH, I have a question about my stay.';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  }

  // =========================
  // FAQ FILTERING
  // =========================
  filterFAQs() {
    const searchLower = this.searchTerm.toLowerCase().trim();
    
    this.filteredFAQs = this.faqs.filter(faq => {
      const matchesCategory = this.activeCategory === 'all' || faq.category === this.activeCategory;
      const matchesSearch = !searchLower || 
        faq.question.toLowerCase().includes(searchLower) || 
        faq.answer.toLowerCase().includes(searchLower);
      return matchesCategory && matchesSearch;
    });
  }

  setCategory(category: string) {
    this.activeCategory = category;
    this.filterFAQs();
  }

  clearSearch() {
    this.searchTerm = '';
    this.filterFAQs();
  }

  resetFilters() {
    this.searchTerm = '';
    this.activeCategory = 'all';
    this.filterFAQs();
  }

  // =========================
  // FAQ ACCORDION
  // =========================
  toggleFAQ(index: number) {
    const faq = this.filteredFAQs[index];
    if (faq) {
      faq.open = !faq.open;
    }
  }

  scrollToQuestion(questionText: string) {
    // Find the FAQ with matching question
    const faqIndex = this.faqs.findIndex(f => 
      f.question.toLowerCase().includes(questionText.toLowerCase())
    );
    
    if (faqIndex !== -1) {
      // Reset filters to show all
      this.searchTerm = '';
      this.activeCategory = 'all';
      this.filterFAQs();
      
      // Open the FAQ
      const faq = this.filteredFAQs.find(f => f.id === this.faqs[faqIndex].id);
      if (faq) {
        faq.open = true;
        // Scroll to it after a small delay
        setTimeout(() => {
          const element = document.querySelector('.faq-item.active');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      }
    }
  }

  // =========================
  // VALIDATE QUESTION
  // =========================
  validateQuestion(): boolean {
    this.questionError = !this.userQuestion || this.userQuestion.trim().length < 5;
    return !this.questionError;
  }

  // =========================
  // SUBMIT QUESTION - SEND TO WHATSAPP (MATCHING BOOKING PAGE STYLE)
  // =========================
  submitQuestion() {
    this.questionTouched = true;
    
    if (!this.validateQuestion()) {
      // Focus on the input
      const input = document.querySelector('.ask-form .form-input-native');
      if (input) {
        (input as HTMLElement).focus();
      }
      return;
    }

    this.isSubmittingQuestion = true;

    // Format message for WhatsApp (using %0A for line breaks like booking page)
    const message = this.formatWhatsAppQuestion(this.userQuestion);
    
    const phone = '27849009821';
    
    // Open WhatsApp
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    
    // Show success message
    this.questionSubmitted = true;
    this.isSubmittingQuestion = false;
    
    // Reset after a delay
    setTimeout(() => {
      this.userQuestion = '';
      this.questionSubmitted = false;
      this.questionTouched = false;
      this.questionError = false;
    }, 5000);
  }

  // =========================
  // FORMAT WHATSAPP MESSAGE (MATCHING BOOKING PAGE STYLE WITH %0A)
  // =========================
  private formatWhatsAppQuestion(question: string): string {
    return (
      `❓ *New FAQ Question - STAY@TIAH*%0A%0A` +
      `📝 *Question:*%0A` +
      `${question}%0A%0A` +
      `---%0A` +
      `📅 Sent via FAQ page%0A` +
      `🌐 staytiah.com%0A%0A` +
      `💡 *We'll respond within 24 hours!*`
    );
  }
}