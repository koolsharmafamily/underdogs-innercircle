export interface ProcessStep {
  n: string;
  title: string;
  line: string;
  detail: string;
}

export const processSteps: ProcessStep[] = [
  {
    n: '01',
    title: 'Request',
    line: "Submit your profile and energy. We care about what you bring into the room, not status.",
    detail: "Tell us who you are and share your Instagram handle. Honest intent is the only currency here.",
  },
  {
    n: '02',
    title: 'Review',
    line: "Every application is evaluated personally by the Underdogs crew. Quality over crowd.",
    detail: "No algorithms, no automatic queues. We ensure every person in the room belongs in the same orbit.",
  },
  {
    n: '03',
    title: 'Mint',
    line: "Upon approval, your personal coin is minted in gold — engraved with your name and circle serial.",
    detail: "Your physical and digital coin carries your token for private bookings, drops and unreleased recordings.",
  },
  {
    n: '04',
    title: 'The Drop',
    line: "Encrypted coordinates unlock 72 hours before the night. Show your coin at the door.",
    detail: "The venue stays silent until days before. One tap on your minted coin verifies your entry at the door.",
  },
];
