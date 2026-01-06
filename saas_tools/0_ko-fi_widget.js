// Ko-fi Floating Support Widget – Instant Appearance
(function() {
    // Avoid duplicate injection
    if (document.querySelector('.kofi-floating-widget')) return;

    // Create widget container
    const kofiWidget = document.createElement('div');
    kofiWidget.className = 'kofi-floating-widget';
    kofiWidget.innerHTML = `
        <a href="https://ko-fi.com/princegahlot" target="_blank" rel="noopener noreferrer" class="kofi-button">
            <img src="https://storage.ko-fi.com/cdn/kofi_button_dark.png?v=1" alt="Support me on Ko-fi" class="kofi-icon">
            <span class="kofi-text">Support me on Ko-fi</span>
        </a>
    `;

    // Inject styles
    const style = document.createElement('style');
    style.textContent = `
        .kofi-floating-widget {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 9999;
            opacity: 1;
            transform: translateY(0);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            transition: all 0.4s ease;
        }

        .kofi-button {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 20px;
            background: linear-gradient(135deg, #00b9fe 0%, #0085ff 100%);
            border-radius: 50px;
            text-decoration: none;
            box-shadow: 0 8px 24px rgba(0, 133, 255, 0.3);
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .kofi-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 30px rgba(0, 133, 255, 0.45);
            background: linear-gradient(135deg, #00a8e8 0%, #0077e6 100%);
        }

        .kofi-icon {
            width: 24px;
            height: 24px;
            border-radius: 4px;
        }

        .kofi-text {
            color: white;
            font-weight: 600;
            font-size: 14px;
            white-space: nowrap;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
        }

        @media (max-width: 768px) {
            .kofi-floating-widget {
                bottom: 20px;
                right: 20px;
            }
            .kofi-button {
                padding: 10px 16px;
                gap: 8px;
            }
            .kofi-text {
                font-size: 13px;
            }
            .kofi-icon {
                width: 20px;
                height: 20px;
            }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(kofiWidget);

    // Optional: Add close button (optional enhancement)
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
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 6px rgba(0,0,0,0.25);
        z-index: 10000;
    `;
    closeBtn.onclick = (e) => {
        e.stopPropagation();
        kofiWidget.style.display = 'none';
        localStorage.setItem('kofiWidgetHidden', 'true');
    };
    if (localStorage.getItem('kofiWidgetHidden') !== 'true') {
        kofiWidget.style.position = 'relative';
        kofiWidget.appendChild(closeBtn);
    } else {
        kofiWidget.style.display = 'none';
    }
})();