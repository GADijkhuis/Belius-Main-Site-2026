import {NewsModel} from "../../models/NewsModel";
import {Text, Caption1, Caption2, Card, CardHeader, CardPreview, Button, CardFooter} from "@fluentui/react-components";
import React from "react";

class NewsItem extends React.Component<{newsItem: NewsModel}> {
    render() {
        const item = this.props.newsItem;
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
                                <Button as={`a`} href={item.link} target={`_blank`}>
                                    Open Link
                                </Button>
                            }
                    </CardFooter>
                </Card>
            </>
        );
    }

}

export default NewsItem;