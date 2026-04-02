import Header from "../components/Header";
import Line from "../components/assets/Line";
import Footer from "../components/Footer";
import Blog from "../components/Blog";

const BlogPage = () => {
    return (
        <>
            <Header />
            <div className={`body-container`}>
                <Blog/>
                <Line/>
                <Footer />
            </div>
        </>
    );
}

export default BlogPage;