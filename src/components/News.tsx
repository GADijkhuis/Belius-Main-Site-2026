import {useEffect, useState} from "react";
import {fetchNewsItems} from "../handlers/NewsHandler";
import {NewsModel} from "../models/NewsModel";
import {Caption1, Spinner, Title1} from "@fluentui/react-components";
import NewsItem from "./news/NewsItem";

const News = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [newsItems, setNewsItems] = useState(new Array<NewsModel>());
    const [error, setError] = useState(``);

    useEffect(() => {
        fetchNewsItems().then(({ data, error }) => {
            setIsLoading(false);

            if (error) {
                setError(error);
                return;
            }

            if (data) {
                setNewsItems(data);
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
        </>
    );
}

export default News;