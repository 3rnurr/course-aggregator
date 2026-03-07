function CourseCard({ course }) {

  const images = {
    "Django Course": "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
    "Python для начинающих": "https://cdn-icons-png.flaticon.com/512/5968/5968350.png",
    "React Fundamentals": "https://cdn-icons-png.flaticon.com/512/1126/1126012.png",
    "Data Science": "https://cdn-icons-png.flaticon.com/512/2103/2103633.png"
  };

  const stars = "⭐".repeat(Math.round(course.rating));

  const styles = {
    card: {
      background: "white",
      padding: "16px",
      borderRadius: "12px",
      boxShadow: "0 6px 14px rgba(0,0,0,0.1)",
      transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "pointer"
    },

    img: {
      width: "100%",
      height: "140px",
      objectFit: "contain",
      marginBottom: "10px"
    },

    title: {
      fontSize: "18px",
      fontWeight: "600"
    },

    rating: {
      color: "#f5a623",
      marginTop: "6px"
    },

    link: {
      display: "inline-block",
      marginTop: "8px",
      color: "#2563eb",
      textDecoration: "none",
      fontWeight: "500"
    }
  };

  return (
    <div
      style={styles.card}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.1)";
      }}
    >

      <img
        src={images[course.title] || "https://cdn-icons-png.flaticon.com/512/906/906324.png"}
        alt={course.title}
        style={styles.img}
      />

      <div style={styles.title}>{course.title}</div>

      <p>{course.description}</p>

      <div style={styles.rating}>
        {stars} {course.rating}
      </div>

      <a style={styles.link} href="#">
        Перейти к курсу
      </a>

    </div>
  );
}

export default CourseCard;