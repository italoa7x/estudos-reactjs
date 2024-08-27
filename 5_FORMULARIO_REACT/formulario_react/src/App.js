import "./App.css";
import Form from "./components/Form";

function App() {
  return (
    <div className="App">
      <h2>Forms</h2>

      <Form
        userData={{
          name: "Italo",
          user: "itoo7x",
          bio: "biografia do usuario",
          role: "admin",
        }}
      />
    </div>
  );
}

export default App;
