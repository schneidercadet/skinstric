import Landing from "../components/Landing";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
        <Landing />
      </div>
    </div>
  );
}
