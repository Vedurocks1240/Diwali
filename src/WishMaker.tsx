import { useState } from "react";
import { NAME, COMPANY, WISHES } from "./config";
import { useTyped } from "./useTyped";

export default function WishMaker() {
  const [to, setTo] = useState("");
  const [pick, setPick] = useState(0);
  const [started, setStarted] = useState(false);
  const [copied, setCopied] = useState(false);

  const message = `Happy Diwali, ${to.trim() || "Friend"}! ${WISHES[pick]}\n\nWith love,`;
  const typed = useTyped(message, 15, started);

  const make = () => {
    setPick((pick + 1 + Math.floor(Math.random() * (WISHES.length - 1))) % WISHES.length);
    setStarted(true);
    setCopied(false);
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* browser blocked copying */ }
  };

  return (
    <div className="screen">
      <div className="bar"><i /><i /><i /><span>Make a wish for someone</span></div>
      <div className="body">
        <label htmlFor="to" className="line">&gt; Who is this wish for?</label>
        <input id="to" className="field" placeholder="Type a name, like Mom or Rahul"
          value={to} maxLength={30} onChange={(e) => setTo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && make()} />
        <div className="row">
          <button className="btn" onClick={make}>Make my wish</button>
          {started && <button className="btn ghost" onClick={copy}>{copied ? "Copied!" : "Copy"}</button>}
          {started && (
            <a className="btn ghost" target="_blank" rel="noreferrer"
              href={`https://wa.me/?text=${encodeURIComponent(message)}`}>Send on WhatsApp</a>
          )}
        </div>
        <pre className="out" aria-live="polite">{started ? typed : "Your wish will appear here."}</pre>
      </div>
    </div>
  );
}
