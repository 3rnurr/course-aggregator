import React, { useEffect, useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  navigate("/");
};

  const loadCourses = () => {
    api.get("courses/")
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const deleteCourse = (id) => {
    api.delete(`courses/${id}/`)
      .then(() => {
        loadCourses();
      })
      .catch(err => console.error(err));
  };

const updateCourse = (id) => {
  const newTitle = prompt("Enter new course title:");

  if (!newTitle) return;

  api.patch(`courses/${id}/`, {
    title: newTitle
  })
  .then(() => {
    loadCourses();
  })
  .catch(err => console.error(err));
};
  
  
  return (
    <div>
      <button onClick={logout}>Logout</button>
      <h2>Courses</h2>

      {courses.map(course => (
        <div key={course.id} style={{border:"1px solid gray", margin:"10px", padding:"10px"}}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <p>Platform: {course.platform}</p>
          <p>Rating: {course.rating}</p>

          <a href={course.url} target="_blank" rel="noreferrer">
            Go to course
          </a>

          <br/>

          <button onClick={() => deleteCourse(course.id)}>
            Delete
          </button>
          <button onClick={() => updateCourse(course.id)}>
  Edit
</button>
        </div>
      ))}
    </div>
  );
}

export default Courses;