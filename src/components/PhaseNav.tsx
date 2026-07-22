import { useEffect } from 'react';

const B = {
  blue: "#1E3A5F",
};

interface Phase {
  id: string;
  label: string;
}

interface PhaseNavProps {
  phases: Phase[];
  activeIdx: number;
  setActiveIdx: (idx: number) => void;
}

export default function PhaseNav({ phases, activeIdx, setActiveIdx }: PhaseNavProps) {
  useEffect(() => {
    const sectionIds = phases.map(p => p.id);

    const handleScroll = () => {
      let current = 0;
      sectionIds.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) current = i;
      });
      setActiveIdx(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [phases, setActiveIdx]);

  return (
    <nav
      className="sticky z-40 flex overflow-x-auto border-b border-gray-200 bg-white"
      style={{ top: "64px" }}
      role="navigation"
      aria-label="Phase navigation"
    >
      {phases.map((p, i) => {
        const isActive = activeIdx === i;
        return (
          <a
            key={p.id}
            href={`#${p.id}`}
            className="flex-shrink-0 flex items-center gap-2 px-5 py-4 text-base font-medium whitespace-nowrap transition-colors border-b-2 no-underline focus:outline-none focus:ring-2 focus:ring-brand-teal-dark focus:ring-offset-2"
            style={{
              color: isActive ? B.blue : "#4b5563",
              borderBottomColor: isActive ? B.blue : "transparent"
            }}
            aria-current={isActive ? "true" : undefined}
          >
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-base font-bold flex-shrink-0 bg-white"
              style={isActive
                ? { background: B.blue, color: "#fff", border: `1px solid ${B.blue}` }
                : { border: `1px solid ${B.blue}`, color: B.blue }
              }
            >
              {i + 1}
            </span>
            {p.label}
          </a>
        );
      })}
    </nav>
  );
}
