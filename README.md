# 🏨 STAY@TIAH

### *The Ideal Accommodation Haven*

<p align="center">
  <strong>A Modern Short-Stay Accommodation Booking Platform</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Angular-17%2B-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular">
  <img src="https://img.shields.io/badge/Ionic-7%2B-3880FF?style=for-the-badge&logo=ionic&logoColor=white" alt="Ionic">
  <img src="https://img.shields.io/badge/TypeScript-5%2B-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/SCSS-Professional-C6538C?style=for-the-badge&logo=sass&logoColor=white" alt="SCSS">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-success?style=flat-square" alt="Status">
  <img src="https://img.shields.io/badge/Platform-Web-black?style=flat-square" alt="Platform">
  <img src="https://img.shields.io/badge/Location-Durban%2C%20South%20Africa-c9a84c?style=flat-square" alt="Location">
</p>

---

## ✨ About STAY@TIAH

**STAY@TIAH – The Ideal Accommodation Haven** is a modern, responsive accommodation booking web application designed for short-stay accommodation in **Durban, South Africa**.

The platform provides guests with a seamless way to discover accommodation, explore rooms, view property information, check availability and send booking enquiries directly through **WhatsApp**.

The system is designed with a strong focus on **professional presentation, responsive design, accessibility and an effortless booking experience** across mobile, tablet and desktop devices.

---

## 🖤 The STAY@TIAH Experience

<table>
<tr>
<td align="center" width="25%">

### 🏠

**Explore**

Browse beautiful accommodation options and discover available properties.

</td>

<td align="center" width="25%">

### 🛏️

**Choose**

Explore detailed room information, amenities, pricing and galleries.

</td>

<td align="center" width="25%">

### 📅

**Check**

Select check-in and check-out dates and check availability.

</td>

<td align="center" width="25%">

### 💬

**Book**

Send your booking enquiry directly through WhatsApp.

</td>
</tr>
</table>

---

# 🌟 Key Features

### 🏨 Accommodation

* Multiple accommodation properties
* Detailed room information
* Room categories and amenities
* High-quality image galleries
* Property location information
* Pricing information
* Guest capacity information

### 📅 Availability

* Check-in date selection
* Check-out date selection
* Calendar-based date selection
* Availability status
* Booking duration calculation
* Guest selection

### 💬 WhatsApp Booking

Guests can submit their booking enquiries directly through WhatsApp.

Booking information is automatically formatted into a structured message containing:

```text
┌──────────────────────────────────┐
│       STAY@TIAH BOOKING FORM     │
└──────────────────────────────────┘

[ GUEST DETAILS ]

• Name    : John Doe
• Phone   : +27 123 456 789
• Email   : john@example.com

[ RESERVATION SUMMARY ]

• Property : Durban Oceanic (82A)
• Category : Family Room
• Check-In : 15 Aug 2026
• Check-Out: 20 Aug 2026
• Duration : 5 Night(s)
• Guests   : 2
```

This allows the accommodation owner to receive complete booking information directly through WhatsApp.

---

# 📱 Pages & Navigation

| Page                | Description                                                 |
| ------------------- | ----------------------------------------------------------- |
| 🏠 **Home**         | Hero section, accommodation highlights, statistics and FAQ  |
| ℹ️ **About**        | Company information, locations and accommodation statistics |
| 🛏️ **Rooms**       | Browse and filter available rooms                           |
| 🏨 **Room Details** | Detailed room information, gallery and availability         |
| 📍 **Attractions**  | Nearby attractions with categories and maps                 |
| 💬 **Contact**      | Booking and availability enquiry form                       |

---

# 🎨 Design System

STAY@TIAH follows a **luxury accommodation aesthetic** based around a minimal black, white and gold colour palette.

<div align="center">

| Colour |    Hex    | Purpose                 |
| :----: | :-------: | ----------------------- |
|   🖤   | `#000000` | Primary background      |
|   🤍   | `#FFFFFF` | Text & content          |
|   🟨   | `#C9A84C` | Brand gold / highlights |

</div>

### Typography

**Primary Font:** Verdana
**Fallback:** Geneva, sans-serif

### UI Style

* Luxury-inspired interface
* Minimal black & white layout
* Gold accent elements
* Rounded cards
* Responsive navigation
* Modern buttons
* Smooth transitions
* Custom scrollbar
* Mobile-first layouts

---

# 💫 Animations & Interactions

The application includes smooth UI animations to create a premium user experience.

* `Fade-up` animations
* `Slide` transitions
* `Scale` effects
* Hover interactions
* Image lightbox
* Animated splash screen
* Smooth navigation
* Responsive menu interactions

---

# 🛠️ Technology Stack

<div align="center">

| Technology     | Version | Purpose                   |
| -------------- | ------: | ------------------------- |
| **Angular**    |     17+ | Frontend framework        |
| **Ionic**      |      7+ | Mobile-first UI framework |
| **TypeScript** |      5+ | Application development   |
| **SCSS**       |       — | Styling                   |
| **Ionicons**   |      7+ | UI icons                  |
| **HTML5**      |       — | Application structure     |
| **CSS3**       |       — | Responsive styling        |

</div>

---

# 📂 Project Structure

```text
STAY@TIAH/
│
├── src/
│   ├── app/
│   │   ├── home/
│   │   │   └── Home Page
│   │   │
│   │   ├── about/
│   │   │   └── About Page
│   │   │
│   │   ├── rooms/
│   │   │   └── Rooms Listing
│   │   │
│   │   ├── room-detail/
│   │   │   └── Room Details
│   │   │
│   │   ├── attractions/
│   │   │   └── Nearby Attractions
│   │   │
│   │   ├── contact/
│   │   │   └── Contact & Enquiry
│   │   │
│   │   └── app.routes.ts
│   │
│   ├── assets/
│   │   └── images/
│   │
│   ├── theme/
│   │   └── variables.scss
│   │
│   └── main.ts
│
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

---

# 🚀 Getting Started

## 📋 Prerequisites

Make sure the following are installed:

* **Node.js v18 or higher**
* **npm**
* **Git**
* **Angular CLI**
* **Ionic CLI**

---

# 🏗️ Production Build

To create a production build:

```bash
npm run build
```

The compiled application will be generated in the Angular `dist/` directory.

---

# 📱 Progressive Web App

STAY@TIAH is designed with modern web application capabilities.

### PWA Features

* ⚡ Fast loading
* 📱 Responsive layouts
* 🌐 Offline support
* 🎨 Custom splash screen
* 🖼️ Optimized assets
* 📦 Lazy loading
* 📲 Mobile-friendly interface

---

# 💬 WhatsApp Integration

All booking enquiries are handled through WhatsApp.

Configure the WhatsApp number in the relevant TypeScript files:

```typescript
private readonly whatsappNumber: string = '27849009821';
```

The application generates a structured WhatsApp message containing the guest's:

* Name
* Phone number
* Email
* Property
* Room category
* Check-in date
* Check-out date
* Number of nights
* Number of guests
* Special requests

---

# 🖼️ Image Assets

Local images should be placed inside:

```text
src/assets/images/
```

### Room image example

```text
Durban Oceanic Room 82A/1.jpg
```

### Property image example

```text
Tiah Whyte, Durban/1.jpg
```

Keeping images inside the assets directory allows Angular to package them during the production build.

---

# 🎯 Main User Journey

```text
                 ┌─────────────────┐
                 │     STAY@TIAH    │
                 │      WEBSITE     │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │   Browse Rooms  │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ Select Property  │
                 │    & Room        │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ Check Availability│
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ Enter Guest Info │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ WhatsApp Enquiry│
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │   Owner Receives │
                 │     Enquiry      │
                 └─────────────────┘
```

---

# 🔐 Project Security & Privacy

STAY@TIAH is a proprietary software project.

The source code, designs, business information and associated assets are intended for authorized use only.

> **© 2026 STAY@TIAH – The Ideal Accommodation Haven. All Rights Reserved.**

Unauthorized copying, distribution, modification or commercial use is prohibited.

---

# 🌍 Browser Support

| Browser            | Support |
| ------------------ | :-----: |
| Chrome             |    ✅    |
| Firefox            |    ✅    |
| Safari             |    ✅    |
| Microsoft Edge     |    ✅    |
| Mobile Safari      |    ✅    |
| Chrome for Android |    ✅    |

---

# 👨‍💻 Development

The project follows modern Angular development practices.

### Code Standards

* Angular Style Guide
* TypeScript best practices
* ESLint
* Prettier
* SCSS
* BEM naming convention
* Component-based architecture
* Responsive design principles


# 📞 Contact & Social Media

<div align="center">

### STAY@TIAH

**The Ideal Accommodation Haven**

📍 Durban, South Africa

🌐 **Website:** staytiah.com

📧 **Email:** [info@staytiah.com](mailto:info@staytiah.com)

💬 **WhatsApp:** +27 84 900 9821

📸 **Instagram:** @stay.tiah

🎵 **TikTok:** @stay_at_tiah

</div>

---

# 🙏 Acknowledgements

Special thanks to the technologies and services that helped make STAY@TIAH possible.

* [Angular](https://angular.dev/)
* [Ionic Framework](https://ionicframework.com/)
* [Ionicons](https://ionic.io/ionicons)
* Google Maps
* Unsplash

---

<div align="center">

## 🖤 Built with passion in Durban, South Africa 🇿🇦

### STAY@TIAH

**The Ideal Accommodation Haven**

`Luxury • Comfort • Convenience`

<br>

⭐ **If you like this project, consider giving the repository a star!** ⭐

</div>
