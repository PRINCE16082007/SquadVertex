// Stunning Ko-fi Support Widget for Prince Gahlot
(function() {
    // Avoid duplicate widgets
    if (document.querySelector('.prince-kofi-widget')) return;

    // Create widget container
    const widget = document.createElement('div');
    widget.className = 'prince-kofi-widget';
    widget.innerHTML = `
        <a href="https://ko-fi.com/princegahlot" target="_blank" rel="noopener noreferrer" class="kofi-support-link">
            <div class="kofi-content">
                <svg class="kofi-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
                    <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" fill="none"/>
                </svg>
                <div class="kofi-text-container">
                    <span class="kofi-main-text">Support Prince</span>
                    <span class="kofi-sub-text">Buy me a coffee</span>
                </div>
            </div>
        </a>
    `;

    // Inject styles
    const style = document.createElement('style');
    style.textContent = `
        .prince-kofi-widget {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 9999;
            opacity: 1;
            transform: translateY(0);
            transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .kofi-support-link {
            display: block;
            text-decoration: none;
            outline: none;
            border: none;
        }

        .kofi-content {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px 24px;
            background: linear-gradient(135deg, #FF5E5B 0%, #FF9D5C 100%);
            border-radius: 18px;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            box-shadow: 
                0 10px 30px rgba(255, 94, 91, 0.3),
                0 4px 6px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            cursor: pointer;
            overflow: hidden;
            position: relative;
        }

        .kofi-content::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.8s;
        }

        .kofi-content:hover::before {
            left: 100%;
        }

        .kofi-icon {
            width: 28px;
            height: 28px;
            min-width: 28px;
            color: white;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }

        .kofi-text-container {
            display: flex;
            flex-direction: column;
        }

        .kofi-main-text {
            color: white;
            font-weight: 700;
            font-size: 15px;
            letter-spacing: -0.2px;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .kofi-sub-text {
            color: rgba(255, 255, 255, 0.9);
            font-weight: 500;
            font-size: 12px;
            margin-top: 2px;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .kofi-content:hover {
            transform: translateY(-4px) scale(1.02);
            box-shadow: 
                0 15px 40px rgba(255, 94, 91, 0.4),
                0 6px 12px rgba(0, 0, 0, 0.15);
        }

        .kofi-content:active {
            transform: translateY(-2px) scale(0.99);
        }

        /* Pulse animation for attention */
        @keyframes pulse {
            0% { box-shadow: 0 10px 30px rgba(255, 94, 91, 0.3); }
            50% { box-shadow: 0 10px 40px rgba(255, 94, 91, 0.5); }
            100% { box-shadow: 0 10px 30px rgba(255, 94, 91, 0.3); }
        }

        .kofi-content {
            animation: pulse 3s infinite;
        }

        @media (max-width: 768px) {
            .prince-kofi-widget {
                bottom: 20px;
                right: 20px;
            }
            
            .kofi-content {
                padding: 14px 20px;
                gap: 10px;
            }
            
            .kofi-icon {
                width: 24px;
                height: 24px;
            }
            
            .kofi-main-text {
                font-size: 14px;
            }
            
            .kofi-sub-text {
                font-size: 11px;
            }
        }

        /* Smooth entrance */
        .prince-kofi-widget {
            animation: slideUp 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(widget);
})();