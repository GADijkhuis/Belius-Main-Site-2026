import {useEffect, useState} from "react";
import {fetchNewsItems} from "../handlers/NewsHandler";
import {NewsModel} from "../models/NewsModel";
import {Button, Caption1, Spinner, Title1} from "@fluentui/react-components";
import { ArrowCircleRightRegular } from '@fluentui/react-icons';
import {BiArrowBack} from "react-icons/bi";
import NewsItem from "./news/NewsItem";
import {navigateToPage} from "../handlers/RouteHandler";

const News = ({ showAllNewsItems = false }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [newsItems, setNewsItems] = useState(new Array<NewsModel>());
    const [showMoreButton, setShowMoreButton] = useState(false);
    const [error, setError] = useState(``);

    useEffect(() => {
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
    }, []);
    return (
        <>
            <Title1>Nieuws</Title1>
            { isLoading && <Spinner /> }
            { error && <Caption1>{ error }</Caption1> }
            <div className={`flex flex-wrap flex-align-center flex-gap-medium flex-justify-center`}>
                { newsItems && newsItems.length > 0 &&
                    newsItems.map((newsItem: NewsModel) => (
                        <NewsItem newsItem={newsItem} />
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
        </>
    );
}

export default News;