import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

const Home = () => {
    return (
        <main className="flex-grow flex flex-col">
            <Hero />
            <About />
            <Services />
            <Experience />
            <Projects />
            <Contact />
        </main>
    );
};

export default Home;
