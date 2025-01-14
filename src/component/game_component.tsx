"use client";

import { GameScene } from "@/scene/game_scene";
import { useEffect, useRef, useState } from "react";

export default function GameComponent() {
    const [scene, setScene] = useState<GameScene | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (!scene) setScene(new GameScene());
        scene?.load();
        scene?.render(containerRef);
    });

    return (
        <div ref={containerRef}>
        </div>
    );
}