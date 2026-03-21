import {NewsModel} from "../../models/NewsModel";
import {Text, Caption1, Caption2, Card, CardHeader, CardPreview, Button, CardFooter} from "@fluentui/react-components";
import React from "react";
import {isUserLoggedIn} from "../../handlers/UserHandler";
import NewsDialog from "./NewsDialog";

class NewsItem extends React.Component<{newsItem: NewsModel, onClose: () => void}> {
    render() {
        const loggedIn = isUserLoggedIn();
        const item = this.props.newsItem;
        const onClose = this.props.onClose;
        return (
            <>
                <Card className={`news-item`}>
                    <CardPreview>
                        <img className={`news-item-img`} src={item.image_url} alt={item.title} />
                    </CardPreview>
                    <CardHeader
                        header={
                            <>
                                <Text weight="semibold">
                                    {item.title}
                                </Text>
                            </>
                        }
                        description={
                            <div className={`flex flex-column flex-gap-small`}>
                                { item.category && <Caption2>{item.category}</Caption2> }
                                { item.description && <Caption1>{item.description}</Caption1> }
                            </div>
                        }
                    />
                    <CardFooter>
                        { item.link &&
                            <Button as={`a`} className={`button`} href={item.link} target={`_blank`}>
                                Open Link
                            </Button>
                        }
                        { loggedIn &&
                            <NewsDialog onClose={onClose} newsItem={item} />
                        }
                    </CardFooter>
                </Card>
            </>
        );
    }

}

export default NewsItem;