import Header from "../components/Header";
import BlogCategory from "../components/BlogCategory";
import Footer from "../components/Footer";
import {useEffect, useState} from "react";
import {isUserLoggedIn} from "../handlers/UserHandler";
import {Button, Spinner} from "@fluentui/react-components";
import {navigateToPage} from "../handlers/RouteHandler";
import Blog from "../components/Blog";
import Line from "../components/assets/Line";

const BlogCategoryPage = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        isUserLoggedIn().then((r) => {setLoggedIn(r); setIsLoading(false)});
    }, []);

    return (
        <>
            <Header />
            <div className={`body-container`}>
                { !loggedIn && !isLoading ?
                    <div className={`flex flex-column flex-gap-small`}>
                        <p>Je moet ingelogd zijn om deze blog te bekijken.</p>
                        <Button as={`a`} className={`button`} appearance={`primary`} onClick={() => navigateToPage(`login`)}>
                            Inloggen
                        </Button>
                    </div>
                    : isLoading ?
                        <Spinner />
                        :
                        <BlogCategory showAllBlogCategoryItems={true} />
                }
                <Line/>
                <Footer />
            </div>
        </>
    )
}

export default BlogCategoryPage;