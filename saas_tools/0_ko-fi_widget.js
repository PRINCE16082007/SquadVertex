// Enhanced Ko-fi Support Widget with Animations and Responsive Design
(function() {
    if (document.querySelector('.kofi-floating-widget')) return;

    const kofiWidget = document.createElement('div');
    kofiWidget.className = 'kofi-floating-widget';
    kofiWidget.innerHTML = `
        <a href="https://ko-fi.com/YOUR_KOFI_USERNAME" target="_blank" rel="noopener noreferrer" class="kofi-button">
            <div class="kofi-content">
                <img src="https://storage.ko-fi.com/cdn/kofi_button_dark.png?v=1" alt="Support me on Ko-fi" class="kofi-icon">
                <span class="kofi-text">Buy me a coffee</span>
            </div>
            <div class="pulse-ring"></div>
        </a>
    `;

    const style = document.createElement('style');
    style.textContent = `
        .kofi-floating-widget {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 9999;
            opacity: 0;
            transform: translateY(20px) scale(0.9);
            animation: fadeInUp 0.6s ease-out forwards;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        .kofi-button {
            position: relative;
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

        .kofi-button:hover .kofi-content {
            opacity: 1;
        }

        .kofi-icon {
            width: 28px;
            height: 28px;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
            transition: transform 0.3s ease;
        }

        .kofi-button:hover .kofi-icon {
            transform: scale(1.1);
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

        .pulse-ring {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: inherit;
            opacity: 0.6;
            animation: pulse 2s infinite;
            z-index: -1;
        }

        @keyframes pulse {
            0% {
                transform: scale(0.8);
                opacity: 0.8;
            }
            100% {
                transform: scale(1.4);
                opacity: 0;
            }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .kofi-floating-widget {
                bottom: 20px;
                right: 20px;
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

        @media (max-width: 480px) {
            .kofi-button {
                width: 48px;
                height: 48px;
            }
            
            .kofi-button:hover {
                width: 150px;
            }
            
            .kofi-icon {
                width: 22px;
                height: 22px;
            }
        }

        /* Reduced motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
            .kofi-button,
            .kofi-text,
            .kofi-icon,
            .kofi-floating-widget {
                transition: none;
                animation: none;
            }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(kofiWidget);

    // Close button functionality
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: -8px;
        right: -8px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #ff4757;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        z-index: 10000;
        transition: all 0.2s ease;
    `;
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        kofiWidget.style.animation = 'fadeOut 0.4s ease forwards';
        setTimeout(() => {
            kofiWidget.style.display = 'none';
            localStorage.setItem('kofiWidgetHidden', 'true');
        }, 400);
    });

    @keyframes fadeOut {
        to { opacity: 0; transform: translateY(20px) scale(0.9); }
    }

    if (!localStorage.getItem('kofiWidgetHidden')) {
        kofiWidget.appendChild(closeBtn);
    } else {
        kofiWidget.style.display = 'none';
    }
})();