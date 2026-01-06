// Instant Ko-fi Widget - Bottom Right Corner
(function() {
    if (document.querySelector('.kofi-floating-widget')) return;

    const kofiWidget = document.createElement('div');
    kofiWidget.className = 'kofi-floating-widget';
    kofiWidget.innerHTML = `
        <a href="https://ko-fi.com/princegahlot" target="_blank" rel="noopener noreferrer" class="kofi-button">
            <div class="kofi-content">
                <img src="https://storage.ko-fi.com/cdn/kofi_button_dark.png?v=1" alt="Support me on Ko-fi" class="kofi-icon">
                <span class="kofi-text">Buy me a coffee</span>
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
            transform: none !important;
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
        }

        .kofi-content {
            display: flex;
            align-items: center;
            gap: 8px;
            transition: opacity 0.3s ease;
        }

        .kofi-button:hover {
            width: 180px;
            border-radius: 50px;
            box-shadow: 0 10px 30px rgba(0, 133, 255, 0.6);
            transform: translateY(-5px);
        }

        .kofi-icon {
            width: 28px;
            height: 28px;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
        }

        .kofi-text {
            color: white;
            font-weight: 600;
            font-size: 15px;
            white-space: nowrap;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
            opacity: 0;
        }

        .kofi-button:hover .kofi-text {
            opacity: 1;
        }

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
                width: 160px;
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
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(kofiWidget);
})();