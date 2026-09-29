export interface ProcessStep {
  n: string;
  title: string;
  line: string;
  detail: string;
}

export const processSteps: ProcessStep[] = [
  {
    n: '01',
    title: 'Introduction',
    line: "Submit your personal dossier. We care about the presence and energy you bring into the room, not arbitrary status.",
    detail: "Share your identity, personal profile, and cultural touchpoints. Intent is the singular currency within the Circle.",
  },
  {
    n: '02',
    title: 'Vetting & Peer Review',
    line: "Every application is reviewed personally by the Underdogs curatorial council. Uncompromising intimacy over volume.",
    detail: "No automated queues or algorithms. We ensure every individual present shares the exact same creative frequency.",
  },
  {
    n: '03',
    title: 'The Struck Medallion',
    line: "Upon admission, your personal coin is struck in antique gold—engraved with your identity and private ledger number.",
    detail: "Your physical and digital coin serves as a lifelong passport for private bookings, unreleased recordings, and salon access.",
  },
  {
    n: '04',
    title: 'The Sealed Coordinates',
    line: "Encrypted venue coordinates unlock strictly 72 hours prior to doors. Present your coin at the threshold.",
    detail: "The architecture remains silent until days prior. A single presentation of your verified coin grants admission at the door.",
  },
];
