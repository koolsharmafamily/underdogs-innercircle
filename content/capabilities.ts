export interface Capability {
  id: string;
  name: string;
  line: string;
  services: string[];
  form: 'ring' | 'fan' | 'lattice' | 'wave';
}

export const capabilities: Capability[] = [
  {
    id: 'curation',
    name: 'The Curation',
    line: 'The room behind the rage. An intimate, vetted circle where energy matches energy.',
    services: [
      'Vetted Guest Protocol',
      'Invite-Only Access',
      'Private Cohort Matching',
      'Zero Random Entry',
    ],
    form: 'ring',
  },
  {
    id: 'scenography',
    name: 'The Scenography',
    line: 'Different worlds, same coin. Each night is an unrepeatable cinematic environment.',
    services: [
      'Thematic Worldbuilding',
      'Atmospheric Lighting Rig',
      'Bespoke Floor Architecture',
      'Art Direction & Dress Codes',
    ],
    form: 'fan',
  },
  {
    id: 'sound',
    name: 'The Sound',
    line: 'Acoustic architecture engineered for visceral movement rather than brute decibels.',
    services: [
      'Underground Selectors',
      'Deep Melodic & Afro Rhythms',
      'Tuned Room Acoustics',
      'Analog Sound Balance',
    ],
    form: 'lattice',
  },
  {
    id: 'discretion',
    name: 'The Discretion',
    line: 'The encrypted drop. The secret location unveils only when the time is right.',
    services: [
      '72-Hour Venue Drops',
      'Dynamic Digital Key Codes',
      'Private Concierge Liaison',
      'No Tagging / No Leaks',
    ],
    form: 'wave',
  },
];
