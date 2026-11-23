import { experience } from "@/lib/site";
import { ArrowUpRight } from "lucide-react";

export function ExperienceList({ detailed = false }: { detailed?: boolean }) {
  return <div className="experience-list">{(detailed ? experience : experience.slice(0, 4)).map((entry, index) => <div className={`experience-row ${detailed ? "detailed" : ""} ${entry.upcoming ? "is-upcoming" : ""}`} key={`${entry.company}-${entry.role}`} data-career-status={entry.upcoming ? "upcoming" : "experience"}>
    <span className="chapter-index">0{index + 1}</span>
    <div><p className="eyebrow">{entry.upcoming ? <><span className="career-status-dot" /> Next chapter · Upcoming</> : detailed ? entry.period : entry.label}</p><h3>{entry.company}</h3><p className="role">{entry.role}{entry.upcoming && <ArrowUpRight size={14} aria-hidden="true" />}</p>{detailed && <p className="experience-description">{entry.description}</p>}{entry.upcoming && detailed && <p className="career-start"><time dateTime={entry.startDate}>{entry.period}</time> · Bengaluru, India</p>}</div>
    {!detailed && <span className="experience-date">{entry.startDate ? <time dateTime={entry.startDate}>{entry.period}</time> : entry.period}</span>}
  </div>)}</div>;
}
