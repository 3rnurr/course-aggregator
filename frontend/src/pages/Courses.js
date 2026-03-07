import { useEffect, useState } from "react";
import api from "../api";
import CourseCard from "../components/CourseCard";


function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");


  useEffect(() => {
  api.get("courses/")
    .then(res => setCourses(res.data))
    .catch(err => console.log(err));
}, []);

  const filteredCourses = courses.filter(course => {
  return (
    course.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === "" || course.category === category) &&
    (rating === "" || course.rating >= parseFloat(rating))
  );
});

  return (
    <div>
      

      <div style={styles.container}>
       

        <div style={{ marginBottom: "20px" }}>

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
  style={{ padding: "10px" }}
>
  <option value="">Любой рейтинг</option>
  <option value="4">4+</option>
  <option value="4.5">4.5+</option>
</select>

</div>

        <div style={styles.grid}>
          {filteredCourses.map(course => (
  <CourseCard key={course.id} course={course} />
))}
        </div>
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
}
};

export default Courses;