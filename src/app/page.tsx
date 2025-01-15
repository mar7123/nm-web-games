import GameComponent from "@/components/game_component";

export default function Home() {
  return (
    <div className="flex flex-col h-screen w-screen overscroll-none overflow-clip">
      <div className="flex-none h-14"></div>
      <GameComponent />
    </div>
  );
}
