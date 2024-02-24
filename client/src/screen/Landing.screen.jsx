import { AppHeader } from "@/components/app-header";
import { Feed } from "@/components/feed";
import "tailwindcss/tailwind.css";
export default function LandingScreen() {
  return (
    <div className="mx-14">
      <AppHeader />
      <Feed />
    </div>
  );
}
