import { memo } from 'react';
import { NAV_ITEMS } from '@data/profile';
import './Navbar.css';

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const Navbar = memo(function Navbar() {
  return (
    <nav className="hero-nav">
      <div
        className="hero-text hero-nav__logo"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <img src="/logo.png" alt="Yashank Logo" className="hero-nav__logo-img" loading="lazy" />
        <span className="hero-nav__logo-name">Yashank Gupta</span>
      </div>

      <ul className="hero-nav__links">
        {NAV_ITEMS.map((item) => (
          <li
            key={item}
            className="hero-text hero-nav__link"
            onClick={() => scrollTo(item.toLowerCase())}
          >
            {item}
          </li>
        ))}
      </ul>

      <div
        className="hero-text hero-nav__badge"
        onClick={() => scrollTo('contact')}
      >
        <span className="hero-nav__badge-dot" />
        Available to Hire
      </div>
    </nav>
  );
});

export default Navbar;
