import { useEffect, useState } from "react";
import { NAME, COMPANY } from "./config";

const LINES = [
  { text: "Starting your Diwali greeting...", kind: "plain" },
  { text: "Lighting the diyas ............. done", kind: "ok" },
  { text: "Packing sweets and laddoos ..... done", kind: "ok" },
  { text: "Sending love to family & friends done", kind: "ok" },
  { text: `HAPPY DIWALI from ${NAME}, ${COMPANY}!`, kind: "big" },
];

export default function Terminal() {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (shown >= LINES.length) return;
    const id = setTimeout(() => setShown(shown + 1), shown === 0 ? 500 : 700);
    return () => clearTimeout(id);
  }, [shown]);

  return (
    <div className="screen">
      <div className="bar"><i /><i /><i /><span>Diwali Greeting</span></div>
      <div className="body">
        {LINES.slice(0, shown).map((l, i) => (
          <div key={i} className={"line " + l.kind}>&gt; {l.text}</div>
        ))}
        <div className="line">&gt; <span className="cursor" /></div>
      </div>
    </div>
  );
}
