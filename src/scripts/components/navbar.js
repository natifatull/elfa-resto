class Navbar extends HTMLElement {
  constructor() {
    super();
    this.url = window.location.hostname.includes('github.io') ? 'elfa-resto' : '/';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <nav>
        <div class="menu-hp">
          <div>
            <a href="${this.url}" class="logo-font"> Nafa Resto </a>
          </div>

          <div class="menu-container">
            <button
              class="menu"
              aria-label="button menu dropdown on mobile"
              type="button"
            >
              <span class="fa fa-bars"></span>
            </button>
          </div>
        </div>

        <ul class="nav-list">
          <li class="nav-item"><a href="${this.url}">Home</a></li>
          <li class="nav-item"><a href="#/favorite">Favorite</a></li>
          <li class="nav-item">
            <a
              href="https://github.com/natifatull"
              target="_blank"
              rel="noopener noreferrer"
              >About</a
            >
          </li>
        </ul>
      </nav>
    `;
  }
}

customElements.define('nav-bar', Navbar);
