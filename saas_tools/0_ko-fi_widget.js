// Final Fixed Ko-fi Widget
(function() {
    // Function to initialize widget
    function initWidget() {
        if (document.querySelector('.kofi-floating-widget')) return;

        console.log("Ko-fi Widget Injecting..."); // Console check

        const kofiWidget = document.createElement('div');
        kofiWidget.className = 'kofi-floating-widget';
        kofiWidget.innerHTML = `
            <a href="https://ko-fi.com/princegahlot" target="_blank" class="kofi-btn-wrapper">
                <div class="kofi-btn-content">
                    <img src="https://storage.ko-fi.com/cdn/cup-border.png" alt="Ko-fi" class="kofi-img">
                    <span class="kofi-text">Support Me</span>
                </div>
            </a>
        `;

        const style = document.createElement('style');
        style.textContent = `
            .kofi-floating-widget {
                position: fixed !important;
                bottom: 25px !important;
                right: 25px !important;
                z-index: 2147483647 !important; /* Max Z-Index possible */
                display: block !important;
                opacity: 1 !important;
                visibility: visible !important;
            }

            .kofi-btn-wrapper {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 60px;
                height: 60px;
                background: #29abe0; /* Ko-fi Blue */
                border-radius: 50%;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                text-decoration: none;
                transition: all 0.3s ease;
                overflow: hidden;
                position: relative;
            }

            .kofi-btn-content {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
            }

            .kofi-img {
                width: 32px !important;
                height: auto !important;
                display: block !important;
                animation: kofi-wiggle 3s infinite;
            }

            .kofi-text {
                display: none; /* Mobile pe text hide rakh */
                color: white;
                font-family: sans-serif;
                font-weight: bold;
                margin-left: 10px;
                font-size: 16px;
                white-space: nowrap;
            }

            /* Hover Effect (Desktop only) */
            .kofi-btn-wrapper:hover {
                width: 160px;
                border-radius: 30px;
            }

            .kofi-btn-wrapper:hover .kofi-text {
                display: block;
            }

            @keyframes kofi-wiggle {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(-10deg); }
                75% { transform: rotate(10deg); }
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(kofiWidget);
        console.log("Ko-fi Widget Added Successfully");
    }

    // Wait for DOM to be ready (Ye line sabse important hai)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
})();
