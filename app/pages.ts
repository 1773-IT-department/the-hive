export type HivePage = { slug: string; file: string; title: string; description: string };

export const PAGES: HivePage[] = [
  { slug: '', file: 'home', title: 'The Hive | Coworking Space in Tse Addo, Accra', description: 'A calm, professional coworking space at ICGC Christ Temple East, Tse Addo. Day passes, flex passes, meeting rooms, private pods and private offices.' },
  { slug: 'workspaces', file: 'workspaces', title: 'Workspaces | The Hive', description: 'Four ways to work at The Hive: coworking desks, private pods, meeting rooms and private offices.' },
  { slug: 'coworking-desks', file: 'coworking-desks', title: 'Coworking Desks | The Hive', description: 'Flexible open desks from GHS 180 a day, with fast internet, steady power and free coffee.' },
  { slug: 'private-pods', file: 'private-pods', title: 'Private Pods | The Hive', description: 'Quiet private pods by the hour for calls, interviews and focused work.' },
  { slug: 'meeting-rooms', file: 'meeting-rooms', title: 'Meeting Rooms | The Hive', description: 'Book a professional meeting room by the hour in Tse Addo.' },
  { slug: 'private-offices', file: 'private-offices', title: 'Private Offices | The Hive', description: 'Private offices for teams from GHS 6,500 a month, ready from day one.' },
  { slug: 'plans', file: 'plans', title: 'Plans and Pricing | The Hive', description: 'Simple plans with no surprises: day passes, flex passes, All-Access and private offices.' },
  { slug: 'events', file: 'events', title: 'Events and Community | The Hive', description: 'Networking, workshops and member socials at The Hive.' },
  { slug: 'gallery', file: 'gallery', title: 'Gallery and Virtual Tour | The Hive', description: 'See The Hive before you visit.' },
  { slug: 'about', file: 'about', title: 'About | The Hive', description: 'More than just a desk: a dedicated space designed for your success.' },
  { slug: 'contact', file: 'contact', title: 'Contact and Visit | The Hive', description: 'Book a free visit or get in touch with The Hive.' },
  { slug: 'book', file: 'book-a-spot', title: 'Book a Spot | The Hive', description: 'Book a desk, pod or meeting room and pay by mobile money or card.' },
  { slug: 'member-portal', file: 'member-portal', title: 'Member Portal | The Hive', description: 'Your passes, bookings and receipts.' },
  { slug: 'staff-app', file: 'staff-app', title: 'Staff App | The Hive', description: 'The front-desk app for The Hive team.' },
  { slug: 'manager-dashboard', file: 'manager-dashboard', title: 'Manager Dashboard | The Hive', description: 'Bookings, members, billing and operations at a glance.' },
  { slug: 'style-guide', file: 'style-guide', title: 'Style Guide | The Hive', description: 'The Hive design system.' },
];
