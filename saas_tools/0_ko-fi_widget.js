// Enhanced Ko-fi Widget for Prince Gahlot
(function() {
    if (document.querySelector('.kofi-floating-widget')) return;

    const kofiWidget = document.createElement('div');
    kofiWidget.className = 'kofi-floating-widget';
    kofiWidget.innerHTML = `
        <a href="https://ko-fi.com/princegahlot" target="_blank" rel="noopener noreferrer" class="kofi-button">
            <div class="kofi-content">
                <svg class="kofi-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13.5v9l6-4.5-6-4.5z" fill="white"/>
                </svg>
                <span class="kofi-text">Support me</span>
            </div>
        </a>
    `;

    const style = document.createElement('style');
    style.textContent = `
        .kofi-floating-widget {
            position: fixed !important;
            bottom: 30px !important;
            right: 30px !important;
            z-index: 9999 !important;
            opacity: 1 !important;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .kofi-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #00B9FE 0%, #0085FF 100%);
            box-shadow: 0 6px 20px rgba(0, 133, 255, 0.4);
            text-decoration: none;
            overflow: hidden;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            cursor: pointer;
            position: relative;
        }

        .kofi-button::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, #00B9FE, #0085FF, #00B9FE);
            border-radius: 50%;
            z-index: -1;
            opacity: 0;
            transition: opacity 0.4s ease;
        }

        .kofi-button:hover::before {
            opacity: 1;
            animation: borderGlow 2s linear infinite;
        }

        @keyframes borderGlow {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
        }

        .kofi-content {
            display: flex;
            align-items: center;
            gap: 8px;
            transition: opacity 0.3s ease;
        }

        .kofi-button:hover {
            width: 160px;
            border-radius: 50px;
            box-shadow: 0 10px 30px rgba(0, 133, 255, 0.6);
            transform: translateY(-5px) scale(1.05);
        }

        .kofi-icon {
            width: 28px;
            height: 28px;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
            transition: transform 0.3s ease;
        }

        .kofi-button:hover .kofi-icon {
            transform: scale(1.2) rotate(5deg);
        }

        .kofi-text {
            color: white;
            font-weight: 600;
            font-size: 15px;
            white-space: nowrap;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
            opacity: 0;
            transform: translateX(-10px);
            transition: all 0.3s ease 0.1s;
        }

        .kofi-button:hover .kofi-text {
            opacity: 1;
            transform: translateX(0);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .kofi-floating-widget {
                bottom: 20px !important;
                right: 20px !important;
            }
            .kofi-button {
                width: 52px;
                height: 52px;
            }
            .kofi-button:hover {
                width: 140px;
                border-radius: 50px;
            }
            .kofi-icon {
                width: 24px;
                height: 24px;
            }
            .kofi-text {
                font-size: 14px;
            }
        }

        /* Glow effect on hover */
        .kofi-button:hover {
            animation: glowPulse 1.5s infinite alternate;
        }

        @keyframes glowPulse {
            from { box-shadow: 0 6px 20px rgba(0, 133, 255, 0.4); }
            to { box-shadow: 0 10px 30px rgba(0, 133, 255, 0.8); }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(kofiWidget);
})();