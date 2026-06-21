import Header from "../components/Header";
import Line from "../components/assets/Line";
import Footer from "../components/Footer";
import Blog from "../components/Blog";
import {useParams} from "react-router-dom";

const BlogPage = () => {
    const { categoryId } = useParams();
    const parsedCategoryId = Number(categoryId);
    const hasValidCategoryId = Number.isInteger(parsedCategoryId);

    return (
        <>
            <Header />
            <div className={`body-container`}>
                { hasValidCategoryId ?
                    <Blog categoryId={parsedCategoryId}/>
                    :
                    <p>Er is een fout opgetreden bij het ophalen van de items</p>
                }
                <Line/>
                <Footer />
            </div>
        </>
    );
}

export default BlogPage;