"use client";

import { Config } from "@/config/config";
import { GameState } from "@/models/game_state";
import { GameScene } from "@/scene/game_scene";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function GameComponent() {
    const [scene, setScene] = useState<GameScene | null>(null);
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const init = async () => {
        setupWebSocket();
        const div = containerRef.current;
        if (div) {
            const sc = new GameScene(div);
            sc.render(div);
            setScene(sc);
        }
    };

    const setupWebSocket = () => {
        const url: URL = new URL(Config.serverUrlWS);
        const roomId = uuidv4();
        const playerId = uuidv4();
        url.searchParams.append("roomId", roomId);
        url.searchParams.append("playerId", playerId);
        const socket = new WebSocket(url.toString());
        socket.onopen = webSocketOnOpen;
        socket.onmessage = webSocketOnMessage;
        setWebSocket(socket);
    };

    const webSocketOnOpen = (ev: Event) => {
        if (webSocket) {
        }
    }

    const webSocketOnMessage = (ev: MessageEvent) => {
        const state: GameState = GameState.fromJSON(JSON.parse(ev.data));
    }

    useEffect(() => {
        init();
    }, []);

    return <div ref={containerRef} className="flex grow"></div>;
}
