export default function CourseCard({ course }) {
  const images = {
    "Django Course": "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
    "Python для начинающих": "https://cdn-icons-png.flaticon.com/512/5968/5968350.png",
    "React Fundamentals": "https://cdn-icons-png.flaticon.com/512/1126/1126012.png",
    "Data Science": "https://cdn-icons-png.flaticon.com/512/2103/2103633.png"
  };
  const stars = "⭐".repeat(Math.round(course.rating));
  return (
    <div className="course-card">
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