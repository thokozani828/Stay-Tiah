import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BookingPage implements OnInit {

  bookingData: any = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    location: '',
    roomType: '',
    specialRequests: ''
  };

  selectedRoom: any = null;
  roomId: string | null = null;

  firstNameError: boolean = false;
  lastNameError: boolean = false;
  emailError: boolean = false;
  phoneError: boolean = false;
  checkInError: boolean = false;
  checkOutError: boolean = false;
  isSubmitting: boolean = false;

  // All rooms data - MATCHING THE HOME PAGE ROOMS
  allRooms: any[] = [
    // ==================== DURBAN OCEANIC ROOMS ====================
    {
      id: 1,
      name: 'Durban Oceanic Room 82A',
      location: 'Durban Oceanic',
      locationType: 'oceanic',
      sleeps: '2 Guests',
      bed: 'Queen Bed',
      size: '30 m²',
      price: '1,200',
      rating: 6.7,
      reviews: 37,
      distance: '1.8 km from downtown',
      beachDistance: '250 m from beach',
      description: 'Comfortable Living Space: Durban Oceanic Room 82A offers a spacious apartment in Durban.',
      image: 'assets/images/Durban Oceanic Room 82A/1.jpg',
      amenities: ['Swimming pool', 'Free parking', 'Free Wifi', 'Terrace', 'Hot tub', 'Flat-screen TV', 'Shower', 'View'],
      type: 'double',
      popular: true,
      new: false,
      featured: true
    },
    {
      id: 11,
      name: 'Durban Oceanic Apartment 82B',
      location: 'Durban Oceanic',
      locationType: 'oceanic',
      sleeps: '2 Guests',
      bed: '1 Full Bed',
      size: '30 m²',
      price: '896',
      rating: 8.4,
      reviews: 62,
      distance: '1.8 km from downtown',
      beachDistance: '250 m from beach',
      description: 'Essential Facilities: Durban Oceanic Apartment 82B offers a terrace, outdoor swimming pool, and free WiFi.',
      image: 'assets/images/Durban Oceanic Apartment 82B/8.jpg',
      amenities: ['Outdoor swimming pool', 'Private Parking', 'Free Wifi', 'Terrace', 'Kitchen', 'Bath', 'Washing machine', 'Flat-screen TV'],
      type: 'double',
      popular: true,
      new: true,
      featured: true
    },
    {
      id: 12,
      name: 'Durban Oceanic Apartment 117',
      location: 'Durban Oceanic',
      locationType: 'oceanic',
      sleeps: '2 Guests',
      bed: '1 Full Bed',
      size: '30 m²',
      price: '896',
      rating: 8.6,
      reviews: 15,
      distance: '1.8 km from downtown',
      beachDistance: '250 m from beach',
      description: 'Comfortable Living Space: Durban Oceanic Apartment 117 offers a one-bedroom apartment with a private pool.',
      image: 'assets/images/Durban Oceanic Apartment 117/3.jpg',
      amenities: ['Swimming pool', 'Free parking', 'Free Wifi', 'Air conditioning', 'Private pool', 'Kitchenette', 'Washing machine', 'Flat-screen TV'],
      type: 'double',
      popular: true,
      new: true,
      featured: true
    },
    // ==================== TIAH MUSGRAVE ROOMS ====================
    {
      id: 19,
      name: 'Tiah Whyte',
      location: 'Tiah Musgrave',
      locationType: 'musgrave',
      sleeps: '2 Guests',
      bed: 'Queen Bed',
      size: '24 m²',
      price: '855',
      rating: 8.8,
      reviews: 57,
      distance: '2.3 km from downtown',
      beachDistance: '4.8 km from beach',
      description: 'Comfortable Accommodations: Tiah Whyte offers a guest house with free WiFi and free on-site private parking.',
      image: 'assets/images/Tiah Whyte, Durban/1.jpg',
      amenities: ['Free parking', 'Non-smoking rooms', 'Free Wifi', 'Air conditioning', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker'],
      type: 'double',
      popular: true,
      new: true,
      featured: true
    },
    {
      id: 17,
      name: 'Tiah Grey',
      location: 'Tiah Musgrave',
      locationType: 'musgrave',
      sleeps: '2 Guests',
      bed: 'Queen Bed',
      size: '20 m²',
      price: '675',
      rating: 8.2,
      reviews: 45,
      distance: '2.3 km from downtown',
      beachDistance: '4.8 km from beach',
      description: 'Comfortable Accommodations: Tiah Grey offers a homestay experience in Durban, South Africa.',
      image: 'assets/images/Tiah Grey, Durban/1.jpg',
      amenities: ['Free parking', 'Non-smoking rooms', 'Air conditioning', 'Kitchenette', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker'],
      type: 'double',
      popular: true,
      new: true,
      featured: true
    },
    {
      id: 18,
      name: 'Tiah Pastel',
      location: 'Tiah Musgrave',
      locationType: 'musgrave',
      sleeps: '2 Guests',
      bed: 'Queen Bed',
      size: '20 m²',
      price: '675',
      rating: 7.8,
      reviews: 30,
      distance: '2.3 km from downtown',
      beachDistance: '4.8 km from beach',
      description: 'Comfortable Accommodations: Tiah Pastel offers a guest house with air-conditioning, a kitchenette, and a private bathroom.',
      image: 'assets/images/Tiah Pastel, Durban/1.jpg',
      amenities: ['Free parking', 'Air conditioning', 'Kitchenette', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker'],
      type: 'double',
      popular: true,
      new: true,
      featured: true
    },
    // ==================== LA TIAH MUSGRAVE ROOMS ====================
    {
      id: 16,
      name: 'La Tiah One',
      location: 'La Tiah Musgrave',
      locationType: 'musgrave-la',
      sleeps: '2 Guests',
      bed: 'Full Bed + Queen Bed',
      size: '20 m²',
      price: '553',
      rating: null,
      reviews: 0,
      distance: '2.2 km from downtown',
      beachDistance: '4.6 km from beach',
      description: 'Comfortable Accommodations: La Tiah One offers a guest house experience with free WiFi and free on-site private parking.',
      image: 'assets/images/La Tiah One, Durban/1.jpg',
      amenities: ['Free parking', 'Free Wifi', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker', 'Refrigerator', 'Electric kettle'],
      type: 'double',
      popular: false,
      new: true,
      featured: false,
      isNewToBooking: true
    },
    {
      id: 13,
      name: 'La Tiah Two',
      location: 'La Tiah Musgrave',
      locationType: 'musgrave-la',
      sleeps: '2 Guests',
      bed: 'Full Bed',
      size: '25 m²',
      price: '513.16',
      rating: 5.8,
      reviews: 6,
      distance: '2.2 km from downtown',
      beachDistance: '4.6 km from beach',
      description: 'Comfortable Accommodations: La Tiah Two offers a guest house experience with free WiFi and a shared kitchen.',
      image: 'assets/images/La Tiah Two, Durban/1.jpg',
      amenities: ['Free parking', 'Free Wifi', 'Shared kitchen', 'Daily housekeeping', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker'],
      type: 'double',
      popular: false,
      new: true,
      featured: false,
      isNewToBooking: true
    },
    {
      id: 14,
      name: 'La Tiah Three',
      location: 'La Tiah Musgrave',
      locationType: 'musgrave-la',
      sleeps: '2 Guests',
      bed: 'Queen Bed',
      size: '16 m²',
      price: '553',
      rating: null,
      reviews: 0,
      distance: '2.5 km from downtown',
      beachDistance: '4.6 km from beach',
      description: 'Comfortable Accommodations: La Tiah Three offers a guest house experience with free WiFi and free on-site private parking.',
      image: 'assets/images/La Tiah Three, Durban/1.jpg',
      amenities: ['Free parking', 'Free Wifi', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker', 'Refrigerator', 'Electric kettle'],
      type: 'double',
      popular: false,
      new: true,
      featured: false
    },
    {
      id: 15,
      name: 'La Tiah Four',
      location: 'La Tiah Musgrave',
      locationType: 'musgrave-la',
      sleeps: '2 Guests',
      bed: 'King Bed',
      size: '20 m²',
      price: '485',
      rating: 9.5,
      reviews: 2,
      distance: '2.5 km from downtown',
      beachDistance: '4.6 km from beach',
      description: 'Comfortable Accommodations: La Tiah Four offers a guest house experience with free WiFi and free on-site private parking.',
      image: 'assets/images/La Tiah Four, Durban/1.jpg',
      amenities: ['Free parking', 'Free Wifi', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker', 'Refrigerator', 'Electric kettle'],
      type: 'double',
      popular: true,
      new: true,
      featured: true
    },
    // ==================== HALFORD BACKPACKERS ====================
    {
      id: 2,
      name: 'Halford Backpackers',
      location: 'Halford Backpackers',
      locationType: 'halford',
      sleeps: '4 Guests',
      bed: 'Bunk Beds',
      size: '20 m²',
      price: '450',
      rating: null,
      reviews: 0,
      distance: '2.3 km from downtown',
      beachDistance: '800 m from beach',
      description: 'Comfortable Accommodations: Halford Backpackers offers a hostel experience with free WiFi and a shared kitchen.',
      image: 'assets/images/Halford Backpackers, Durban/6.jpg',
      amenities: ['Free Wifi', 'Pet Friendly', 'Shower', 'Shared Kitchen', 'Work Desk', 'Microwave', 'Electric Kettle'],
      type: 'single',
      popular: true,
      new: false,
      featured: false
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Get the room ID from the query parameters
    this.route.queryParams.subscribe(params => {
      this.roomId = params['roomId'] || null;
      if (this.roomId) {
        this.loadRoomData(this.roomId);
      } else {
        // If no room ID, reset selected room
        this.selectedRoom = null;
      }
    });
  }

  loadRoomData(roomId: string) {
    const id = parseInt(roomId, 10);
    const room = this.allRooms.find(r => r.id === id);
    if (room) {
      this.selectedRoom = room;
      
      // AUTO-FILL Location
      if (room.locationType === 'oceanic') {
        this.bookingData.location = 'oceanic';
      } else if (room.locationType === 'musgrave') {
        this.bookingData.location = 'musgrave';
      } else if (room.locationType === 'musgrave-la') {
        this.bookingData.location = 'musgrave-la';
      } else if (room.locationType === 'halford') {
        this.bookingData.location = 'halford';
      }
      
      // AUTO-FILL Room Type
      if (room.type) {
        this.bookingData.roomType = room.type;
      }
      
      // AUTO-FILL Guests based on room capacity
      if (room.sleeps) {
        const guestMatch = room.sleeps.match(/(\d+)/);
        if (guestMatch) {
          this.bookingData.guests = guestMatch[1];
        }
      }
    }
  }

  // Navigation functions
  goToHome() {
    this.router.navigate(['/home']);
  }

  // Change room - navigate back to rooms page
  changeRoom() {
    this.router.navigate(['/rooms']);
  }

  // Open WhatsApp - UPDATED NUMBER
  openWhatsApp() {
    const phone = '27849009821';
    const message = 'Hello STAY@TIAH, I would like to make a booking enquiry.';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  }

  // Submit booking form - UPDATED NUMBER
  submitBooking() {
    // Reset errors
    this.firstNameError = false;
    this.lastNameError = false;
    this.emailError = false;
    this.phoneError = false;
    this.checkInError = false;
    this.checkOutError = false;

    // Validate First Name
    if (!this.bookingData.firstName || this.bookingData.firstName.trim() === '') {
      this.firstNameError = true;
      return;
    }

    // Validate Last Name
    if (!this.bookingData.lastName || this.bookingData.lastName.trim() === '') {
      this.lastNameError = true;
      return;
    }

    // Validate Email
    if (!this.bookingData.email || this.bookingData.email.trim() === '') {
      this.emailError = true;
      return;
    }

    // Validate Email Format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.bookingData.email)) {
      this.emailError = true;
      return;
    }

    // Validate Phone
    if (!this.bookingData.phone || this.bookingData.phone.trim() === '') {
      this.phoneError = true;
      return;
    }

    // Validate Check-in
    if (!this.bookingData.checkIn) {
      this.checkInError = true;
      return;
    }

    // Validate Check-out
    if (!this.bookingData.checkOut) {
      this.checkOutError = true;
      return;
    }

    // Validate Guests
    if (!this.bookingData.guests) {
      return;
    }

    // Validate Location
    if (!this.bookingData.location) {
      return;
    }

    // Validate Room Type
    if (!this.bookingData.roomType) {
      return;
    }

    this.isSubmitting = true;

    // Format dates
    const checkInDate = this.bookingData.checkIn ? new Date(this.bookingData.checkIn).toLocaleDateString('en-ZA') : 'Not specified';
    const checkOutDate = this.bookingData.checkOut ? new Date(this.bookingData.checkOut).toLocaleDateString('en-ZA') : 'Not specified';

    // Prepare WhatsApp message with room details
    let message = 
      `🏨 *New Booking Enquiry - STAY@TIAH*%0A%0A` +
      `👤 *Guest Name:* ${this.bookingData.firstName} ${this.bookingData.lastName}%0A` +
      `📧 *Email:* ${this.bookingData.email}%0A` +
      `📱 *Phone:* ${this.bookingData.phone}%0A` +
      `📅 *Check-in:* ${checkInDate}%0A` +
      `📅 *Check-out:* ${checkOutDate}%0A` +
      `👥 *Guests:* ${this.bookingData.guests}%0A` +
      `📍 *Location:* ${this.getLocationName(this.bookingData.location)}%0A` +
      `🛏 *Room Type:* ${this.getRoomTypeName(this.bookingData.roomType)}%0A`;

    // Add selected room details if available
    if (this.selectedRoom) {
      message += `🛏 *Selected Room:* ${this.selectedRoom.name}%0A`;
      message += `💰 *Price:* R${this.selectedRoom.price} / night%0A`;
    }

    message += `📝 *Special Requests:* ${this.bookingData.specialRequests || 'None'}`;

    // UPDATED PHONE NUMBER
    const phone = '27849009821';
    
    // Open WhatsApp
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    
    // Reset form after submission
    setTimeout(() => {
      this.bookingData = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        guests: '',
        location: '',
        roomType: '',
        specialRequests: ''
      };
      this.firstNameError = false;
      this.lastNameError = false;
      this.emailError = false;
      this.phoneError = false;
      this.checkInError = false;
      this.checkOutError = false;
      this.isSubmitting = false;
    }, 1000);
  }

  // Helper functions to get display names
  getLocationName(value: string): string {
    const locations: { [key: string]: string } = {
      'oceanic': 'Durban Oceanic (82A, 82B, 117)',
      'musgrave': 'Tiah Musgrave',
      'musgrave-la': 'La Tiah Musgrave',
      'halford': 'Halford Backpackers'
    };
    return locations[value] || value;
  }

  getRoomTypeName(value: string): string {
    const roomTypes: { [key: string]: string } = {
      'single': 'Single Room',
      'double': 'Double Room',
      'family': 'Family Room',
      'suite': 'Suite',
      'dormitory': 'Dormitory (Backpackers)'
    };
    return roomTypes[value] || value;
  }
}