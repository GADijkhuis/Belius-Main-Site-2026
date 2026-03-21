import {useEffect, useState} from "react";
import {fetchNewsItems} from "../handlers/NewsHandler";
import {NewsModel} from "../models/NewsModel";
import {Button, Caption1, Spinner, Title1} from "@fluentui/react-components";
import { ArrowCircleRightRegular } from '@fluentui/react-icons';
import NewsItem from "./news/NewsItem";
import {navigateToPage} from "../handlers/RouteHandler";
import {isUserLoggedIn} from "../handlers/UserHandler";
import NewsDialog from "./news/NewsDialog";

const News = ({ showAllNewsItems = false }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [newsItems, setNewsItems] = useState(new Array<NewsModel>());
    const [showMoreButton, setShowMoreButton] = useState(false);
    const [error, setError] = useState(``);

    const loggedIn = isUserLoggedIn();

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews =  () => {
        fetchNewsItems(showAllNewsItems ? null : 7).then(({ data, error }) => {
            setIsLoading(false);

            if (error) {
                setError(error);
                return;
            }

            if (data) {
                let newsItemsData = data;

                if (!showAllNewsItems && newsItemsData.length > 6) {
                    newsItemsData = newsItemsData.slice(0, 6);
                    setShowMoreButton(true);
                }

                setNewsItems(newsItemsData);
            }
        });
    }
    return (
        <>
            <Title1>Nieuws</Title1>
            { isLoading && <Spinner /> }
            { error && <Caption1>{ error }</Caption1> }
            <div className={`flex flex-wrap flex-align-center flex-gap-medium flex-justify-center`}>
                { newsItems && newsItems.length > 0 &&
                    newsItems.map((newsItem: NewsModel) => (
                        <NewsItem newsItem={newsItem} onClose={() => fetchNews()} />
                    ))
                }
            </div>
            <div className={`flex flex-align-center flex-gap-medium flex-justify-center`}>
                {
                    showMoreButton &&
                    <Button as={`a`} className={`button`} appearance={`subtle`} onClick={() => navigateToPage(`news`)} >
                        Ga naar alle nieuwsitems <ArrowCircleRightRegular />
                    </Button>
                }
            </div>
            { loggedIn &&
                <div className={`flex flex-align-center flex-gap-medium flex-justify-center`}>
                    <NewsDialog newsItem={undefined} onClose={() => fetchNews()}/>
                </div>
            }
        </>
    );
}

export default News;