import React, { useState, useEffect } from 'react';
import api from '../api';

const images = {
  "Django Course": "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
  "Python для начинающих": "https://cdn-icons-png.flaticon.com/512/5968/5968350.png",
  "React Fundamentals": "https://cdn-icons-png.flaticon.com/512/1126/1126012.png",
  "Data Science": "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
  "Machine Learning": "https://cdn-icons-png.flaticon.com/512/2721/2721297.png",
  "JavaScript Pro": "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
  "SQL для аналитиков": "https://cdn-icons-png.flaticon.com/512/4248/4248443.png",
  "HTML & CSS": "https://cdn-icons-png.flaticon.com/512/732/732212.png",
  "Алгоритмы и структуры данных": "https://cdn-icons-png.flaticon.com/512/2721/2721297.png",
  "Docker для начинающих": "https://cdn-icons-png.flaticon.com/512/919/919853.png",
  "DevOps практики": "https://cdn-icons-png.flaticon.com/512/4248/4248443.png",
  "Kubernetes": "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
  "FastAPI": "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
  "Vue.js": "https://cdn-icons-png.flaticon.com/512/2111/2111646.png",
  "PostgreSQL": "https://cdn-icons-png.flaticon.com/512/5968/5968342.png",
  "Git и GitHub": "https://cdn-icons-png.flaticon.com/512/2111/2111288.png",
  "Linux для разработчиков": "https://cdn-icons-png.flaticon.com/512/226/226772.png",
  "C++ с нуля": "https://cdn-icons-png.flaticon.com/512/6132/6132222.png",
  "Java для начинающих": "https://cdn-icons-png.flaticon.com/512/226/226777.png",
  "Анализ данных в Excel": "https://cdn-icons-png.flaticon.com/512/732/732220.png"
};

function CourseCard({ course }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Проверяем, есть ли пользователь
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    // Проверяем, есть ли курс в избранном
    const checkFavorite = async () => {
      if (user && user.id) {
        try {
          const response = await api.get("profile/");
          const favorites = response.data.favorites || [];
          setIsFavorite(favorites.some(f => f.id === course.id));
        } catch (error) {
          console.error("Error checking favorite:", error);
        }
      }
    };
    checkFavorite();
  }, [course.id, user]);

  const toggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const stored = localStorage.getItem("user");
    if (!stored) {
      alert("Пожалуйста, войдите в систему, чтобы добавить курс в избранное");
      return;
    }

    try {
      if (isFavorite) {
        await api.post("favorites/remove/", { course_id: course.id });
        setIsFavorite(false);
      } else {
        await api.post("favorites/add/", { course_id: course.id });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const stars = "⭐".repeat(Math.round(course.rating));

  return (
    <div className="course-card" style={{position: 'relative'}}>
      <button 
        onClick={toggleFavorite}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "24px",
          zIndex: 100,
          pointerEvents: "auto"
        }}
        title={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>
      <img
        src={images[course.title] || "https://cdn-icons-png.flaticon.com/512/906/906324.png"}
        alt={course.title}
      />
      <div className="course-card-title">{course.title}</div>
      <div className="course-card-desc">{course.description}</div>
      <div className="course-card-rating">{stars} {course.rating}</div>
      <a
        className="course-card-link"
        href={course.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Перейти к курсу
      </a>
    </div>
  );
}

export default CourseCard;