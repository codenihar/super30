const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <h1>My App</h1>
      </div>
      <ul className="navbar__links">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
