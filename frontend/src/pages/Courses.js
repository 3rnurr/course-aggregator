import { useEffect, useState } from "react";
import api from "../api";
import CourseCard from "../components/CourseCard";


function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [ordering, setOrdering] = useState("-created_at");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  useEffect(() => {
    // Попробуем загрузить с бэка, если нет — используем заглушку
    fetchCourses();
  }, [page, ordering]);

  const manyCourses = [
    { id: 1, title: "Django Course", description: "Изучите Django с нуля", rating: 4.7, url: "https://www.djangoproject.com/", category: "Python" },
    { id: 2, title: "Python для начинающих", description: "Базовый курс по Python", rating: 4.5, url: "https://stepik.org/course/67", category: "Python" },
    { id: 3, title: "React Fundamentals", description: "Основы React для веб-разработки", rating: 4.8, url: "https://react.dev/", category: "React" },
    { id: 4, title: "Data Science", description: "Введение в Data Science", rating: 4.6, url: "https://www.coursera.org/specializations/data-science-python", category: "Data Science" },
    { id: 5, title: "Machine Learning", description: "Машинное обучение от Andrew Ng", rating: 4.9, url: "https://www.coursera.org/learn/machine-learning", category: "Data Science" },
    { id: 6, title: "JavaScript Pro", description: "Современный JavaScript с нуля", rating: 4.4, url: "https://learn.javascript.ru/", category: "React" },
    { id: 7, title: "SQL для аналитиков", description: "Работа с базами данных на SQL", rating: 4.3, url: "https://stepik.org/course/63054", category: "Data Science" },
    { id: 8, title: "HTML & CSS", description: "Верстка сайтов с нуля", rating: 4.2, url: "https://htmlacademy.ru/", category: "React" },
    { id: 9, title: "Алгоритмы и структуры данных", description: "Классика CS на практике", rating: 4.7, url: "https://leetcode.com/", category: "Python" },
    { id: 10, title: "Docker для начинающих", description: "Контейнеризация приложений", rating: 4.5, url: "https://docker-curriculum.com/", category: "Python" },
    { id: 11, title: "DevOps практики", description: "CI/CD, мониторинг, инфраструктура", rating: 4.6, url: "https://roadmap.sh/devops", category: "Python" },
    { id: 12, title: "Kubernetes", description: "Оркестрация контейнеров", rating: 4.4, url: "https://kubernetes.io/", category: "Python" },
    { id: 13, title: "FastAPI", description: "Современный Python backend", rating: 4.8, url: "https://fastapi.tiangolo.com/", category: "Python" },
    { id: 14, title: "Vue.js", description: "Фреймворк для UI", rating: 4.3, url: "https://vuejs.org/", category: "React" },
    { id: 15, title: "PostgreSQL", description: "Мощная СУБД для проектов", rating: 4.7, url: "https://www.postgresql.org/", category: "Data Science" },
    { id: 16, title: "Git и GitHub", description: "Контроль версий и командная работа", rating: 4.9, url: "https://git-scm.com/", category: "Python" },
    { id: 17, title: "Linux для разработчиков", description: "Работа в терминале и bash", rating: 4.5, url: "https://stepik.org/course/73", category: "Python" },
    { id: 18, title: "C++ с нуля", description: "Базовый курс по C++", rating: 4.1, url: "https://stepik.org/course/7", category: "Python" },
    { id: 19, title: "Java для начинающих", description: "Основы Java", rating: 4.2, url: "https://stepik.org/course/187", category: "Python" },
    { id: 20, title: "Анализ данных в Excel", description: "Практика для аналитиков", rating: 4.0, url: "https://stepik.org/course/4852", category: "Data Science" },
    // Новые курсы для теста пагинации
    { id: 21, title: "Go для начинающих", description: "Быстрый старт в Go", rating: 4.3, url: "https://golang.org/doc/", category: "Python" },
    { id: 22, title: "Rust: основы", description: "Безопасное программирование на Rust", rating: 4.5, url: "https://www.rust-lang.org/ru/learn", category: "Python" },
    { id: 23, title: "TypeScript", description: "Типизированный JavaScript", rating: 4.4, url: "https://www.typescriptlang.org/", category: "React" },
    { id: 24, title: "Unity 3D", description: "Создание игр на Unity", rating: 4.6, url: "https://learn.unity.com/", category: "Python" },
    { id: 25, title: "Flutter", description: "Мобильная разработка на Flutter", rating: 4.2, url: "https://flutter.dev/", category: "React" },
    { id: 26, title: "Scala", description: "Функциональное программирование", rating: 4.1, url: "https://docs.scala-lang.org/", category: "Python" },
    { id: 27, title: "PHP для веба", description: "Создание сайтов на PHP", rating: 4.0, url: "https://www.php.net/manual/ru/", category: "Python" },
    { id: 28, title: "Ruby on Rails", description: "Веб-разработка на Ruby", rating: 4.3, url: "https://guides.rubyonrails.org/", category: "Python" },
    { id: 29, title: "Android Development", description: "Создание Android-приложений", rating: 4.2, url: "https://developer.android.com/", category: "React" },
    { id: 30, title: "iOS Development", description: "Разработка под iOS", rating: 4.4, url: "https://developer.apple.com/ios/", category: "React" },
  ];

  const fetchCourses = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        page: page,
        page_size: 12,
        ordering: ordering,
        search: search
      });
      let loaded;
      let isDemo = false;
      try {
        const res = await api.get(`courses/?${params}`);
        loaded = res.data.results || res.data;
        if (!loaded || loaded.length < 10) {
          loaded = manyCourses;
          isDemo = true;
        }
      } catch (err) {
        loaded = manyCourses;
        isDemo = true;
      }
      setCourses(loaded);
      setTotalPages(Math.ceil(loaded.length / 12));
      if (isDemo && page > Math.ceil(loaded.length / 12)) {
        setPage(1);
      }
    } catch (err) {
      setCourses(manyCourses);
      setTotalPages(Math.ceil(manyCourses.length / 12));
      setError("Ошибка при загрузке курсов, показаны демо-курсы");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchCourses();
  };


  // Фильтрация и пагинация курсов
  const filteredAll = courses.filter(course => {
    return (
      course.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || course.category === category) &&
      (rating === "" || course.rating >= parseFloat(rating))
    );
  });
  const pageSize = 12;
  const pagedCourses = filteredAll.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      

      <div style={styles.container}>
       

        <div style={{ marginBottom: "20px" }}>

<form onSubmit={handleSearch}>
<input
  placeholder="Поиск курсов..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{ padding: "10px", marginRight: "10px" }}
/>

<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  style={{ padding: "10px", marginRight: "10px" }}
>
  <option value="">Все категории</option>
  <option value="Python">Python</option>
  <option value="React">React</option>
  <option value="Data Science">Data Science</option>
</select>

<select
  value={rating}
  onChange={(e) => setRating(e.target.value)}
  style={{ padding: "10px", marginRight: "10px" }}
>
  <option value="">Любой рейтинг</option>
  <option value="4">4+</option>
  <option value="4.5">4.5+</option>
</select>

<select
  value={ordering}
  onChange={(e) => setOrdering(e.target.value)}
  style={{ padding: "10px", marginRight: "10px" }}
>
  <option value="-created_at">Новые</option>
  <option value="title">По названию</option>
  <option value="-rating">По рейтингу</option>
</select>

<button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
  Поиск
</button>
</form>

</div>

        {loading && <p>Загрузка...</p>}
        {/* error && <p style={{ color: "red" }}>{error}</p> */}

        <div style={styles.grid}>
          {pagedCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Пагинация */}
        {Math.ceil(filteredAll.length / pageSize) > 1 && (
          <div style={styles.pagination}>
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{ padding: "8px 16px", margin: "0 5px" }}
            >
              Предыдущая
            </button>
            <span>Страница {page} из {Math.ceil(filteredAll.length / pageSize)}</span>
            <button 
              onClick={() => setPage(p => Math.min(Math.ceil(filteredAll.length / pageSize), p + 1))}
              disabled={page === Math.ceil(filteredAll.length / pageSize)}
              style={{ padding: "8px 16px", margin: "0 5px" }}
            >
              Следующая
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
  maxWidth: "1100px",
  margin: "auto",
  padding: "40px 20px"
},
  search: {
    padding: 10,
    width: 300,
    marginBottom: 30
  },
  grid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "24px",
  marginTop: "20px"
},
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30px",
    gap: "10px"
  }
};

export default Courses;