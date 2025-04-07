import Landing from "../components/Landing";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-50">
        <Navbar />
      </div>
      <div className="absolute inset-0">
        <Landing />
      </div>
    </div>
  );
}
