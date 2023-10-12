import "./App.css";

function App({ name }) {
  return (
    <>
      <h1 className={`text-red-500 text-3xl`}>Hello {name}</h1>
    </>
  );
}

export default App;
