import { useEffect, useState } from "react";
import api from "../api";

function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    email: "",
    first_name: "",
    last_name: ""
  });
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("profile/");
      setUser(response.data);
      setEditForm({
        email: response.data.email || "",
        first_name: response.data.first_name || "",
        last_name: response.data.last_name || ""
      });
      setFavorites(response.data.favorites || []);
    } catch (error) {
      console.error("Error fetching profile:", error);
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (user) {
      setEditForm({
        email: user.email || "",
        first_name: user.first_name || "",
        last_name: user.last_name || ""
      });
    }
  };

  const handleSaveEdit = async () => {
    try {
      const response = await api.patch("profile/", editForm);
      setUser(response.data);
      setIsEditing(false);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Ошибка при обновлении профиля");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const removeFromFavorites = async (courseId) => {
    try {
      await api.post("favorites/remove/", { course_id: courseId });
      setFavorites(favorites.filter(f => f.id !== courseId));
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
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
      cursor: "pointer",
      marginRight: "10px"
    },
    editButton: {
      marginTop: "20px",
      padding: "10px 16px",
      border: "none",
      background: "#2563eb",
      color: "white",
      borderRadius: "6px",
      cursor: "pointer",
      marginRight: "10px"
    },
    input: {
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ddd",
      marginBottom: "10px",
      width: "100%",
      maxWidth: "300px"
    },
    section: {
      marginTop: "30px",
      paddingTop: "20px",
      borderTop: "1px solid #eee"
    },
    sectionTitle: {
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "15px"
    },
    favoriteCard: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px",
      background: "#f8f9fa",
      borderRadius: "8px",
      marginBottom: "10px"
    },
    favoriteTitle: {
      fontWeight: "500"
    },
    removeBtn: {
      padding: "6px 12px",
      border: "none",
      background: "#dc2626",
      color: "white",
      borderRadius: "4px",
      cursor: "pointer"
    },
    noFavorites: {
      color: "#666",
      fontStyle: "italic"
    }
  };

  if (loading) {
    return <div style={{...styles.container, textAlign: "center"}}>Загрузка...</div>;
  }

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

              {isEditing ? (
                <div>
                  <div style={{marginBottom: "10px"}}>
                    <label style={{display: "block", marginBottom: "5px"}}>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleInputChange}
                      style={styles.input}
                    />
                  </div>
                  <div style={{marginBottom: "10px"}}>
                    <label style={{display: "block", marginBottom: "5px"}}>Имя:</label>
                    <input
                      type="text"
                      name="first_name"
                      value={editForm.first_name}
                      onChange={handleInputChange}
                      style={styles.input}
                    />
                  </div>
                  <div style={{marginBottom: "10px"}}>
                    <label style={{display: "block", marginBottom: "5px"}}>Фамилия:</label>
                    <input
                      type="text"
                      name="last_name"
                      value={editForm.last_name}
                      onChange={handleInputChange}
                      style={styles.input}
                    />
                  </div>
                  <button style={styles.editButton} onClick={handleSaveEdit}>
                    Сохранить
                  </button>
                  <button style={styles.button} onClick={handleCancelEdit}>
                    Отмена
                  </button>
                </div>
              ) : (
                <div>
                  <div style={{marginTop: "15px"}}>
                    <strong>Имя:</strong> {user.first_name || "—"}
                  </div>
                  <div style={{marginTop: "10px"}}>
                    <strong>Фамилия:</strong> {user.last_name || "—"}
                  </div>
                  <button style={styles.editButton} onClick={handleEditClick}>
                    Редактировать профиль
                  </button>
                  <button style={styles.button} onClick={handleLogout}>
                    Выйти
                  </button>
                </div>
              )}

              <div style={styles.section}>
                <div style={styles.sectionTitle}>Избранные курсы</div>
                {favorites.length > 0 ? (
                  favorites.map(course => (
                    <div key={course.id} style={styles.favoriteCard}>
                      <div>
                        <div style={styles.favoriteTitle}>{course.title}</div>
                        <div style={{fontSize: "12px", color: "#666"}}>{course.platform}</div>
                      </div>
                      <button 
                        style={styles.removeBtn}
                        onClick={() => removeFromFavorites(course.id)}
                      >
                        Удалить
                      </button>
                    </div>
                  ))
                ) : (
                  <div style={styles.noFavorites}>У вас пока нет избранных курсов</div>
                )}
              </div>
            </>
          ) : (
            <>
              <div style={styles.header}>
                <div style={styles.avatar}>
                  {(localStorage.getItem("username") || "П").charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={styles.name}>{localStorage.getItem("username") || "Гость"}</div>
                  <div style={styles.email}>email не найден</div>
                </div>
              </div>
              <button style={{...styles.button, background: "#4e54c8"}} onClick={handleLogout}>
                Выйти
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;