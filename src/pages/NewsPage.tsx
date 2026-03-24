import Header from "../components/Header";
import News from "../components/News";
import Footer from "../components/Footer";
import Line from "../components/assets/Line";

const NewsPage = () => {
    return (
        <>
            <Header />
            <div className={`body-container`}>
                <News showAllNewsItems={true} />
                <Line/>
                <Footer />
            </div>
        </>
    );
}

export default NewsPage;