import Header from "../components/Header";
import News from "../components/News";

const NewsPage = () => {
    return (
        <>
            <Header />
            <div className={`body-container`}>
                <News showAllNewsItems={true} />
            </div>
        </>
    );
}

export default NewsPage;