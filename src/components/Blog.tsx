import {useEffect, useState} from "react";
import {isUserLoggedIn} from "../handlers/UserHandler";
import {fetchBlogItems} from "../handlers/BlogHandler";
import {Spinner, Title1, Caption1} from "@fluentui/react-components";
import {BlogModel} from "../models/BlogModel";
import BlogItem from "./blog/BlogItem";
import BlogDialog from "./blog/BlogDialog";

const Blog = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [blogItems, setBlogItems] = useState(new Array<BlogModel>());
    const [error, setError] = useState(``);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        fetchBlog();

        isUserLoggedIn().then((r) => setLoggedIn(r));
    }, []);

    const fetchBlog = () => {
        fetchBlogItems().then(({ data, error }) => {
            setIsLoading(false);

            if (error) {
                setError(error);
            }

            if (data) {
                setBlogItems(data);
            }
        });
    }

    return (
        <>
            <Title1>Wedstrijden volgen</Title1>
            { isLoading && <Spinner /> }
            {error && <Caption1>{error}</Caption1>}
            <div className={`flex flex-wrap flex-align-center flex-gap-medium flex-justify-center`}>
                { blogItems && blogItems.length > 0 &&
                    blogItems.map((blogItem: BlogModel) => (
                        <BlogItem blogItem={blogItem} loggedIn={loggedIn} onClose={() => fetchBlog()}/>
                    ))
                }
            </div>
            { loggedIn &&
                <div className={`flex flex-align-center flex-gap-medium flex-justify-center`}>
                    <BlogDialog blogItem={undefined} onClose={() => fetchBlog()}/>
                </div>
            }
        </>
    )
}

export default Blog;