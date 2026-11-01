"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export function AdminLoginForm() {
  const params = useSearchParams();
  return <form className="admin-login card" action="/api/admin/session" method="post"><div><p className="eyebrow">Restricted area</p><h1>Pausio.eu experiment admin</h1><p>Sign in with a configured Supabase administrator account. Public registration is disabled.</p></div>{params.get("error") && <p className="field-error" role="alert">Sign-in failed. Check the credentials and administrator allowlist.</p>}<div className="field"><label htmlFor="admin-email">Email</label><input className="input" id="admin-email" name="email" type="email" autoComplete="username" required /></div><div className="field"><label htmlFor="admin-password">Password</label><input className="input" id="admin-password" name="password" type="password" autoComplete="current-password" required /></div><Button type="submit" size="lg">Sign in</Button></form>;
}
