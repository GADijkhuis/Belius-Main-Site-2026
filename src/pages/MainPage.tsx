import Header from "../components/Header";
import About from "../components/About";
import Footer from "../components/Footer";
import News from "../components/News";
import Line from "../components/assets/Line";

const MainPage = () => {
    return (
        <>
            <Header />
            <div className={`body-container`}>
                <News />
                <Line/>
                <About />
                <Line/>
                <Footer />
            </div>
        </>
    );
}

export default MainPage;