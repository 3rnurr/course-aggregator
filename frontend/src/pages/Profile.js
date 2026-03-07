import { useEffect, useState } from "react";


function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const styles = {
    container: {
      maxWidth: "900px",
      margin: "40px auto",
      padding: "20px"
    },
    card: {
      background: "white",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      marginBottom: "20px"
    },
    avatar: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      background: "#2563eb",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "28px",
      fontWeight: "bold"
    },
    name: {
      fontSize: "22px",
      fontWeight: "600"
    },
    email: {
      color: "#555"
    },
    button: {
      marginTop: "20px",
      padding: "10px 16px",
      border: "none",
      background: "#ef4444",
      color: "white",
      borderRadius: "6px",
      cursor: "pointer"
    }
  };

  return (
    <div>
    

      <div style={styles.container}>
        <div style={styles.card}>
          {user ? (
            <>
              <div style={styles.header}>
                <div style={styles.avatar}>
                  {user.username?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <div style={styles.name}>{user.username}</div>
                  <div style={styles.email}>{user.email}</div>
                </div>
              </div>

              <button style={styles.button} onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <p>Пользователь не найден</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;