// network-effects.js - Effets réseau tout en bleu
document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const connectionsContainer = document.createElement('div');
    connectionsContainer.id = 'network-effects';
    connectionsContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    header.appendChild(connectionsContainer);

    // Nœuds du réseau (points de connexion)
    const networkNodes = [
        { x: 10, y: 20 }, { x: 25, y: 40 }, { x: 40, y: 15 }, 
        { x: 60, y: 30 }, { x: 75, y: 50 }, { x: 90, y: 25 },
        { x: 15, y: 70 }, { x: 35, y: 85 }, { x: 65, y: 75 },
        { x: 85, y: 90 }, { x: 50, y: 60 }, { x: 30, y: 30 }
    ];

    // Créer les nœuds fixes
    networkNodes.forEach(node => {
        createNetworkNode(node.x, node.y);
    });

    // Connexions permanentes entre nœuds
    createStaticConnections();

    // Effets de transfert de données
    startDataTransfers();

    // Paquets réseau aléatoires
    startNetworkPackets();

    // Signaux en bleu seulement
    startBlueSignals();

    function createNetworkNode(x, y) {
        const node = document.createElement('div');
        node.className = 'network-node';
        node.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: 6px;
            height: 6px;
            background: rgba(59, 130, 246, 0.8);
            border-radius: 50%;
            box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
            transform: translate(-50%, -50%);
        `;
        connectionsContainer.appendChild(node);
    }

    function createStaticConnections() {
        // Créer des connexions fixes entre certains nœuds
        const connections = [
            [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
            [0, 6], [6, 7], [7, 8], [8, 9],
            [1, 10], [10, 11], [11, 3]
        ];

        connections.forEach(([start, end]) => {
            if (networkNodes[start] && networkNodes[end]) {
                createConnectionLine(networkNodes[start], networkNodes[end]);
            }
        });
    }

    function createConnectionLine(startNode, endNode) {
        const line = document.createElement('div');
        line.className = 'network-connection';
        
        const dx = endNode.x - startNode.x;
        const dy = endNode.y - startNode.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        line.style.cssText = `
            position: absolute;
            left: ${startNode.x}%;
            top: ${startNode.y}%;
            width: ${length}vw;
            height: 1px;
            background: linear-gradient(90deg, 
                transparent, 
                rgba(99, 102, 241, 0.4) 20%, 
                rgba(99, 102, 241, 0.7) 50%, 
                rgba(99, 102, 241, 0.4) 80%, 
                transparent
            );
            transform-origin: 0 0;
            transform: rotate(${angle}deg);
            opacity: 0.4;
        `;
        
        connectionsContainer.appendChild(line);
    }

    function startDataTransfers() {
        setInterval(() => {
            // Choisir deux nœuds aléatoires pour un transfert
            const startIdx = Math.floor(Math.random() * networkNodes.length);
            let endIdx;
            do {
                endIdx = Math.floor(Math.random() * networkNodes.length);
            } while (endIdx === startIdx);
            
            createDataTransfer(networkNodes[startIdx], networkNodes[endIdx]);
        }, 800);
    }

    function createDataTransfer(startNode, endNode) {
        const dataPacket = document.createElement('div');
        dataPacket.className = 'data-packet';
        
        dataPacket.style.cssText = `
            position: absolute;
            left: ${startNode.x}%;
            top: ${startNode.y}%;
            width: 4px;
            height: 4px;
            background: #3b82f6;
            border-radius: 50%;
            box-shadow: 0 0 12px #3b82f6;
            transform: translate(-50%, -50%);
            z-index: 10;
        `;
        
        connectionsContainer.appendChild(dataPacket);
        
        // Animation du paquet
        const dx = endNode.x - startNode.x;
        const dy = endNode.y - startNode.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const duration = distance * 30 + 500;
        
        dataPacket.animate([
            { 
                transform: `translate(-50%, -50%)`,
                opacity: 1
            },
            { 
                transform: `translate(calc(-50% + ${dx}vw), calc(-50% + ${dy}vh))`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'linear'
        }).onfinish = () => {
            dataPacket.remove();
        };
    }

    function startNetworkPackets() {
        setInterval(() => {
            createNetworkPacket();
        }, 400);
    }

    function createNetworkPacket() {
        const packet = document.createElement('div');
        packet.className = 'network-packet';
        
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const endX = Math.random() * 100;
        const endY = Math.random() * 100;
        
        packet.style.cssText = `
            position: absolute;
            left: ${startX}%;
            top: ${startY}%;
            width: 8px;
            height: 3px;
            background: linear-gradient(90deg, #60a5fa, #38bdf8);
            border-radius: 2px;
            box-shadow: 0 0 15px rgba(96, 165, 250, 0.7);
            transform: translate(-50%, -50%);
            opacity: 0;
        `;
        
        connectionsContainer.appendChild(packet);
        
        const dx = endX - startX;
        const dy = endY - startY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        packet.animate([
            { 
                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                opacity: 0,
                width: '0px'
            },
            { 
                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                opacity: 1,
                width: '12px'
            },
            { 
                transform: `translate(calc(-50% + ${dx}vw), calc(-50% + ${dy}vh)) rotate(${angle}deg)`,
                opacity: 0,
                width: '8px'
            }
        ], {
            duration: 2000,
            easing: 'ease-in-out'
        }).onfinish = () => {
            packet.remove();
        };
    }

    function startBlueSignals() {
        setInterval(() => {
            createBlueSignal();
        }, 2000);
    }

    function createBlueSignal() {
        const signal = document.createElement('div');
        signal.className = 'blue-signal';
        
        const centerX = 20 + Math.random() * 60;
        const centerY = 20 + Math.random() * 60;
        
        signal.style.cssText = `
            position: absolute;
            left: ${centerX}%;
            top: ${centerY}%;
            width: 4px;
            height: 4px;
            background: #60a5fa;
            border-radius: 50%;
            box-shadow: 0 0 20px #60a5fa;
            transform: translate(-50%, -50%);
        `;
        
        connectionsContainer.appendChild(signal);
        
        // Ondes bleues concentriques
        for (let i = 1; i <= 2; i++) {
            setTimeout(() => {
                createBlueWave(centerX, centerY, i);
            }, i * 300);
        }
        
        setTimeout(() => {
            signal.remove();
        }, 1200);
    }

    function createBlueWave(centerX, centerY, waveNum) {
        const wave = document.createElement('div');
        wave.className = 'blue-wave';
        
        wave.style.cssText = `
            position: absolute;
            left: ${centerX}%;
            top: ${centerY}%;
            width: 20px;
            height: 20px;
            border: 1px solid rgba(96, 165, 250, 0.6);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            opacity: 1;
        `;
        
        connectionsContainer.appendChild(wave);
        
        wave.animate([
            { 
                transform: 'translate(-50%, -50%) scale(1)',
                opacity: 1
            },
            { 
                transform: 'translate(-50%, -50%) scale(5)',
                opacity: 0
            }
        ], {
            duration: 1500,
            easing: 'ease-out'
        }).onfinish = () => {
            wave.remove();
        };
    }

    // Effets de pulsation sur les nœuds
    function startNodePulsation() {
        setInterval(() => {
            const randomNode = document.querySelector('.network-node');
            if (randomNode) {
                randomNode.animate([
                    { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.8 },
                    { transform: 'translate(-50%, -50%) scale(1.5)', opacity: 1 },
                    { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.8 }
                ], {
                    duration: 1000,
                    easing: 'ease-in-out'
                });
            }
        }, 1500);
    }

    startNodePulsation();
});