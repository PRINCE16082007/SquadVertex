// Ko-fi Floating Support Widget
(function() {
    // Check if widget already exists to avoid duplicates
    if (document.querySelector('.kofi-floating-widget')) {
        return;
    }

    // Create the Ko-fi widget element
    const kofiWidget = document.createElement('div');
    kofiWidget.className = 'kofi-floating-widget';
    kofiWidget.innerHTML = `
        <a href="https://ko-fi.com/princegahlot" target="_blank" rel="noopener noreferrer" class="kofi-button">
            <img src="https://storage.ko-fi.com/cdn/kofi_button_dark.png?v=1" alt="Buy Me a Coffee at ko-fi.com" class="kofi-icon">
            <span class="kofi-text">Support me on Ko-fi</span>
        </a>
    `;

    // Add styles for the widget
    const style = document.createElement('style');
    style.textContent = `
        .kofi-floating-widget {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 9999;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.5s ease-in-out;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .kofi-floating-widget.show {
            opacity: 1;
            transform: translateY(0);
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
            border: none;
            cursor: pointer;
            overflow: hidden;
        }

        .kofi-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 30px rgba(0, 133, 255, 0.4);
            background: linear-gradient(135deg, #00a8e8 0%, #0077e6 100%);
        }

        .kofi-icon {
            width: 24px;
            height: 24px;
            border-radius: 4px;
            object-fit: contain;
        }

        .kofi-text {
            color: white;
            font-weight: 600;
            font-size: 14px;
            white-space: nowrap;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
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

    // Append style to head
    document.head.appendChild(style);

    // Append widget to body
    document.body.appendChild(kofiWidget);

    // Show the widget after 2 minutes (120000 milliseconds)
    setTimeout(() => {
        kofiWidget.classList.add('show');
    }, 120000);

    // Optional: Add close functionality
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.className = 'kofi-close-btn';
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
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    `;

    // Add close button functionality
    closeBtn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        kofiWidget.style.display = 'none';
        // Optionally store in localStorage to remember user preference
        localStorage.setItem('kofiWidgetHidden', 'true');
    };

    // Check if widget was previously hidden
    if (localStorage.getItem('kofiWidgetHidden') === 'true') {
        kofiWidget.style.display = 'none';
    }
})();