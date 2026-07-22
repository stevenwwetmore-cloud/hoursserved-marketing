import { useState } from 'react';
import PhaseNav from './PhaseNav';

const PHASES = [
  { id: "phase-1", label: "Pre-Transition" },
  { id: "phase-2", label: "Records Handover" },
  { id: "phase-3", label: "Installation" },
  { id: "phase-4", label: "First 90 Days" },
  { id: "training", label: "Training Programme" },
];

export default function PhaseNavWrapper() {
  const [activeIdx, setActiveIdx] = useState(0);

  return <PhaseNav phases={PHASES} activeIdx={activeIdx} setActiveIdx={setActiveIdx} />;
}
