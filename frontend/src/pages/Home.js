
import Courses from "./Courses";

function Home() {
  return (
    <div>

      


      <div className="hero">
        <h1>Учитесь у лучших на CourseraX</h1>
        <p>Онлайн-курсы от ведущих университетов и компаний мира</p>
      </div>

      <Courses />

    </div>
  );
}

const styles = {
  hero: {
    background: "#3b6fcf",
    color: "white",
    textAlign: "center",
    padding: "80px"
  },
  search: {
    marginTop: "20px",
    padding: "10px",
    width: "300px",
    borderRadius: "6px",
    border: "none"
  }
};

export default Home;