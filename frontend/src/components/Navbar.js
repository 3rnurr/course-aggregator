import { Link } from "react-router-dom";

function Navbar() {

  const token = localStorage.getItem("access");

  const logout = () => {
    localStorage.removeItem("access");
    window.location.href = "/";
  };

  return (
    <div style={styles.nav}>
      <h2>CourseHub</h2>

      <div>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/courses" style={styles.link}>Courses</Link>
        <Link to="/profile" style={styles.link}>Profile</Link>

        {!token && (
          <Link to="/login" style={styles.link}>Login</Link>
        )}

        {token && (
          <button onClick={logout} style={styles.btn}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 40px",
    background: "#2f6fce",
    color: "white"
  },
  link: {
    color: "white",
    marginLeft: 20,
    textDecoration: "none"
  },
  btn: {
    marginLeft: 20,
    padding: "6px 12px",
    cursor: "pointer"
  }
};

export default Navbar;