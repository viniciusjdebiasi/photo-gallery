import { DoubleArrowDownIcon } from "@radix-ui/react-icons";
import "./App.css";

function App() {
  return (
    <>
      <div className="home-page">
        <div className="container-home">
          <header className="header-home">
            <a href="" className="link-page">See all</a>
            <a href="" className="link-page">Nature</a>
            <a href="" className="link-page">Others</a>
          </header>
          <section className="container-text">
            <h4>Welcome to my gallery!</h4>
            <h1>
              Explore moments and details captured through my perspective.
            </h1>
          </section>
          <DoubleArrowDownIcon className="icons" />
        </div>
      </div>
    </>
  );
}

export default App;
