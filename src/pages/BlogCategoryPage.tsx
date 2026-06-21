import Header from "../components/Header";
import BlogCategory from "../components/BlogCategory";
import Footer from "../components/Footer";

const BlogCategoryPage = () => {
    return (
        <>
            <Header />
            <div className={`body-container`}>
                <BlogCategory />
                <Footer />
            </div>
        </>
    )
}

export default BlogCategoryPage;