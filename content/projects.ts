import { z } from 'zod';

export interface ProjectBlock {
  type: 'text' | 'image' | 'twoUp' | 'quote' | 'credits';
  content?: string;
  author?: string;
  role?: string;
  images?: string[];
  items?: { label: string; value: string }[];
}

export interface Project {
  slug: string;
  title: string;
  year: string;
  discipline: string;
  curator: string;
  date: string;
  venue: string;
  sound: string;
  dressCode: string;
  color: string;
  featured: boolean;
  cover: {
    src: string;
    focal: [number, number];
    portraitCrop: string;
  };
  summary: string;
  blocks: ProjectBlock[];
}

export const projects: Project[] = [
  {
    slug: 'la-dolce-vita',
    title: 'La Dolce Vita',
    year: '2026',
    discipline: 'Greek Island Edition',
    curator: 'Underdogs Innercircle × DJs Luna & Monish',
    date: 'Saturday, 12 September 2026',
    venue: 'Millo, Civil Lines, Nagpur',
    sound: 'Deep Aegean House · Italo Disco · Afro Rhythms',
    dressCode: 'Compulsory 80s Riviera / Vintage Resort',
    color: '#14224a',
    featured: true,
    cover: {
      src: '/brand/launch-post.png',
      focal: [0.5, 0.5],
      portraitCrop: '/brand/launch-post.png',
    },
    summary:
      'Santorini after dark. Whitewashed walls, cobalt blue shadows, 80s chrome accents and an unhurried champagne dusk. The location was dropped 72 hours prior to members holding confirmed coins.',
    blocks: [
      {
        type: 'text',
        content:
          'La Dolce Vita transformed Millo into an Aegean sanctuary. Guests entered through a discrete alleyway in Civil Lines, where identity verification unlocked a candle-lit corridor opening into ocean-blue projection architecture.',
      },
      {
        type: 'image',
        images: ['/brand/launch-post.png'],
      },
      {
        type: 'twoUp',
        images: ['/brand/animation-theme.png', '/brand/logo.jpg'],
      },
      {
        type: 'quote',
        content:
          'The energy was unlike any club night in the city. You looked around the room and everyone was locked into the same frequency.',
        author: 'Innercircle Member #042',
        role: 'Attended La Dolce Vita',
      },
      {
        type: 'credits',
        items: [
          { label: 'Creative Direction', value: 'Underdogs Entertainment' },
          { label: 'Sound Selectors', value: 'DJ Luna & DJ Monish' },
          { label: 'Mixology Partner', value: 'By All Means Private Bar' },
          { label: 'Access Protocol', value: 'Gated Coin Minting' },
        ],
      },
    ],
  },
  {
    slug: 'grand-launch',
    title: 'The Grand Launch',
    year: '2026',
    discipline: 'Private Premiere',
    curator: 'Underdogs Innercircle × Live By All Means',
    date: 'Saturday, 6 June 2026',
    venue: 'Millo, Civil Lines, Nagpur',
    sound: 'Melodic Underground · Soulful Grooves',
    dressCode: 'All-Black Satin · Milled Gold Accents',
    color: '#23171c',
    featured: true,
    cover: {
      src: '/brand/animation-theme.png',
      focal: [0.5, 0.5],
      portraitCrop: '/brand/animation-theme.png',
    },
    summary:
      'The inaugural night that created the Innercircle. Black marble, copper firelight, frozen champagne splash and the ceremonial minting of the first 60 numbered coins.',
    blocks: [
      {
        type: 'text',
        content:
          'A collaboration with partner brand Live By All Means. Intimate, unhurried, and intentionally limited to 60 individuals whose presence defines the cultural pulse of Nagpur.',
      },
      {
        type: 'image',
        images: ['/brand/animation-theme.png'],
      },
      {
        type: 'quote',
        content:
          'Underdogs gave us the stadium parties; Innercircle gave us the living room where we actually talk and listen.',
        author: 'Founding Member #008',
        role: 'Launch Attendee',
      },
      {
        type: 'credits',
        items: [
          { label: 'Scenography', value: 'Black Marble & Copper Fire' },
          { label: 'Curators', value: 'Underdogs Crew' },
          { label: 'Audio', value: 'Custom Acoustic Baffles' },
        ],
      },
    ],
  },
  {
    slug: 'underdogs-wonderland',
    title: 'Underdogs Wonderland',
    year: '2025',
    discipline: 'Flagship NYE Gala',
    curator: 'Underdogs Entertainment',
    date: '31 December 2025',
    venue: 'Ashirwad Banquets, Nagpur',
    sound: 'Afro-House · Commercial Anthems · Festival Bangers',
    dressCode: 'Opulent Formal / Midnight Black',
    color: '#342528',
    featured: true,
    cover: {
      src: '/brand/palette.png',
      focal: [0.5, 0.5],
      portraitCrop: '/brand/palette.png',
    },
    summary:
      'The legendary NYE celebration that solidified Underdogs as Nagpur’s cultural powerhouse. Over 1,500 revellers in the main arena, with the genesis of the private backstage salon that became Innercircle.',
    blocks: [
      {
        type: 'text',
        content:
          'Wonderland showcased the raw voltage of Underdogs. The dichotomy between the public celebration and the private salon inspired the founding tenet: "Two registers, one circle."',
      },
      {
        type: 'image',
        images: ['/brand/palette.png'],
      },
      {
        type: 'credits',
        items: [
          { label: 'Format', value: 'Flagship Arena & VIP Salon' },
          { label: 'Attendance', value: 'Sold Out on SortMyScene' },
        ],
      },
    ],
  },
  {
    slug: 'akai-yane',
    title: 'Akai Yane (Red Roof)',
    year: '2025',
    discipline: 'Tokyo Underground',
    curator: 'Underdogs Secret Sessions',
    date: 'Autumn 2025',
    venue: 'Undisclosed Industrial Space',
    sound: 'Minimal Techno · Japanese Deep House',
    dressCode: 'Cyberpunk Chic / Monochromatic Black',
    color: '#3b1c1c',
    featured: true,
    cover: {
      src: '/brand/launch-post.png',
      focal: [0.5, 0.5],
      portraitCrop: '/brand/launch-post.png',
    },
    summary:
      'Raw concrete pillars illuminated by scarlet lasers and suspended shoji screens. An uncompromising sonic exploration that brought Tokyo’s subterranean club energy to Central India.',
    blocks: [
      {
        type: 'text',
        content:
          'Akai Yane was an exercise in absolute contrast: harsh warehouse acoustics tamed with hanging velvet baffles and a quadraphonic sound system that vibrated the floorboards.',
      },
      {
        type: 'quote',
        content: 'No phones on the floor. Just four hours of relentless, beautiful sound.',
        author: 'Member #029',
        role: 'Secret Session Guest',
      },
    ],
  },
  {
    slug: 'maison-blanche',
    title: 'Maison Blanche',
    year: '2024',
    discipline: 'Summer Solstice Gathering',
    curator: 'Underdogs Salon',
    date: 'Midsummer 2024',
    venue: 'Open-Air Private Estate',
    sound: 'Balearic Ambient · Sunset Melodic',
    dressCode: 'All-White Linen',
    color: '#2a2b30',
    featured: true,
    cover: {
      src: '/brand/animation-theme.png',
      focal: [0.5, 0.5],
      portraitCrop: '/brand/animation-theme.png',
    },
    summary:
      'The quiet predecessor. Unhurried sunlight drifting into midnight conversation under raw white canvas sailcloth and organic botanical installations.',
    blocks: [
      {
        type: 'text',
        content:
          'Maison Blanche demonstrated that energy does not require maximum volume. The curation of guests, conversation and hospitality set the foundational standards for every subsequent Innercircle gathering.',
      },
    ],
  },
];
