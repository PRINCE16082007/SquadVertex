// Enhanced Ko-fi Widget for Prince Gahlot (Fixed Icon)
(function() {
    // Check if widget already exists to prevent duplicates
    if (document.querySelector('.kofi-floating-widget')) return;

    const kofiWidget = document.createElement('div');
    kofiWidget.className = 'kofi-floating-widget';
    kofiWidget.innerHTML = `
        <a href="https://ko-fi.com/princegahlot" target="_blank" rel="noopener noreferrer" class="kofi-button">
            <div class="kofi-content">
                <svg class="kofi-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 8V20C2 21.6569 3.34315 23 5 23H17C18.6569 23 20 21.6569 20 20V8H2ZM18 19C18 19.5523 17.5523 20 17 20H5C4.44772 20 4 19.5523 4 19V10H18V19ZM16 4H8C7.44772 4 7 4.44772 7 5V7H5V5C5 3.34315 6.34315 2 8 2H16C17.6569 2 19 3.34315 19 5V7H17V5C17 4.44772 16.5523 4 16 4Z" fill="white"/>
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
            z-index: 99999 !important; /* Increased z-index to be on top of everything */
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .kofi-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #29abe0 0%, #0085FF 100%); /* Ko-fi Blue Brand Colors */
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
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(45deg, #00B9FE, #0085FF, #00B9FE);
            border-radius: 50%;
            z-index: -1;
            opacity: 0;
            transition: opacity 0.4s ease;
        }

        .kofi-button:hover::before {
            opacity: 1;
        }

        .kofi-content {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .kofi-button:hover {
            width: 160px;
            border-radius: 50px;
            box-shadow: 0 10px 30px rgba(0, 133, 255, 0.6);
            transform: translateY(-5px);
        }

        .kofi-icon {
            width: 28px;
            height: 28px;
            min-width: 28px; /* Ensures icon doesn't shrink */
            transition: transform 0.3s ease;
        }

        .kofi-button:hover .kofi-icon {
            transform: rotate(-10deg) scale(1.1);
        }

        .kofi-text {
            color: white;
            font-weight: 700;
            font-size: 15px;
            white-space: nowrap;
            opacity: 0;
            transform: translateX(-10px);
            transition: all 0.3s ease;
            position: absolute; /* Fix for smooth text appearance */
            left: 50px;
        }

        .kofi-button:hover .kofi-text {
            opacity: 1;
            transform: translateX(0);
            position: relative; /* Returns to relative flow on hover */
            left: auto;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
            .kofi-floating-widget {
                bottom: 20px !important;
                right: 20px !important;
            }
            .kofi-button {
                width: 50px;
                height: 50px;
            }
            .kofi-button:hover {
                width: 140px;
            }
            .kofi-icon {
                width: 24px;
                height: 24px;
                min-width: 24px;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(kofiWidget);
})();
