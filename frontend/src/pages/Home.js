
import Courses from "./Courses";

function Home() {
  return (
    <div>

      

      <div style={styles.hero}>
        <h1>Изучайте новые навыки онлайн</h1>
        <p>Найдите курсы по программированию</p>

        
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