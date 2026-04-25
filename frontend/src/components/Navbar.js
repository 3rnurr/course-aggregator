import { Link } from "react-router-dom";

function Navbar() {

  const token = localStorage.getItem("access");

  const logout = () => {
    localStorage.removeItem("access");
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="logo">CourseraX</div>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Главная</Link>
        <Link to="/courses" className="navbar-link">Курсы</Link>
        <Link to="/profile" className="navbar-link">Профиль</Link>
        {!token && (
          <>
            <Link to="/login" className="login-btn">Войти</Link>
            <Link to="/register" className="login-btn" style={{marginLeft: 10}}>Регистрация</Link>
          </>
        )}
        {token && (
          <button onClick={logout} className="login-btn" style={{marginLeft: 20}}>
            Выйти
          </button>
        )}
      </div>
    </nav>
  );
}
export default Navbar;