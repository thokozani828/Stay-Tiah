// app.routes.ts

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.page').then(m => m.AboutPage)
  },
  {
    path: 'rooms',
    loadComponent: () => import('./rooms/rooms.page').then(m => m.RoomsPage)
  },

  
  {
    path: 'attractions',
    loadComponent: () => import('./attractions/attractions.page').then(m => m.AttractionsPage)
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact.page').then(m => m.ContactPage)
  },
  {
    path: 'booking',
    loadComponent: () => import('./booking/booking.page').then(m => m.BookingPage)
  },
{
  path: 'room-detail',
  loadComponent: () => import('./room-detail/room-detail.page').then(m => m.RoomDetailPage)
},
 
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];