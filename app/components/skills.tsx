import { skills } from "../../lib/skills";
import * as s from "./styles";

export function Skills() {
  return (
    <section className="section" data-reveal>
      <div className={`${s.sectionHead} breakout`}>
        <p className={s.sectionLabel}>Skills</p>
      </div>

      <div
        className="breakout grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3 md:grid-cols-4"
        data-reveal
        data-stagger
      >
        {skills.map((group) => (
          <div key={group.label}>
            <p className="mb-2 font-mono text-[0.6rem] uppercase tracking-widest text-faint">
              {group.label}
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="font-mono text-[0.7rem] lowercase border border-line bg-card px-2 py-0.5 text-muted transition-colors hover:border-accent/40 hover:text-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
