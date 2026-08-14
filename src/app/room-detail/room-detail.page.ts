import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.page.html',
  styleUrls: ['./room-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RoomDetailPage implements OnInit {

  room: any = null;
  roomId: string | null = null;
  checkIn: string = '';
  checkOut: string = '';
  showModal: boolean = false;
  currentImageIndex: number = 0;
  selectedRoomType: any = null;

  // ==========================================
  // AVAILABILITY CHECK PROPERTIES
  // ==========================================
  minDate: string = new Date().toISOString();
  availabilityChecked: boolean = false;
  isAvailable: boolean = false;
  availabilityMessage: string = '';
  nightsCount: number = 0;

  // WhatsApp number
  private readonly whatsappNumber: string = '27849009821';

  // All rooms data - Eleven Rooms with Gallery Images
  allRooms: any[] = [
    // ==================== ROOM 1: DURBAN OCEANIC ROOM 82A ====================
    {
      id: 1,
      name: 'Durban Oceanic Room 82A',
      location: 'Durban Oceanic',
      address: '20 John Mcintyre Road 82A, 4001 Durban, South Africa',
      sleeps: '2 Guests',
      bed: 'Queen Bed',
      size: '30 m²',
      price: '1,200',
      rating: 6.7,
      reviews: 37,
      heroImage: 'assets/images/Durban Oceanic Room 82A/1.jpg',
      image: 'assets/images/Durban Oceanic Room 82A/1.jpg',
      galleryImages: [
        'assets/images/Durban Oceanic Room 82A/1.jpg',
        'assets/images/Durban Oceanic Room 82A/2.jpg',
        'assets/images/Durban Oceanic Room 82A/3.jpg',
        'assets/images/Durban Oceanic Room 82A/4.jpg',
        'assets/images/Durban Oceanic Room 82A/5.jpg',
        'assets/images/Durban Oceanic Room 82A/6.jpg'
      ],
      description: 'Comfortable Living Space: Durban Oceanic Room 82A offers a spacious apartment in Durban.',
      longDescription: `Comfortable Living Space: Durban Oceanic Room 82A offers a spacious apartment in Durban. The property features one bedroom and one bathroom, ensuring a comfortable stay.

Modern Amenities: Guests enjoy a terrace, free WiFi, and free on-site private parking. Additional amenities include a hot tub, streaming services, and a work desk.

Prime Location: Snake Park Beach is a 3-minute walk away, while Durban ICC lies 1.1 mi from the apartment. King Shaka International Airport is 19 mi distant.`,
      amenities: ['Swimming pool', 'Free parking', 'Free Wifi', 'Terrace', 'Hot tub', 'Flat-screen TV', 'Shower', 'View'],
      additionalAmenities: [
        'Kitchen: Electric kettle, Microwave, Refrigerator',
        'Bedroom: Linens, Wardrobe or closet',
        'Bathroom: Toilet paper, Towels, Bath or shower, Toilet, Shower',
        'Living Area: Desk',
        'Media & Technology: Streaming service, Flat-screen TV, TV',
        'Room amenities: Socket near the bed, Tile/Marble floor, Private entrance, Fan, Ironing facilities, Iron, Hot tub'
      ],
      houseRules: [
        'Check-in: From 2:00 PM to 7:00 PM',
        'Check-out: From 8:00 AM to 10:00 AM',
        'Children of all ages are welcome',
        'No smoking allowed',
        'Parties/events are not allowed',
        'Quiet hours: 10:00 PM to 10:00 AM',
        'Pets are not allowed'
      ],
      nearbyAttractions: [
        { name: 'Snake Park Beach', distance: '250 m' },
        { name: 'Bay of Plenty Beach', distance: '350 m' },
        { name: 'North Beach', distance: '650 m' },
        { name: 'Durban ICC', distance: '1.1 mi' },
        { name: 'Kingsmead Stadium', distance: '1.5 km' },
        { name: 'uShaka Marine World', distance: '2 km' },
        { name: 'King Shaka International Airport', distance: '30 km' }
      ],
      popular: true,
      new: false,
      featured: true,
      showPerNight: true,
      roomTypes: [
        { 
          name: 'One-Bedroom Apartment', 
          beds: '1 queen bed', 
          sleeps: '2 adults', 
          price: '1,200',
          priceDisplay: 'ZAR 1,200',
          priceLabel: 'per night',
          amenities: ['Private kitchenette', 'Private pool', 'Air conditioning', 'Flat-screen TV', 'Free Wifi'],
          cancellation: 'Non-refundable',
          payment: 'Pay online',
          flexible: true
        }
      ]
    },
    // ==================== ROOM 2: DURBAN OCEANIC APARTMENT 82B ====================
    {
      id: 11,
      name: 'Durban Oceanic Apartment 82B',
      location: 'Durban Oceanic',
      address: '20 John Mcintyre Road 82B, 4001 Durban, South Africa',
      sleeps: '2 Guests',
      bed: 'Full Bed',
      size: '30 m²',
      price: '896',
      rating: 8.4,
      reviews: 62,
      heroImage: 'assets/images/Durban Oceanic Apartment 82B/1.jpg',
      image: 'assets/images/Durban Oceanic Apartment 82B/1.jpg',
      galleryImages: [
        'assets/images/Durban Oceanic Apartment 82B/1.jpg',
        'assets/images/Durban Oceanic Apartment 82B/2.jpg',
        'assets/images/Durban Oceanic Apartment 82B/3.jpg',
        'assets/images/Durban Oceanic Apartment 82B/4.jpg',
        'assets/images/Durban Oceanic Apartment 82B/5.jpg',
        'assets/images/Durban Oceanic Apartment 82B/6.jpg'
      ],
      description: 'Essential Facilities: Durban Oceanic Apartment 82B offers a terrace, outdoor swimming pool, and free WiFi.',
      longDescription: `Essential Facilities: Durban Oceanic Apartment 82B offers a terrace, outdoor swimming pool, and free WiFi.

Comfortable Amenities: The apartment features a kitchenette, washing machine, and streaming services. Additional amenities include a dining table, refrigerator, microwave, TV, and private entrance.

Prime Location: Snake Park Beach is a 3-minute walk away, Durban ICC lies 1.1 mi nearby. King Shaka International Airport is 19 mi from the property.`,
      amenities: ['Outdoor swimming pool', 'Private Parking', 'Free Wifi', 'Terrace', 'Kitchen', 'Bath', 'Washing machine', 'Flat-screen TV'],
      additionalAmenities: [
        'Kitchen: Dining table, Stovetop, Oven, Dryer, Kitchenware, Electric kettle, Washing machine, Microwave, Refrigerator, Kitchenette',
        'Bedroom: Linens, Wardrobe or closet',
        'Bathroom: Toilet paper, Towels, Toilet, Bath',
        'Living Area: Sofa',
        'Media & Technology: Streaming service, Flat-screen TV, TV',
        'Outdoors: Outdoor furniture, Terrace',
        'Pool: Rooftop pool'
      ],
      houseRules: [
        'Check-in: From 2:00 PM to 7:00 PM',
        'Check-out: From 8:00 AM to 10:00 AM',
        'Children of all ages are welcome',
        'No smoking allowed',
        'Parties/events are not allowed',
        'Quiet hours: 10:00 PM to 10:00 AM',
        'Pets are not allowed'
      ],
      nearbyAttractions: [
        { name: 'Snake Park Beach', distance: '250 m' },
        { name: 'Bay of Plenty Beach', distance: '350 m' },
        { name: 'North Beach', distance: '650 m' },
        { name: 'Durban ICC', distance: '1.1 mi' },
        { name: 'Kingsmead Stadium', distance: '1.5 km' },
        { name: 'uShaka Marine World', distance: '2 km' },
        { name: 'King Shaka International Airport', distance: '30 km' }
      ],
      popular: true,
      new: true,
      featured: true,
      guestReviews: [
        { name: 'Nkosana', text: 'Almost everything you\'re the ever hotels I\'ve slept before thank keep it up ❤️' },
        { name: 'Nondumiso', text: 'It was a very beautiful room and also the fact that it\'s closer to the shops and the beach.' },
        { name: 'Mdingi', text: 'The room was very nice, clean and cosy.' }
      ],
      showPerNight: true,
      priceDisplayLabel: 'per night',
      roomTypes: [
        { 
          name: 'One-Bedroom Apartment (2 adults)', 
          beds: '1 full bed', 
          sleeps: '2 adults', 
          price: '896',
          priceDisplay: 'ZAR 896',
          priceLabel: 'per night',
          amenities: ['30 m²', 'Private kitchen', 'Landmark view', 'Rooftop pool', 'Bath', 'Flat-screen TV', 'Terrace', 'Free Wifi'],
          cancellation: 'Non-refundable',
          payment: 'Pay online',
          flexible: true,
          taxesIncluded: true,
          maxPeople: 2,
          nights: 1
        },
        { 
          name: 'One-Bedroom Apartment (2 adults) - Free Cancellation', 
          beds: '1 full bed', 
          sleeps: '2 adults', 
          price: '995',
          priceDisplay: 'ZAR 995',
          priceLabel: 'per night',
          amenities: ['30 m²', 'Private kitchen', 'Landmark view', 'Rooftop pool', 'Bath', 'Flat-screen TV', 'Terrace', 'Free Wifi'],
          cancellation: 'Free cancellation before October 5, 2026',
          payment: 'Pay nothing until October 3, 2026',
          flexible: true,
          taxesIncluded: true,
          maxPeople: 2,
          nights: 1
        },
        { 
          name: 'One-Bedroom Apartment (1 guest) - Non-refundable', 
          beds: '1 full bed', 
          sleeps: '1 adult', 
          price: '806',
          priceDisplay: 'ZAR 806',
          priceLabel: 'per night',
          amenities: ['30 m²', 'Private kitchen', 'Landmark view', 'Rooftop pool', 'Bath', 'Flat-screen TV', 'Terrace', 'Free Wifi'],
          cancellation: 'Non-refundable',
          payment: 'Pay online',
          flexible: true,
          taxesIncluded: true,
          maxPeople: 1,
          onlyForOneGuest: true,
          nights: 1
        }
      ]
    },
    // ==================== ROOM 3: DURBAN OCEANIC APARTMENT 117 ====================
    {
      id: 12,
      name: 'Durban Oceanic Apartment 117',
      location: 'Durban Oceanic',
      address: '20 John Mcintyre Road Apartment 117, 4001 Durban, South Africa',
      sleeps: '2 Guests',
      bed: '1 Full Bed',
      size: '30 m²',
      price: '896',
      rating: 8.6,
      reviews: 15,
      heroImage: 'assets/images/Durban Oceanic Apartment 117/1.jpg',
      image: 'assets/images/Durban Oceanic Apartment 117/1.jpg',
      galleryImages: [
        'assets/images/Durban Oceanic Apartment 117/1.jpg',
        'assets/images/Durban Oceanic Apartment 117/2.jpg',
        'assets/images/Durban Oceanic Apartment 117/3.jpg',
        'assets/images/Durban Oceanic Apartment 117/4.jpg',
        'assets/images/Durban Oceanic Apartment 117/5.jpg',
        'assets/images/Durban Oceanic Apartment 117/6.jpg'
      ],
      description: 'Comfortable Living Space: Durban Oceanic Apartment 117 offers a one-bedroom apartment with a private pool.',
      longDescription: `Comfortable Living Space: Durban Oceanic Apartment 117 offers a one-bedroom apartment with a private pool. The apartment includes air-conditioning, a kitchenette, washing machine, and TV.

Essential Facilities: Guests enjoy free WiFi and free on-site private parking.

Local Attractions: Snake Park Beach is a 3-minute walk away, Durban ICC lies 1.2 mi nearby. King Shaka International Airport is 19 mi from the property.`,
      amenities: ['Swimming pool', 'Free parking', 'Free Wifi', 'Air conditioning', 'Private pool', 'Kitchenette', 'Washing machine', 'Flat-screen TV'],
      additionalAmenities: [
        'Kitchen: Washing machine, Kitchenette',
        'Media & Technology: Flat-screen TV',
        'Outdoors: Private pool, Swimming pool',
        'Front Desk Services: Invoice provided',
        'Miscellaneous: Air conditioning, Smoke-free property'
      ],
      houseRules: [
        'Check-in: From 2:00 PM to 7:00 PM',
        'Check-out: From 8:00 AM to 10:00 AM',
        'Children of all ages are welcome',
        'Children 18 and above will be charged as adults',
        'No smoking allowed',
        'Parties/events are not allowed',
        'Quiet hours: 10:00 PM to 10:00 AM',
        'Pets are not allowed'
      ],
      nearbyAttractions: [
        { name: 'Snake Park Beach', distance: '250 m' },
        { name: 'Bay of Plenty Beach', distance: '350 m' },
        { name: 'North Beach', distance: '650 m' },
        { name: 'Durban ICC', distance: '1.2 mi' },
        { name: 'Kingsmead Stadium', distance: '1.5 km' },
        { name: 'uShaka Marine World', distance: '2 km' },
        { name: 'King Shaka International Airport', distance: '30 km' }
      ],
      popular: true,
      new: true,
      featured: true,
      guestReviews: [
        { name: 'Jacqueline', text: 'Perfect apartment for a party of one with everything you might need for a comfortable stay.' },
        { name: 'Mthokozisi', text: 'The property offered excellent value for money.' },
        { name: 'Thembela', text: 'The fact that it was close to the beach, walking distance to Moses Mabhida.' }
      ],
      showPerNight: true,
      priceDisplayLabel: 'per night',
      roomTypes: [
        { 
          name: 'One-Bedroom Apartment (2 adults)', 
          beds: '1 full bed', 
          sleeps: '2 adults', 
          price: '896',
          priceDisplay: 'ZAR 896',
          priceLabel: 'per night',
          amenities: ['30 m²', 'Private kitchenette', 'Private pool', 'Air conditioning', 'Flat-screen TV', 'Free Wifi'],
          cancellation: 'Non-refundable',
          payment: 'Pay online',
          flexible: true,
          taxesIncluded: true,
          maxPeople: 2,
          nights: 1
        },
        { 
          name: 'One-Bedroom Apartment (2 adults) - Free Cancellation', 
          beds: '1 full bed', 
          sleeps: '2 adults', 
          price: '995',
          priceDisplay: 'ZAR 995',
          priceLabel: 'per night',
          amenities: ['30 m²', 'Private kitchenette', 'Private pool', 'Air conditioning', 'Flat-screen TV', 'Free Wifi'],
          cancellation: 'Free cancellation before October 5, 2026',
          payment: 'Pay nothing until October 3, 2026',
          flexible: true,
          taxesIncluded: true,
          maxPeople: 2,
          nights: 1
        }
      ]
    },
    // ==================== ROOM 4: TIAH WHYTE ====================
    {
      id: 19,
      name: 'Tiah Whyte',
      location: 'Tiah Musgrave',
      address: '57 Vause Road, Musgrave, 4001 Durban, South Africa',
      sleeps: '2 Guests',
      bed: 'Queen Bed',
      size: '24 m²',
      price: '855',
      rating: 8.8,
      reviews: 57,
      heroImage: 'assets/images/Tiah Whyte, Durban/1.jpg',
      image: 'assets/images/Tiah Whyte, Durban/1.jpg',
      galleryImages: [
        'assets/images/Tiah Whyte, Durban/1.jpg',
        'assets/images/Tiah Whyte, Durban/2.jpg',
        'assets/images/Tiah Whyte, Durban/3.jpg',
        'assets/images/Tiah Whyte, Durban/4.jpg',
        'assets/images/Tiah Whyte, Durban/5.jpg',
        'assets/images/Tiah Whyte, Durban/6.jpg'
      ],
      description: 'Comfortable Accommodations: Tiah Whyte offers a guest house with free WiFi and free on-site private parking.',
      longDescription: `Comfortable Accommodations: Tiah Whyte in Durban offers a guest house with free WiFi and free on-site private parking. Each room features air-conditioning, a private bathroom, and a work desk.

Modern Amenities: Guests can enjoy streaming services, a dining table, and a sofa bed. Additional amenities include a tea and coffee maker, refrigerator, microwave, and TV.

Convenient Location: Located on Vause Road, the property is a 13-minute walk from Westridge Park Tennis Stadium. Nearby attractions include Durban Botanic Gardens (1.9 mi) and Durban ICC (2.5 mi). King Shaka International Airport is 24 mi away.

Couples in particular like the location – they rated it 9.2 for a two-person trip.`,
      amenities: ['Free parking', 'Non-smoking rooms', 'Free Wifi', 'Air conditioning', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker'],
      additionalAmenities: [
        'Bathroom: Toilet paper, Towels, Bath or shower, Private bathroom, Toilet, Shower',
        'Bedroom: Linens, Wardrobe or closet',
        'Kitchen: Dining table, Electric kettle, Microwave, Refrigerator',
        'Room amenities: Socket near the bed, Sofa bed, Tile/Marble floor, Private entrance, Ironing facilities, Iron',
        'Living Area: Sofa, Seating area, Desk',
        'Media & Technology: Streaming service (like Netflix), Flat-screen TV, TV',
        'Food & Drink: Tea/Coffee maker',
        'Outdoors: Patio',
        'Parking: Free private parking is available on site',
        'Accessibility: Entire unit located on ground floor',
        'General: Air conditioning, Smoke-free property, Non-smoking rooms',
        'Languages Spoken: English'
      ],
      houseRules: [
        'Check-in: From 2:00 PM to 7:00 PM',
        'Check-out: From 8:00 AM to 10:00 AM',
        'Children of all ages are welcome',
        'No smoking allowed',
        'Parties/events are not allowed',
        'Quiet hours: 10:00 PM to 10:00 AM',
        'Pets are not allowed'
      ],
      nearbyAttractions: [
        { name: 'Killie Campbell Museum', distance: '2 km' },
        { name: 'Durban Botanic Gardens', distance: '2.7 km' },
        { name: 'Maydon Wharf Sugar Terminal', distance: '3.3 km' },
        { name: 'Cato Manor Heritage Centre', distance: '3.3 km' },
        { name: 'Kwa Muhle Museum', distance: '3.7 km' },
        { name: 'Francis Farewell Square', distance: '3.7 km' },
        { name: 'King Shaka International Airport', distance: '34 km' }
      ],
      popular: true,
      new: true,
      featured: true,
      guestReviews: [
        { name: 'Ntombifikile', text: 'Woow property was very clean and quiet, the location easy to found, the lady who working there she was very nice person woow I give 100 of 💯' },
        { name: 'Motlalepula', text: 'Everything was well organised. The room was clean and the staff were very friendly' },
        { name: 'Nkosiyazi', text: 'The place is what we were looking for, location perfect, cleanness' },
        { name: 'Thobani', text: 'I liked everything about the room, the security, cleanliness, staff. I will still come back and book again' },
        { name: 'Beki', text: 'The rooms had all needed amenities, and the lady caretaker ensured that all my needs were catered for.' },
        { name: 'Ayanda', text: 'Peace no one bothered me I had so much peace and when I needed to take an interview the owner accommodated me' }
      ],
      showPerNight: true,
      roomTypes: [
        { 
          name: 'Superior Queen Room', 
          beds: '1 queen bed', 
          sleeps: '2 adults', 
          price: '855',
          priceDisplay: 'ZAR 855',
          priceLabel: 'per night',
          amenities: ['Air conditioning', 'Private bathroom', 'Flat-screen TV', 'Free Wifi', 'Tea/Coffee maker'],
          cancellation: 'Free cancellation',
          payment: 'Pay at property',
          available: 1
        }
      ]
    },
    // ==================== ROOM 5: TIAH GREY ====================
    {
      id: 17,
      name: 'Tiah Grey',
      location: 'Tiah Musgrave',
      address: '57 Vause Road, Musgrave, 4001 Durban, South Africa',
      sleeps: '2 Guests',
      bed: 'Queen Bed',
      size: '20 m²',
      price: '675',
      rating: 8.2,
      reviews: 45,
      heroImage: 'assets/images/Tiah Grey, Durban/6.jpg',
      image: 'assets/images/Tiah Grey, Durban/1.jpg',
      galleryImages: [
        'assets/images/Tiah Grey, Durban/1.jpg',
        'assets/images/Tiah Grey, Durban/2.jpg',
        'assets/images/Tiah Grey, Durban/3.jpg',
        'assets/images/Tiah Grey, Durban/4.jpg',
        'assets/images/Tiah Grey, Durban/5.jpg',
        'assets/images/Tiah Grey, Durban/6.jpg'
      ],
      description: 'Comfortable Accommodations: Tiah Grey offers a homestay experience in Durban, South Africa.',
      longDescription: `Comfortable Accommodations: Tiah Grey, Durban offers a homestay experience in Durban, South Africa. The property features air-conditioning, a kitchenette, and a private bathroom. Guests can enjoy an inner courtyard view and a ground-floor unit.

Modern Amenities: The homestay includes a tea and coffee maker, refrigerator, microwave, oven, stovetop, and a work desk. Additional amenities include a dining table, seating area, TV, and free on-site private parking.

Local Attractions: Westridge Park Tennis Stadium is a 13-minute walk away. Durban Botanic Gardens are 1.9 mi from the property, while Durban ICC lies 2.5 mi distant. King Shaka International Airport is 24 mi away. Highly rated by guests.

Couples in particular like the location – they rated it 8.5 for a two-person trip.`,
      amenities: ['Free parking', 'Non-smoking rooms', 'Air conditioning', 'Kitchenette', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker'],
      additionalAmenities: [
        'Bathroom: Toilet paper, Towels, Private bathroom, Toilet, Shower',
        'Bedroom: Linens, Wardrobe or closet',
        'Kitchen: Dining table, Cleaning products, Stovetop, Oven, Kitchenware, Electric kettle, Microwave, Refrigerator, Kitchenette',
        'Room amenities: Socket near the bed, Tile/Marble floor, Private entrance, Fan, Ironing facilities, Iron',
        'Living Area: Sofa, Seating area, Desk',
        'Media & Technology: Flat-screen TV, TV',
        'Food & Drink: Tea/Coffee maker',
        'Parking: Free private parking is available on site',
        'Accessibility: Entire unit wheelchair accessible, Entire unit located on ground floor',
        'General: Air conditioning, Smoke-free property, Non-smoking rooms'
      ],
      houseRules: [
        'Check-in: From 2:00 PM to 7:00 PM',
        'Check-out: From 8:00 AM to 10:00 AM',
        'Children of all ages are welcome',
        'No smoking allowed',
        'Parties/events are not allowed',
        'Quiet hours: 10:00 PM to 10:00 AM',
        'Pets are not allowed'
      ],
      nearbyAttractions: [
        { name: 'Killie Campbell Museum', distance: '2 km' },
        { name: 'Durban Botanic Gardens', distance: '2.7 km' },
        { name: 'Maydon Wharf Sugar Terminal', distance: '3.3 km' },
        { name: 'Cato Manor Heritage Centre', distance: '3.3 km' },
        { name: 'Kwa Muhle Museum', distance: '3.7 km' },
        { name: 'Francis Farewell Square', distance: '3.7 km' },
        { name: 'King Shaka International Airport', distance: '34 km' }
      ],
      popular: true,
      new: true,
      featured: true,
      guestReviews: [
        { name: 'Mhlongo', text: 'Friendy staff and great value for money, the room were exceptional' },
        { name: 'Bronwyn', text: 'The area felt safe. Close to where we needed to be. Linen was crisp and clean.' },
        { name: 'Siyanda', text: 'The lady at the reception is very friendly the apartment is very neat and clean, everything was just fine' }
      ],
      showPerNight: true,
      roomTypes: [
        { 
          name: 'Queen Room', 
          beds: '1 queen bed', 
          sleeps: '2 adults', 
          price: '675',
          priceDisplay: 'ZAR 675',
          priceLabel: 'per night',
          amenities: ['Air conditioning', 'Kitchenette', 'Private bathroom', 'Flat-screen TV', 'Free parking'],
          cancellation: 'Free cancellation',
          payment: 'Pay at property',
          available: 1
        }
      ]
    },
    // ==================== ROOM 6: TIAH PASTEL ====================
    {
      id: 18,
      name: 'Tiah Pastel',
      location: 'Tiah Musgrave',
      address: '57 Vause Road, Musgrave, 4001 Durban, South Africa',
      sleeps: '2 Guests',
      bed: 'Queen Bed',
      size: '20 m²',
      price: '675',
      rating: 7.8,
      reviews: 30,
      heroImage: 'assets/images/Tiah Pastel, Durban/1.jpg',
      image: 'assets/images/Tiah Pastel, Durban/1.jpg',
      galleryImages: [
        'assets/images/Tiah Pastel, Durban/1.jpg',
        'assets/images/Tiah Pastel, Durban/3.jpg',
        'assets/images/Tiah Pastel, Durban/8.jpg',
        'assets/images/Tiah Pastel, Durban/9.jpg',
        'assets/images/Tiah Pastel, Durban/10.jpg'
      ],
      description: 'Comfortable Accommodations: Tiah Pastel offers a guest house with air-conditioning, a kitchenette, and a private bathroom.',
      longDescription: `Comfortable Accommodations: Tiah Pastel in Durban offers a guest house with air-conditioning, a kitchenette, and a private bathroom. Each ground-floor unit features a sofa bed, work desk, and a private entrance.

Modern Amenities: Guests can enjoy a tea and coffee maker, refrigerator, microwave, oven, stovetop, electric kettle, kitchenware, and a TV. The property includes free on-site private parking and tiled floors.

Convenient Location: Located 2.3 km from downtown, the guest house is a 13-minute walk from Westridge Park Tennis Stadium. Nearby attractions include Durban Botanic Gardens (1.9 mi) and uShaka Marine World (4.3 mi).`,
      amenities: ['Free parking', 'Air conditioning', 'Kitchenette', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker'],
      additionalAmenities: [
        'Bathroom: Toilet paper, Towels, Private bathroom, Toilet, Shower',
        'Bedroom: Linens, Wardrobe or closet',
        'Kitchen: Cleaning products, Stovetop, Oven, Kitchenware, Electric kettle, Microwave, Refrigerator, Kitchenette',
        'Living Area: Sofa, Desk',
        'Media & Technology: Flat-screen TV, TV',
        'Food & Drink: Tea/Coffee maker',
        'Parking: Free private parking is available on site'
      ],
      houseRules: [
        'Check-in: From 2:00 PM to 7:00 PM',
        'Check-out: From 8:00 AM to 10:00 AM',
        'Children of all ages are welcome',
        'No smoking allowed',
        'Parties/events are not allowed',
        'Quiet hours: 10:00 PM to 10:00 AM',
        'Pets are not allowed'
      ],
      nearbyAttractions: [
        { name: 'Killie Campbell Museum', distance: '2 km' },
        { name: 'Durban Botanic Gardens', distance: '2.7 km' },
        { name: 'King Shaka International Airport', distance: '34 km' }
      ],
      popular: true,
      new: true,
      featured: true,
      guestReviews: [
        { name: 'Janna', text: 'Peaceful, very clean. Near everything. Loved it, will be visiting soon' },
        { name: 'Isanda', text: 'we had an excellent experience during our weekly stay at this accommodation.' }
      ],
      showPerNight: true,
      roomTypes: [
        { 
          name: 'Standard Queen Room', 
          beds: '1 queen bed', 
          sleeps: '2 adults', 
          price: '675',
          priceDisplay: 'ZAR 675',
          priceLabel: 'per night',
          amenities: ['Air conditioning', 'Kitchenette', 'Private bathroom', 'Free parking'],
          cancellation: 'Free cancellation',
          payment: 'Pay at property',
          available: 1
        }
      ]
    },
    // ==================== ROOM 7: LA TIAH ONE ====================
    {
      id: 16,
      name: 'La Tiah One',
      location: 'La Tiah Musgrave',
      address: '31 Blackhurst Avenue, 4001 Durban, South Africa',
      sleeps: '2 Guests',
      bed: 'Full Bed + Queen Bed',
      size: '20 m²',
      price: '553',
      rating: null,
      reviews: 0,
      heroImage: 'assets/images/La Tiah One, Durban/5.jpg',
      image: 'assets/images/La Tiah One, Durban/1.jpg',
      galleryImages: [
        'assets/images/La Tiah One, Durban/1.jpg',
        'assets/images/La Tiah One, Durban/2.jpg',
        'assets/images/La Tiah One, Durban/4.jpg',
        'assets/images/La Tiah One, Durban/5.jpg'
      ],
      description: 'Comfortable Accommodations: La Tiah One offers a guest house experience with free WiFi and free on-site private parking.',
      longDescription: `Comfortable Accommodations: La Tiah One offers a guest house experience with free WiFi and free on-site private parking. Each room includes a private bathroom, tea and coffee maker, refrigerator, shower, TV, electric kettle, and wardrobe.

Convenient Location: Located 2.2 km from downtown Durban, the property is close to attractions such as Durban Botanic Gardens (1.8 mi), Durban ICC (2.4 mi), and Westridge Park Tennis Stadium (12-minute walk).`,
      amenities: ['Free parking', 'Free Wifi', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker', 'Refrigerator', 'Electric kettle'],
      additionalAmenities: [
        'Bathroom: Toilet paper, Towels, Private bathroom, Toilet, Shower',
        'Bedroom: Linens, Wardrobe or closet',
        'Kitchen: Electric kettle, Refrigerator',
        'Media & Technology: Flat-screen TV',
        'Food & Drink: Tea/Coffee maker',
        'Parking: Free private parking is available on site'
      ],
      houseRules: [
        'Check-in: From 2:00 PM to 7:00 PM',
        'Check-out: From 8:00 AM to 10:00 AM',
        'Children of all ages are welcome',
        'Children 18 and above will be charged as adults',
        'No smoking allowed',
        'Parties/events are not allowed',
        'Quiet hours: 10:00 PM to 10:00 AM',
        'Pets are not allowed'
      ],
      nearbyAttractions: [
        { name: 'Killie Campbell Museum', distance: '2.3 km' },
        { name: 'Durban Botanic Gardens', distance: '2.8 km' },
        { name: 'Francis Farewell Square', distance: '3.5 km' },
        { name: 'King Shaka International Airport', distance: '34 km' }
      ],
      popular: false,
      new: true,
      featured: false,
      showPerNight: true,
      isNewToBooking: true,
      roomTypes: [
        { 
          name: 'Queen Room', 
          beds: '1 full bed + 1 queen bed', 
          sleeps: '2 adults', 
          price: '553',
          priceDisplay: 'ZAR 553',
          priceLabel: 'per night',
          amenities: ['Free Wifi', 'Private bathroom', 'Flat-screen TV', 'Free parking'],
          cancellation: 'Free cancellation',
          payment: 'Pay at property',
          available: 1,
          taxesIncluded: true
        }
      ]
    },
    // ==================== ROOM 8: LA TIAH TWO ====================
    {
      id: 13,
      name: 'La Tiah Two',
      location: 'La Tiah Musgrave',
      address: '31 Blackhurst Ave, 4001 Durban, South Africa',
      sleeps: '2 Guests',
      bed: 'Full Bed',
      size: '25 m²',
      price: '513.16',
      rating: 5.8,
      reviews: 6,
      heroImage: 'assets/images/La Tiah Two, Durban/10.jpg',
      image: 'assets/images/La Tiah Two, Durban/1.jpg',
      galleryImages: [
        'assets/images/La Tiah Two, Durban/1.jpg',
        'assets/images/La Tiah Two, Durban/2.jpg',
        'assets/images/La Tiah Two, Durban/3.jpg',
        'assets/images/La Tiah Two, Durban/4.jpg',
        'assets/images/La Tiah Two, Durban/5.jpg'
      ],
      description: 'Comfortable Accommodations: La Tiah Two offers a guest house experience with free WiFi and a shared kitchen.',
      longDescription: `Comfortable Accommodations: La Tiah Two offers a guest house experience with free WiFi, a shared kitchen, and daily housekeeping service. Free on-site private parking is available for guests.

Modern Amenities: Each room features a private bathroom with a walk-in shower, tea and coffee maker, refrigerator, work desk, free toiletries, microwave, electric kettle, and TV.

Prime Location: Westridge Park Tennis Stadium is a 12-minute walk away. Nearby attractions include Durban Botanic Gardens (1.8 mi), Durban ICC (2.4 mi), and uShaka Marine World (3.7 mi).`,
      amenities: ['Free parking', 'Free Wifi', 'Shared kitchen', 'Daily housekeeping', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker'],
      additionalAmenities: [
        'Bathroom: Toilet paper, Towels, Private bathroom, Toilet, Free toiletries, Shower',
        'Bedroom: Linens',
        'Kitchen: Shared kitchen, Electric kettle, Microwave, Refrigerator',
        'Living Area: Desk',
        'Media & Technology: Flat-screen TV, TV',
        'Food & Drink: Tea/Coffee maker',
        'Parking: Free private parking is available on site'
      ],
      houseRules: [
        'Check-in: From 2:00 PM to 7:00 PM',
        'Check-out: From 8:00 AM to 10:00 AM',
        'Children of all ages are welcome',
        'Children 18 and above will be charged as adults',
        'No smoking allowed',
        'Parties/events are not allowed',
        'Quiet hours: 10:00 PM to 10:00 AM',
        'Pets are not allowed'
      ],
      nearbyAttractions: [
        { name: 'Killie Campbell Museum', distance: '2.3 km' },
        { name: 'Durban Botanic Gardens', distance: '2.8 km' },
        { name: 'King Shaka International Airport', distance: '34 km' }
      ],
      popular: false,
      new: true,
      featured: false,
      showPerNight: true,
      isNewToBooking: true,
      isUnavailable: true,
      unavailableMessage: 'This property is unavailable on our site for your dates',
      availableDates: 'Oct 22 – Oct 23 (1 night)',
      roomTypes: [
        { 
          name: 'King Room', 
          beds: '1 full bed', 
          sleeps: '2 adults', 
          price: '513.16',
          priceDisplay: 'ZAR 513.16',
          priceLabel: 'per night',
          amenities: ['Free Wifi', 'Shared kitchen', 'Private bathroom', 'Free parking'],
          cancellation: 'Free cancellation',
          payment: 'Pay at property',
          available: true
        }
      ]
    },
    // ==================== ROOM 9: LA TIAH THREE ====================
    {
      id: 14,
      name: 'La Tiah Three',
      location: 'La Tiah Musgrave',
      address: '31 Blackhurst Avenue, 4001 Durban, South Africa',
      sleeps: '2 Guests',
      bed: 'Queen Bed',
      size: '16 m²',
      price: '553',
      rating: null,
      reviews: 0,
      heroImage: 'assets/images/La Tiah Three, Durban/7.jpg',
      image: 'assets/images/La Tiah Three, Durban/1.jpg',
      galleryImages: [
        'assets/images/La Tiah Three, Durban/1.jpg',
        'assets/images/La Tiah Three, Durban/2.jpg',
        'assets/images/La Tiah Three, Durban/3.jpg',
        'assets/images/La Tiah Three, Durban/4.jpg',
        'assets/images/La Tiah Three, Durban/5.jpg'
      ],
      description: 'Comfortable Accommodations: La Tiah Three offers a guest house experience with free WiFi and free on-site private parking.',
      longDescription: `Comfortable Accommodations: La Tiah Three offers a guest house experience with free WiFi and free on-site private parking. Each room includes a private bathroom, tea and coffee maker, refrigerator, shower, TV, electric kettle, and wardrobe.

Convenient Location: Located 2.5 km from downtown Durban, the property is close to attractions such as Durban Botanic Gardens, Durban ICC, and Westridge Park Tennis Stadium.`,
      amenities: ['Free parking', 'Free Wifi', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker', 'Refrigerator', 'Electric kettle'],
      additionalAmenities: [
        'Bathroom: Toilet paper, Towels, Private bathroom, Toilet, Shower',
        'Bedroom: Linens, Wardrobe or closet',
        'Kitchen: Electric kettle, Refrigerator',
        'Media & Technology: Flat-screen TV',
        'Food & Drink: Tea/Coffee maker',
        'Parking: Free private parking is available on site'
      ],
      houseRules: [
        'Check-in: From 2:00 PM to 7:00 PM',
        'Check-out: From 8:00 AM to 10:00 AM',
        'Children of all ages are welcome',
        'Children 18 and above will be charged as adults',
        'No smoking allowed',
        'Parties/events are not allowed',
        'Quiet hours: 10:00 PM to 10:00 AM',
        'Pets are not allowed'
      ],
      nearbyAttractions: [
        { name: 'Killie Campbell Museum', distance: '2.3 km' },
        { name: 'Durban Botanic Gardens', distance: '2.8 km' },
        { name: 'Francis Farewell Square', distance: '3.5 km' },
        { name: 'King Shaka International Airport', distance: '34 km' }
      ],
      popular: false,
      new: true,
      featured: false,
      showPerNight: true,
      roomTypes: [
        { 
          name: 'Standard Queen Room', 
          beds: '1 queen bed', 
          sleeps: '2 adults', 
          price: '553',
          priceDisplay: 'ZAR 553',
          priceLabel: 'per night',
          amenities: ['16 m²', 'Private bathroom', 'Flat-screen TV', 'Free Wifi'],
          cancellation: 'Free cancellation before October 23, 2026',
          payment: 'Pay nothing until October 21, 2026',
          flexible: true,
          taxesIncluded: true
        }
      ]
    },
    // ==================== ROOM 10: LA TIAH FOUR ====================
    {
      id: 15,
      name: 'La Tiah Four',
      location: 'La Tiah Musgrave',
      address: '31 Blackhurst Avenue, 4001 Durban, South Africa',
      sleeps: '2 Guests',
      bed: 'King Bed',
      size: '20 m²',
      price: '485',
      rating: 9.5,
      reviews: 2,
      heroImage: 'assets/images/La Tiah Four, Durban/1.jpg',
      image: 'assets/images/La Tiah Four, Durban/1.jpg',
      galleryImages: [
        'assets/images/La Tiah Four, Durban/1.jpg',
        'assets/images/La Tiah Four, Durban/2.jpg',
        'assets/images/La Tiah Four, Durban/3.jpg',
        'assets/images/La Tiah Four, Durban/4.jpg',
        'assets/images/La Tiah Four, Durban/5.jpg'
      ],
      description: 'Comfortable Accommodations: La Tiah Four offers a guest house experience with free WiFi and free on-site private parking.',
      longDescription: `Comfortable Accommodations: La Tiah Four offers a guest house experience with free WiFi and free on-site private parking. Each room includes a private bathroom, tea and coffee maker, refrigerator, shower, TV, electric kettle, and wardrobe.`,
      amenities: ['Free parking', 'Free Wifi', 'Private bathroom', 'Flat-screen TV', 'Tea/Coffee maker', 'Refrigerator', 'Electric kettle'],
      additionalAmenities: [
        'Bathroom: Toilet paper, Towels, Private bathroom, Toilet, Shower',
        'Bedroom: Linens, Wardrobe or closet',
        'Kitchen: Electric kettle, Refrigerator',
        'Media & Technology: Flat-screen TV',
        'Food & Drink: Tea/Coffee maker',
        'Parking: Free private parking is available on site'
      ],
      houseRules: [
        'Check-in: From 2:00 PM to 7:00 PM',
        'Check-out: From 8:00 AM to 10:00 AM',
        'Children of all ages are welcome',
        'Children 18 and above will be charged as adults',
        'No smoking allowed',
        'Parties/events are not allowed',
        'Quiet hours: 10:00 PM to 10:00 AM',
        'Pets are not allowed'
      ],
      nearbyAttractions: [
        { name: 'Killie Campbell Museum', distance: '2.3 km' },
        { name: 'Durban Botanic Gardens', distance: '2.8 km' },
        { name: 'King Shaka International Airport', distance: '34 km' }
      ],
      popular: true,
      new: true,
      featured: true,
      guestReviews: [
        { name: 'Guest 1', text: 'Excellent location – rated 10/10!' },
        { name: 'Guest 2', text: 'Exceptional stay with perfect facilities and cleanliness.' }
      ],
      showPerNight: true,
      roomTypes: [
        { 
          name: 'Standard King Room', 
          beds: '1 king bed', 
          sleeps: '2 adults', 
          price: '485',
          priceDisplay: 'ZAR 485',
          priceLabel: 'per night',
          amenities: ['Free Wifi', 'Private bathroom', 'Flat-screen TV', 'Free parking'],
          cancellation: 'Free cancellation',
          payment: 'Pay at property'
        }
      ]
    },
    // ==================== ROOM 11: HALFORD BACKPACKERS ====================
    {
      id: 2,
      name: 'Halford Backpackers',
      location: 'Halford Backpackers',
      address: '4 Halford Road, 4001 Durban, South Africa',
      sleeps: '4 Guests',
      bed: 'Bunk Beds',
      size: '20 m²',
      price: '450',
      rating: null,
      reviews: 0,
      heroImage: 'assets/images/Halford Backpackers, Durban/1.jpg',
      image: 'assets/images/Halford Backpackers, Durban/1.jpg',
      galleryImages: [
        'assets/images/Halford Backpackers, Durban/1.jpg',
        'assets/images/Halford Backpackers, Durban/2.jpg',
        'assets/images/Halford Backpackers, Durban/6.jpg',
        'assets/images/Halford Backpackers, Durban/4.jpg',
        'assets/images/Halford Backpackers, Durban/5.jpg'
      ],
      description: 'Comfortable Accommodations: Halford Backpackers offers a hostel experience with free WiFi and a shared kitchen.',
      longDescription: `Comfortable Accommodations: Halford Backpackers offers a hostel experience with free WiFi and a shared kitchen. Each room includes a work desk, microwave, electric kettle, and wardrobe.`,
      amenities: ['Free Wifi', 'Pet Friendly', 'Shower', 'Shared Kitchen', 'Work Desk', 'Microwave', 'Electric Kettle'],
      additionalAmenities: [
        'Bathroom: Toilet paper, Toilet, Shower',
        'Bedroom: Linens, Wardrobe or closet',
        'Kitchen: Shared kitchen, Electric kettle, Microwave',
        'Living Area: Desk',
        'Parking: No parking available.'
      ],
      houseRules: [
        'Check-in: From 2:00 PM to 7:00 PM',
        'Check-out: From 8:00 AM to 10:00 AM',
        'Children of all ages are welcome',
        'Children 3 and above will be charged as adults',
        'No smoking allowed',
        'Parties/events are not allowed',
        'Pets are allowed on request. No extra charges.'
      ],
      nearbyAttractions: [
        { name: 'Durban Botanic Gardens', distance: '1.8 km' },
        { name: 'Killie Campbell Museum', distance: '2 km' },
        { name: 'King Shaka International Airport', distance: '33 km' }
      ],
      popular: true,
      new: false,
      featured: false,
      showPerNight: true,
      roomTypes: [
        { 
          name: 'Single Room with Shared Shower', 
          beds: '1 twin bed', 
          sleeps: '1 adult', 
          price: '350',
          priceDisplay: 'ZAR 350',
          priceLabel: 'per night',
          amenities: ['Shared kitchen', 'Work desk', 'Free Wifi'],
          cancellation: 'Free cancellation',
          payment: 'Pay at property'
        },
        { 
          name: 'Quadruple Room with Shower', 
          beds: '4 twin beds', 
          sleeps: '4 adults', 
          price: '450',
          priceDisplay: 'ZAR 450',
          priceLabel: 'per night',
          amenities: ['Shared kitchen', 'Work desk', 'Free Wifi', 'Pet Friendly'],
          cancellation: 'Free cancellation',
          payment: 'Pay at property'
        }
      ]
    }
  ];

  // =========================
  // NAVIGATION METHODS
  // =========================
  goBack() {
    this.router.navigate(['/rooms']);
  }

  goToHome() {
    this.router.navigate(['/home']);
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
  // CONSTRUCTOR & INIT
  // =========================
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.roomId = params['roomId'] || null;
      if (this.roomId) {
        this.loadRoomData(this.roomId);
      }
    });
  }

  loadRoomData(roomId: string) {
    const id = parseInt(roomId, 10);
    const room = this.allRooms.find(r => r.id === id);
    if (room) {
      this.room = room;
      // Select first room type by default
      if (this.room.roomTypes && this.room.roomTypes.length > 0) {
        this.selectedRoomType = this.room.roomTypes[0];
      }
    } else {
      this.router.navigate(['/rooms']);
    }
  }

  selectRoomType(roomType: any) {
    this.selectedRoomType = roomType;
  }

  // ==========================================
  // DATE SELECTION & AVAILABILITY CHECK
  // ==========================================
  
  // Called when date changes
  onDateChange(): void {
    // Reset availability status when dates change
    this.availabilityChecked = false;
    this.isAvailable = false;
    this.availabilityMessage = '';
    this.nightsCount = 0;
  }

  // Check availability for selected dates
  checkAvailability(): void {
    // Validate dates
    if (!this.checkIn || !this.checkOut) {
      this.availabilityChecked = true;
      this.isAvailable = false;
      this.availabilityMessage = 'Please select both check-in and check-out dates.';
      return;
    }

    // Convert to Date objects
    const checkInDate = new Date(this.checkIn);
    const checkOutDate = new Date(this.checkOut);

    // Check if check-out is after check-in
    if (checkOutDate <= checkInDate) {
      this.availabilityChecked = true;
      this.isAvailable = false;
      this.availabilityMessage = 'Check-out date must be after check-in date.';
      return;
    }

    // Calculate nights
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    this.nightsCount = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Simulate availability check
    this.simulateAvailabilityCheck(checkInDate, checkOutDate);
  }

  // Simulate availability check (replace with actual API call)
  private simulateAvailabilityCheck(checkIn: Date, checkOut: Date): void {
    this.availabilityChecked = true;
    
    // Simulate checking availability - for demo purposes
    // In a real app, you would check against a database/API
    
    // For demo: assume available unless it's a weekend or specific dates
    const isWeekend = checkIn.getDay() === 5 || checkIn.getDay() === 6 || 
                      checkOut.getDay() === 5 || checkOut.getDay() === 6;
    
    // Some dates might be booked for demo
    const bookedDates = [
      new Date(2026, 7, 15), // August 15
      new Date(2026, 7, 16), // August 16
      new Date(2026, 7, 20), // August 20
    ];
    
    const isBooked = bookedDates.some(booked => 
      (checkIn <= booked && booked <= checkOut)
    );

    if (isBooked) {
      this.isAvailable = false;
      this.availabilityMessage = 'Sorry, this room is not available for the selected dates.';
    } else if (this.nightsCount > 14) {
      this.isAvailable = false;
      this.availabilityMessage = 'Maximum stay is 14 nights. Please select different dates.';
    } else {
      this.isAvailable = true;
      this.availabilityMessage = `Room is available for ${this.nightsCount} night${this.nightsCount > 1 ? 's' : ''}!`;
    }
  }

  // =========================
  // WHATSAPP FUNCTIONS
  // =========================
  
  /**
   * Generic WhatsApp open with custom message
   */
  openWhatsAppWithMessage(message: string) {
    const phone = this.whatsappNumber;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  }

  /**
   * Default WhatsApp for the current room detail page
   * Uses the room name and location in the message
   */
  openWhatsApp() {
    let message = 'Hello STAY@TIAH, I would like to make a booking enquiry.';
    
    if (this.room) {
      const roomName = this.room.name || 'this room';
      const location = this.room.location || 'Durban';
      const selectedType = this.selectedRoomType?.name || '';
      const checkInText = this.checkIn ? ` on ${this.checkIn}` : '';
      const checkOutText = this.checkOut ? ` and check-out on ${this.checkOut}` : '';
      
      message = `Hello STAY@TIAH,%0A%0AI would like to enquire about the **${roomName}** at **${location}**.${selectedType ? `%0A%0ARoom Type: ${selectedType}` : ''}${checkInText}${checkOutText}%0A%0APlease let me know about availability and pricing. Thank you!`;
    }
    
    this.openWhatsAppWithMessage(message);
  }

  /**
   * WhatsApp for a specific room from the rooms list
   */
  openWhatsAppForRoom(room: any) {
    if (!room) return;
    
    const roomName = room.name || 'this room';
    const location = room.location || 'Durban';
    
    const message = `Hello STAY@TIAH,%0A%0AI would like to enquire about the **${roomName}** at **${location}**.%0A%0APlease let me know about availability and pricing. Thank you!`;
    
    this.openWhatsAppWithMessage(message);
  }

  /**
   * WhatsApp for CTA section
   */
  openWhatsAppForCTA() {
    const message = 'Hello STAY@TIAH,%0A%0AI would like to enquire about room availability and pricing. Please let me know what\'s available. Thank you!';
    this.openWhatsAppWithMessage(message);
  }

  // =========================
  // IMAGE GALLERY FUNCTIONS
  // =========================
  openImageModal(index: number) {
    this.currentImageIndex = index;
    this.showModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeImageModal() {
    this.showModal = false;
    document.body.style.overflow = '';
  }

  nextImage() {
    if (this.room && this.room.galleryImages && this.room.galleryImages.length > 0) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.room.galleryImages.length;
    }
  }

  prevImage() {
    if (this.room && this.room.galleryImages && this.room.galleryImages.length > 0) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.room.galleryImages.length) % this.room.galleryImages.length;
    }
  }

  // =========================
  // KEYBOARD NAVIGATION
  // =========================
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.showModal) {
      if (event.key === 'ArrowRight') {
        this.nextImage();
        event.preventDefault();
      } else if (event.key === 'ArrowLeft') {
        this.prevImage();
        event.preventDefault();
      } else if (event.key === 'Escape') {
        this.closeImageModal();
        event.preventDefault();
      }
    }
  }
}