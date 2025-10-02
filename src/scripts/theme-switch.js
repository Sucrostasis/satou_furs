class ThemeSwitcher {
    constructor() {
        this.injectStyles();
        this.init();
        this.handleClickOutside();
    }

    injectStyles() {
        const style = document.createElement("style");
        style.textContent = `
            :root {
                --bg-color: #ffffff;
                --text-color: #000000;
            }

            body {
                background: var(--bg-color);
                color: var(--text-color);
                transition: background 0.3s, color 0.3s;
            }

            .theme-switcher {
                position: fixed;
                top: 10px;
                right: 10px;
                font-size: 18px; 
                z-index: 1000;
            }

            .theme-icon {
                cursor: pointer;
                padding: 4px;
                user-select: none;
            }

            .theme-menu {
                display: none;
                flex-direction: column;
                position: absolute;
                top: 100%;
                right: 0;
                margin-top: 5px;
                background: var(--bg-color);
                border: 1px solid #ccc;
                border-radius: 6px;
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(0,0,0,0.25);
                min-width: 120px; 
                font-size: 14px; 
            }

            .theme-menu.show {
                display: flex;
            }

            .theme-option {
                padding: 8px 12px; 
                cursor: pointer;
                transition: background 0.2s;
                text-align: left;
            }

            .theme-option:hover {
                background: rgba(0,0,0,0.1);
            }
        `;
        document.head.appendChild(style);
    }

    init() {
        const container = document.createElement("div");
        container.className = "theme-switcher";
        container.innerHTML = `
            <div class="theme-icon"></div>
            <div class="theme-menu">
                <div class="theme-option" data-theme="light">日间模式</div>
                <div class="theme-option" data-theme="dark"> 夜间模式</div>
            </div>
        `;
        document.body.appendChild(container);

        this.icon = container.querySelector(".theme-icon");
        this.menu = container.querySelector(".theme-menu");
        const options = container.querySelectorAll(".theme-option");

        this.icon.addEventListener("click", () => this.menu.classList.toggle("show"));

        options.forEach(opt => {
            opt.addEventListener("click", () => {
                this.setTheme(opt.dataset.theme);
                this.menu.classList.remove("show");
                localStorage.setItem("theme", opt.dataset.theme);
            });
        });

        const savedTheme = localStorage.getItem("theme") || "light";
        this.setTheme(savedTheme);
    }

    setTheme(theme) {
        if (theme === "dark") {
            document.documentElement.style.setProperty("--bg-color", "#1e1e1e");
            document.documentElement.style.setProperty("--text-color", "#f1f1f1");
            this.icon.textContent = "🌙";
        } else {
            document.documentElement.style.setProperty("--bg-color", "#ffffff");
            document.documentElement.style.setProperty("--text-color", "#000000");
            this.icon.textContent = "🌞";
        }
        document.body.setAttribute("data-theme", theme);
    }

    handleClickOutside() {
        document.addEventListener("click", (e) => {
            if (!e.target.closest(".theme-switcher")) {
                this.menu.classList.remove("show");
            }
        });
    }
}

window.addEventListener("DOMContentLoaded", () => new ThemeSwitcher());
