export const NavigationMenuItems = [
  {
    text: 'Foglalások',
    children: [
      {icon: 'overview', text: 'Áttekintés', routerLink: '/reservations/overview', },
      {icon: 'calendar_add_on', text: 'Új létrehozás', routerLink: '/reservations/new', },
      {icon: 'find_in_page', text: 'Keresés', routerLink: '/reservations/search', },
    ]
  },
  {
    text: 'Admin',
    children: [
      {icon: 'adaptive_audio_mic', text: 'Zenekarok', routerLink: '/bands', },
      {icon: 'home_work', text: 'Próbatermek', routerLink: '/rooms', },
      {icon: 'settings', text: 'Beállítások', routerLink: '/admin/settings', },
    ]
  },
  {
    text: 'Infó',
    children: [
      {icon: 'shield_question', text: 'Infók', routerLink: '/about', },
    ]
  },
];
