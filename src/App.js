import Heading from "./components/Heading";
import Navbar from "./components/Navbar";

function App() {
    return (
        <div>
            <Navbar />
            <main className="container">
                <Heading />
            </main>
        </div>
    );
}

export default App;
