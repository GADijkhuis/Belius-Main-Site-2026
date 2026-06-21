import {useEffect, useState} from "react";
import {isUserLoggedIn} from "../handlers/UserHandler";
import {fetchBlogCategoryItems, fetchBlogItems} from "../handlers/BlogHandler";
import {Spinner, Title1, Caption1} from "@fluentui/react-components";
import {BlogModel} from "../models/BlogModel";
import BlogItem from "./blog/BlogItem";
import BlogDialog from "./blog/BlogDialog";
import {BlogCategoryModel} from "../models/BlogCategoryModel";
import BlogCategoryItem from "./blog-category/BlogCategoryItem";
import BlogCategoryDialog from "./blog-category/BlogCategoryDialog";

const BlogCategory = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [blogCategoryItems, setBlogCategoryItems] = useState(new Array<BlogCategoryModel>());
    const [error, setError] = useState(``);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        fetchBlogCategories();

        isUserLoggedIn().then((r) => setLoggedIn(r));
    }, []);

    const fetchBlogCategories = () => {
        fetchBlogCategoryItems().then(({ data, error }) => {
            setIsLoading(false);

            if (error) {
                setError(error);
            }

            if (data) {
                setBlogCategoryItems(data);
            }
        });
    }

    return (
        <>
            <Title1>Wedstrijden volgen</Title1>
            { isLoading && <Spinner /> }
            {error && <Caption1>{error}</Caption1>}
            <div className={`flex flex-wrap flex-align-center flex-gap-medium flex-justify-center flex-align-stretch`}>
                { blogCategoryItems && blogCategoryItems.length > 0 &&
                    blogCategoryItems.map((blogCategory: BlogCategoryModel) => (
                        <BlogCategoryItem blogCategoryItem={blogCategory} loggedIn={loggedIn} onClose={() => fetchBlogCategories()}/>
                    ))
                }
            </div>
            { loggedIn &&
                <div className={`pos-sticky pos-bottom flex flex-justify-center width-100 mt-medium`}>
                    <div className={`flex flex-gap-medium flex-wrap actions-container`}>
                        <BlogCategoryDialog key={`${new Date()}`} blogCategoryItem={undefined} onClose={() => fetchBlogCategories()}/>
                    </div>
                </div>
            }
        </>
    )
}

export default BlogCategory;