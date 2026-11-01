import { Box } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() { return <div className="container not-found"><Box size={52} strokeWidth={1.2} /><p className="eyebrow">404 · Box empty</p><h1>Nothing is locked up here.</h1><p>The page may have moved, or future-you hid it somewhere responsible.</p><Button asChild><Link href="/">Return to Pausio.eu</Link></Button></div>; }
