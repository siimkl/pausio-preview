"use client";

import { LockKeyhole } from "lucide-react";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

const accessKey = "pausio-share-access";

export function SharePasswordGate({ children }: { children: ReactNode }) {
  const requiredPassword = process.env.NEXT_PUBLIC_SHARE_PASSWORD || "";
  const [ready, setReady] = useState(!requiredPassword);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!requiredPassword || window.sessionStorage.getItem(accessKey) === "granted") queueMicrotask(() => setReady(true));
  }, [requiredPassword]);

  const unlock = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== requiredPassword) {
      setError("That password is not correct.");
      return;
    }
    window.sessionStorage.setItem(accessKey, "granted");
    setError("");
    setReady(true);
  };

  if (ready) return children;

  return (
    <div className="share-gate">
      <form className="share-gate-card" onSubmit={unlock}>
        <div className="share-gate-icon"><LockKeyhole size={28} aria-hidden="true" /></div>
        <p className="eyebrow">Private preview</p>
        <h1>Pausio.eu</h1>
        <p>This preview is being shared with a small group. Enter the password to continue.</p>
        <div className="field">
          <label htmlFor="share-password">Password</label>
          <input className="input" id="share-password" type="password" autoComplete="current-password" autoFocus value={password} onChange={(event) => setPassword(event.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? "share-password-error" : undefined} />
          {error && <p className="field-error" id="share-password-error" role="alert">{error}</p>}
        </div>
        <Button size="lg" type="submit">Open preview</Button>
      </form>
    </div>
  );
}
