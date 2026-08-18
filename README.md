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

## 📑 Table of Contents

* [✨ About STAY@TIAH](#-about-staytiah)
* [🖤 The STAY@TIAH Experience](#-the-staytiah-experience)
* [🌟 Key Features](#-key-features)

  * [🏨 Accommodation](#-accommodation)
  * [📅 Availability](#-availability)
  * [💬 WhatsApp Booking](#-whatsapp-booking)
* [📱 Pages & Navigation](#-pages--navigation)
* [🎨 Design System](#-design-system)

  * [Typography](#typography)
  * [UI Style](#ui-style)
* [💫 Animations & Interactions](#-animations--interactions)
* [🛠️ Technology Stack](#️-technology-stack)
* [📂 Project Structure](#-project-structure)
* [🚀 Getting Started](#-getting-started)

  * [📋 Prerequisites](#-prerequisites)
  * [📥 Installation](#-installation)
  * [▶️ Running the Application](#️-running-the-application)
  * [🏗️ Production Build](#️-production-build)
* [📱 Progressive Web App](#-progressive-web-app)
* [💬 WhatsApp Integration](#-whatsapp-integration)
* [🖼️ Image Assets](#️-image-assets)
* [🎯 Main User Journey](#-main-user-journey)
* [🔐 Project Security & Privacy](#-project-security--privacy)
* [🌍 Browser Support](#-browser-support)
* [👨‍💻 Development](#-development)
* [📞 Contact & Social Media](#-contact--social-media)
* [🙏 Acknowledgements](#-acknowledgements)
* [📄 License](#-license)

---

# ✨ About STAY@TIAH

**STAY@TIAH – The Ideal Accommodation Haven** is a modern, responsive short-stay accommodation booking platform designed for guests visiting **Durban, South Africa**.

The platform provides guests with a convenient way to:

* 🏨 Discover accommodation
* 🛏️ Explore available rooms
* 📸 View property and room galleries
* 💰 View accommodation rates
* 📅 Select check-in and check-out dates
* 👥 Specify the number of guests
* 📍 Explore nearby attractions
* 📱 Check availability
* 💬 Send booking enquiries directly through WhatsApp

STAY@TIAH focuses on creating a **professional, modern and effortless accommodation experience** across desktop, tablet and mobile devices.

The platform is designed to help accommodation businesses establish a strong digital presence while making it easier for guests to discover and enquire about available accommodation.

---

# 🖤 The STAY@TIAH Experience

STAY@TIAH is designed around four simple steps:

<table>
<tr>
<td align="center" width="25%">

### 🏠

**Explore**

Discover accommodation properties and explore available options.

</td>

<td align="center" width="25%">

### 🛏️

**Choose**

View rooms, amenities, prices, photographs and property information.

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

## 🏨 Accommodation

STAY@TIAH provides detailed accommodation information including:

* Multiple accommodation properties
* Room categories
* Room descriptions
* Guest capacity
* Bed information
* Bathroom information
* Amenities
* Accommodation rates
* Property information
* High-quality image galleries
* Property locations
* Nearby attractions

### 🛎️ Accommodation Amenities

Depending on the selected property or room, guests can view amenities such as:

* 📶 Free Wi-Fi
* 📺 Smart TV
* 🚗 Secure parking
* ❄️ Air conditioning
* 🛏️ Comfortable beds
* 🚿 Private bathrooms

---

## 📅 Availability

Guests can select their preferred reservation dates.

The booking process supports:

* Check-in date
* Check-out date
* Number of guests
* Room selection
* Property selection
* Number of nights
* Availability checking
* Special requests

The system calculates the duration of the stay based on the selected dates.

```text
Check-In
    │
    ▼
Select Date
    │
    ▼
Check-Out
    │
    ▼
Select Date
    │
    ▼
Calculate Nights
    │
    ▼
Check Availability
    │
    ▼
Booking Enquiry
```

---

## 💬 WhatsApp Booking

STAY@TIAH uses WhatsApp as a direct booking enquiry channel.

Instead of forcing customers to create an account or navigate through a complicated checkout process, guests can submit their booking details and send the enquiry directly to the accommodation owner.

The generated WhatsApp message contains relevant reservation information.

### Example

```text
┌────────────────────────────────────┐
│        STAY@TIAH BOOKING ENQUIRY   │
└────────────────────────────────────┘

GUEST DETAILS

Name       : John Doe
Phone      : +27 84 000 0000
Email      : john@example.com

RESERVATION

Property   : Durban Oceanic
Room       : Family Room
Check-In   : 15 August 2026
Check-Out  : 20 August 2026
Duration   : 5 Nights
Guests     : 2

SPECIAL REQUEST

Late check-in requested.
```

This gives the accommodation owner the information needed to respond to the customer directly.

---

# 📱 Pages & Navigation

| Page                | Description                                                          |
| ------------------- | -------------------------------------------------------------------- |
| 🏠 **Home**         | Hero section, accommodation highlights, features, statistics and FAQ |
| ℹ️ **About**        | Information about STAY@TIAH and its accommodation offerings          |
| 🛏️ **Rooms**       | Browse available accommodation and room categories                   |
| 🏨 **Room Details** | Detailed room information, amenities, gallery and booking            |
| 📍 **Attractions**  | Discover nearby attractions and places of interest                   |
| 💬 **Contact**      | Contact information and booking enquiry functionality                |

---

# 🎨 Design System

STAY@TIAH uses a premium accommodation-inspired visual identity.

The interface is built around a minimal **black, white and gold** colour palette.

| Colour |    Hex    | Purpose                     |
| :----: | :-------: | --------------------------- |
|   🖤   | `#000000` | Primary background          |
|   🤍   | `#FFFFFF` | Content and text            |
|   🟨   | `#C9A84C` | Brand accent and highlights |

---

## Typography

**Primary Font:** Verdana

**Fallback:** Geneva, sans-serif

The typography is designed to maintain readability across desktop and mobile screens.

---

## UI Style

The application uses:

* Luxury-inspired layouts
* Minimal black and white design
* Gold accent elements
* Rounded cards
* Responsive navigation
* Modern buttons
* Image galleries
* Clear typography
* Consistent spacing
* Smooth transitions
* Mobile-first layouts

---

# 💫 Animations & Interactions

The application includes subtle animations to create a modern and premium experience.

### UI Animations

* Fade-up animations
* Slide transitions
* Scale effects
* Hover effects
* Image transitions
* Smooth navigation
* Animated splash screen
* Responsive menu interactions
* Button interactions

Animations are designed to enhance the experience without distracting users from the booking process.

---

# 🛠️ Technology Stack

| Technology     | Version | Purpose                   |
| -------------- | ------: | ------------------------- |
| **Angular**    |     17+ | Frontend framework        |
| **Ionic**      |      7+ | Mobile-first UI framework |
| **TypeScript** |      5+ | Application development   |
| **SCSS**       |       — | Styling                   |
| **Ionicons**   |      7+ | Interface icons           |
| **HTML5**      |       — | Application structure     |
| **CSS3**       |       — | Responsive styling        |
| **Git**        |       — | Version control           |
| **GitHub**     |       — | Repository and deployment |

---

# 📂 Project Structure

```text
STAY@TIAH/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── src/
│   ├── app/
│   │   │
│   │   ├── home/
│   │   │   ├── home.page.html
│   │   │   ├── home.page.scss
│   │   │   └── home.page.ts
│   │   │
│   │   ├── about/
│   │   │   ├── about.page.html
│   │   │   ├── about.page.scss
│   │   │   └── about.page.ts
│   │   │
│   │   ├── rooms/
│   │   │   ├── rooms.page.html
│   │   │   ├── rooms.page.scss
│   │   │   └── rooms.page.ts
│   │   │
│   │   ├── room-detail/
│   │   │   ├── room-detail.page.html
│   │   │   ├── room-detail.page.scss
│   │   │   └── room-detail.page.ts
│   │   │
│   │   ├── attractions/
│   │   │   ├── attractions.page.html
│   │   │   ├── attractions.page.scss
│   │   │   └── attractions.page.ts
│   │   │
│   │   ├── contact/
│   │   │   ├── contact.page.html
│   │   │   ├── contact.page.scss
│   │   │   └── contact.page.ts
│   │   │
│   │   ├── app.routes.ts
│   │   └── app.component.ts
│   │
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── theme/
│   │   └── variables.scss
│   │
│   ├── global.scss
│   ├── index.html
│   └── main.ts
│
├── angular.json
├── ionic.config.json
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
└── README.md
```

---

# 🚀 Getting Started

## 📋 Prerequisites

Before running the project, make sure you have the following installed:

* **Node.js 18+**
* **npm**
* **Git**
* **Angular CLI**
* **Ionic CLI**

Check your Node.js installation:

```bash
node --version
```

Check npm:

```bash
npm --version
```

Check Ionic:

```bash
ionic --version
```

---

## 📥 Installation

Clone the repository:

```bash
git clone https://github.com/thokozani828/Stay-Tiah2.git
```

Navigate into the project:

```bash
cd Stay-Tiah2
```

Install dependencies:

```bash
npm install
```

---

## ▶️ Running the Application

Start the Ionic development server:

```bash
ionic serve
```

Or:

```bash
npm start
```

The application will be available through the local development server.

---

## 🏗️ Production Build

Create a production build:

```bash
npm run build
```

The compiled application will be generated in the Angular `dist/` directory.

For Ionic:

```bash
ionic build
```

---

# 🌐 Deployment

STAY@TIAH can be deployed using services such as:

* GitHub Pages
* Netlify
* Vercel
* Firebase Hosting
* Traditional web hosting

The project includes a GitHub Actions workflow for automated deployment.

```text
GitHub Repository
        │
        ▼
GitHub Actions
        │
        ▼
Angular Production Build
        │
        ▼
Deployment
        │
        ▼
STAY@TIAH Website
```

---

# 📱 Progressive Web App

STAY@TIAH is designed with modern web application principles and can be extended into a Progressive Web App.

Potential PWA capabilities include:

* ⚡ Fast loading
* 📱 Responsive interface
* 🌐 Offline support
* 📲 Installable experience
* 🖼️ Optimized assets
* 📦 Lazy loading
* 🔔 Push notifications
* 🚀 Improved mobile performance

---

# 💬 WhatsApp Integration

WhatsApp is integrated as the primary booking enquiry channel.

The application generates a structured message based on the customer's selected information.

### Booking information can include:

* Guest name
* Phone number
* Email address
* Property
* Room
* Check-in date
* Check-out date
* Number of nights
* Number of guests
* Special requests

Example implementation:

```typescript
private readonly whatsappNumber = '27849009821';
```

The application can then generate a WhatsApp URL containing the booking information.

> **Security Note:** For production, sensitive configuration such as contact numbers should preferably be managed through environment configuration rather than hard-coded throughout the application.

---

# 🖼️ Image Assets

Accommodation and room images should be stored inside:

```text
src/assets/images/
```

Example:

```text
src/
└── assets/
    └── images/
        ├── Durban Oceanic/
        │   ├── room-1.jpg
        │   ├── room-2.jpg
        │   └── exterior.jpg
        │
        ├── Tiah Musgrave/
        │   ├── room-1.jpg
        │   └── room-2.jpg
        │
        └── La Tiah/
            ├── room-1.jpg
            └── room-2.jpg
```

Keeping assets inside the Angular assets directory ensures they are included during the build process.

---

# 🎯 Main User Journey

The primary guest journey is designed to be simple.

```text
                  ┌──────────────────┐
                  │    STAY@TIAH     │
                  │      WEBSITE     │
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │  Browse Rooms    │
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │ Select Property   │
                  │    & Room         │
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │ Check Availability│
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │ Select Dates      │
                  │ & Guests          │
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │ Enter Guest Info  │
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │ WhatsApp Booking  │
                  │     Enquiry       │
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │ Owner Receives    │
                  │     Enquiry       │
                  └──────────────────┘
```

---

# 🔮 Future Improvements

The current platform can be expanded into a complete accommodation management ecosystem.

### 📅 Booking Management

* Real-time room availability
* Booking confirmation
* Automated booking emails
* Booking history
* Cancellation management
* Reservation management dashboard

### 💳 Payments

* Online payments
* Payment gateway integration
* Deposit payments
* Digital receipts
* Payment verification

### 👤 Guest Accounts

* Guest registration
* Guest profiles
* Saved properties
* Booking history
* Favourite rooms

### 🏢 Property Management

* Property owner dashboard
* Room management
* Pricing management
* Availability management
* Staff management
* Booking management

### 📊 Analytics

* Occupancy analytics
* Revenue analytics
* Booking trends
* Guest statistics
* Property performance

### 🔔 Notifications

* Booking confirmation
* Booking reminders
* Check-in reminders
* Payment notifications
* WhatsApp notifications
* Email notifications

---

# 🔐 Project Security & Privacy

STAY@TIAH is a proprietary software project.

The source code, designs, business information, photographs, branding and associated assets are intended for authorized use only.

Production implementations should use appropriate security measures including:

* Secure environment variables
* HTTPS
* Input validation
* Secure API communication
* Authentication where required
* Authorization controls
* Secure payment processing
* Protection of guest information

> **© 2026 STAY@TIAH – The Ideal Accommodation Haven. All Rights Reserved.**

---

# 🌍 Browser Support

| Browser            | Support |
| ------------------ | :-----: |
| Google Chrome      |    ✅    |
| Mozilla Firefox    |    ✅    |
| Safari             |    ✅    |
| Microsoft Edge     |    ✅    |
| Mobile Safari      |    ✅    |
| Chrome for Android |    ✅    |

---

# 👨‍💻 Development

STAY@TIAH follows modern frontend development practices.

### Development Principles

* Component-based architecture
* Responsive design
* Mobile-first development
* Reusable components
* TypeScript best practices
* Angular routing
* SCSS architecture
* Semantic HTML
* Accessibility considerations
* Performance optimization
* Clean code organization

### Code Quality

The project can be maintained using:

* Angular Style Guide
* TypeScript best practices
* ESLint
* Prettier
* SCSS
* Git
* GitHub

---

# 📞 Contact & Social Media

<div align="center">

## STAY@TIAH

### *The Ideal Accommodation Haven*

📍 **Durban, South Africa**

📧 **Email:** [info@staytiah.com](mailto:info@staytiah.com)

💬 **WhatsApp:** +27 84 900 9821

📸 **Instagram:** @stay.tiah

🎵 **TikTok:** @stay_at_tiah

</div>

---

# 🙏 Acknowledgements

STAY@TIAH is built using modern open-source technologies and services.

Special thanks to:

* [Angular](https://angular.dev/)
* [Ionic Framework](https://ionicframework.com/)
* [Ionicons](https://ionic.io/ionicons)
* GitHub
* GitHub Pages
* Google Maps
* Unsplash

---

# 📄 License

This project is proprietary software developed for **STAY@TIAH – The Ideal Accommodation Haven**.

Copyright © 2026 STAY@TIAH.

All rights reserved.

Unauthorized copying, modification, distribution or commercial use is prohibited.

---

<div align="center">

# 🖤 STAY@TIAH

### *The Ideal Accommodation Haven*

**Luxury • Comfort • Convenience**

📍 Durban, South Africa 🇿🇦

<br>

⭐ **If you like this project, consider giving the repository a star!** ⭐

</div>
