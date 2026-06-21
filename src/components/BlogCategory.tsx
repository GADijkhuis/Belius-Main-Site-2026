import {useEffect, useState} from "react";
import {isUserAdmin, isUserLoggedIn} from "../handlers/UserHandler";
import {fetchBlogCategoryItems} from "../handlers/BlogHandler";
import {Button, Spinner, Title1, Caption1} from "@fluentui/react-components";
import {BlogCategoryModel} from "../models/BlogCategoryModel";
import BlogCategoryItem from "./blog-category/BlogCategoryItem";
import BlogCategoryDialog from "./blog-category/BlogCategoryDialog";
import {navigateToPage} from "../handlers/RouteHandler";

const BlogCategory = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [blogCategoryItems, setBlogCategoryItems] = useState(new Array<BlogCategoryModel>());
    const [error, setError] = useState(``);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        isUserLoggedIn().then((r: boolean) => {
            if (!r) {
                setIsLoading(false);
                return;
            }

            fetchBlogCategories();
        });

        isUserAdmin().then((r: boolean) => setIsAdmin(r));
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
            { !isLoading && !isAdmin && blogCategoryItems.length === 0 &&
                <div className={`flex flex-column flex-gap-small`}>
                    <p>Je moet ingelogd zijn om deze blog te bekijken.</p>
                    <Button as={`a`} className={`button`} appearance={`primary`} onClick={() => navigateToPage(`login`)}>
                        Inloggen
                    </Button>
                </div>
            }
            { isLoading && <Spinner /> }
            {error && <Caption1>{error}</Caption1>}
            <div className={`flex flex-wrap flex-align-center flex-gap-medium flex-justify-center flex-align-stretch`}>
                { blogCategoryItems && blogCategoryItems.length > 0 &&
                    blogCategoryItems.map((blogCategory: BlogCategoryModel) => (
                        <BlogCategoryItem blogCategoryItem={blogCategory} isAdmin={isAdmin} onClose={() => fetchBlogCategories()}/>
                    ))
                }
            </div>
            { isAdmin &&
                <div className={`pos-sticky pos-bottom flex flex-justify-center width-100 mt-medium`}>
                    <div className={`flex flex-gap-medium flex-wrap actions-container`}>
                        <BlogCategoryDialog key={`${new Date()}`} blogCategoryItem={undefined} onClose={() => fetchBlogCategories()} isAdmin={isAdmin}/>
                    </div>
                </div>
            }
        </>
    )
}

export default BlogCategory;