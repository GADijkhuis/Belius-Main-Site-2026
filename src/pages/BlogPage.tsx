import Header from "../components/Header";
import Line from "../components/assets/Line";
import Footer from "../components/Footer";
import Blog from "../components/Blog";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {isUserLoggedIn} from "../handlers/UserHandler";
import {Button, Spinner} from "@fluentui/react-components";
import {navigateToPage} from "../handlers/RouteHandler";
import {fetchBlogCategoryTitleById} from "../handlers/BlogHandler";

const BlogPage = () => {
    const { categoryId } = useParams();
    const parsedCategoryId = Number(categoryId);
    const hasValidCategoryId = Number.isInteger(parsedCategoryId);
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
                    : hasValidCategoryId ?
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