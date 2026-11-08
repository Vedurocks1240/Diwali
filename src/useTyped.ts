import { useEffect, useState } from "react";

// Shows text one letter at a time, like typing.
export function useTyped(text: string, speed = 20, run = true) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!run) return;
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, run, speed]);
  return out;
}
