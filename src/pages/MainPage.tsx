import Header from "../components/Header";
import About from "../components/About";
import Footer from "../components/Footer";
import News from "../components/News";

const MainPage = () => {
    return (
        <>
            <Header />
            <div className={`body-container`}>
                <News />
                <About />
                <Footer />
            </div>
        </>
    );
}

export default MainPage;