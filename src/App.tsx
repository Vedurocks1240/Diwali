import { useEffect, useState } from "react";
import Fireworks from "./Fireworks";
import Terminal from "./Terminal";
import WishMaker from "./WishMaker";
import { useTyped } from "./useTyped";
import { NAME, COMPANY, WISHES, GROUPS } from "./config";

export default function App() {
  const [dark, setDark] = useState(true);
  const [i, setI] = useState(0);
  const title = useTyped("Happy Diwali", 90);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % WISHES.length), 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={"app " + (dark ? "dark" : "light")}>
      <Fireworks dark={dark} />

      <header className="top">
        <div className="brand">{COMPANY}</div>
        <button className="toggle" onClick={() => setDark(!dark)} aria-label="Switch dark or light mode">
          <span className="knob" />
          {dark ? "Night" : "Day"}
        </button>
      </header>

      <main>
        <section className="hero">
          <div className="diya" aria-hidden="true"><div className="flame" /><div className="bowl" /></div>
          <h1>{title}<span className="cursor" /></h1>
          <p className="sub">
            Wishing you light, love and happiness, from <b>{NAME}</b> and <b>{COMPANY}</b>.
          </p>
          <p className="hint">Tap anywhere for fireworks</p>
        </section>

        <section className="panel"><Terminal /></section>

        <section className="panel">
          <h2>Wishes for everyone</h2>
          <div className="wish" key={i}>{WISHES[i]}</div>
          <div className="tags">
            {GROUPS.map((g) => <span key={g} className="tag">Happy Diwali, {g}</span>)}
          </div>
        </section>

        <section className="panel">
          <h2>Send your own wish</h2>
          <WishMaker />
        </section>
      </main>

      <footer>
        <span>Made with love by {NAME}, {COMPANY}</span>
        <span>Shubh Deepavali</span>
      </footer>
    </div>
  );
}
