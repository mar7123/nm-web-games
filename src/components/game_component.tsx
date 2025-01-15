"use client";

import { GameScene } from "@/scene/game_scene";
import { useEffect, useRef, useState } from "react";

export default function GameComponent() {
  const [scene, setScene] = useState<GameScene | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const init = async () => {
    const div = containerRef.current;
    if (div) {
      const sc = new GameScene(div);
      sc.load();
      sc.render(div);
      setScene(sc);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <div ref={containerRef} className="flex grow"></div>;
}
