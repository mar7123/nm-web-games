"use client";

import { GameScene } from "@/scene/game_scene";
import { useEffect, useRef, useState } from "react";

export default function GameComponent() {
    const [scene, setScene] = useState<GameScene | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        setScene(GameScene.getInstance());
        scene?.load();
        scene?.render();
        const domElement = scene?.getDOMElement();
        if (domElement) {
            containerRef.current?.appendChild(domElement);
        }
    });

    return (
        <div ref={containerRef}>
        </div>
    );
}