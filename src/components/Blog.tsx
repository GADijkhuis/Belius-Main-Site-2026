import {useEffect, useState} from "react";
import {isUserAdmin, isUserLoggedIn} from "../handlers/UserHandler";
import {fetchBlogItems} from "../handlers/BlogHandler";
import {Spinner, Title1, Caption1} from "@fluentui/react-components";
import {BlogModel} from "../models/BlogModel";
import BlogItem from "./blog/BlogItem";
import BlogDialog from "./blog/BlogDialog";
import BackButton from "./assets/BackButton";

const Blog = ({categoryId}: { categoryId: number }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [blogItems, setBlogItems] = useState(new Array<BlogModel>());
    const [error, setError] = useState(``);
    const [isAdmin, setIsAdmin] = useState(false);

    const fetchBlog = () => {
        fetchBlogItems(categoryId).then(({ data, error }) => {
            setIsLoading(false);

            if (error) {
                setError(error);
            }

            if (data) {
                setBlogItems(data);
            }
        });
    };

    useEffect(() => {
        fetchBlog();
            isUserAdmin().then((r) => setIsAdmin(r));
    }, [categoryId]);

    return (
        <>
            <BackButton/>
            <Title1>Wedstrijden volgen</Title1>
            { isLoading && <Spinner /> }
            {error && <Caption1>{error}</Caption1>}
            <div className={`flex flex-wrap flex-align-center flex-gap-medium flex-justify-center flex-align-stretch`}>
                { blogItems && blogItems.length > 0 &&
                    blogItems.map((blogItem: BlogModel) => (
                        <BlogItem key={blogItem.id} blogItem={blogItem} isAdmin={isAdmin} onClose={() => fetchBlog()} categoryId={categoryId}/>
                    ))
                }
            </div>
            { isAdmin &&
                <div className={`pos-sticky pos-bottom flex flex-justify-center width-100 mt-medium`}>
                    <div className={`flex flex-gap-medium flex-wrap actions-container`}>
                        <BlogDialog key={`${new Date()}`} blogItem={undefined} onClose={() => fetchBlog()} categoryId={categoryId} isAdmin={isAdmin} />
                    </div>
                </div>
            }
        </>
    );
};

export default Blog;