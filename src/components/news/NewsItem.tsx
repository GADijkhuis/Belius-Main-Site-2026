import {NewsModel} from "../../models/NewsModel";
import {Text, Caption1, Caption2, Card, CardHeader, CardPreview, Button, CardFooter} from "@fluentui/react-components";
import {Delete16Filled} from "@fluentui/react-icons"
import React, {useState} from "react";
import {isUserLoggedIn} from "../../handlers/UserHandler";
import NewsDialog from "./NewsDialog";
import ConfirmDialog from "../assets/ConfirmDialog";
import {deleteNewsItem} from "../../handlers/NewsHandler";

class NewsItem extends React.Component<{newsItem: NewsModel, loggedIn: boolean, onClose: () => void}> {
    render() {
        const item = this.props.newsItem;
        const loggedIn = this.props.loggedIn;
        const onClose = this.props.onClose;

        const deleteItem = () => {
            deleteNewsItem(item).then(() => {
                this.props.onClose();
            });
        }

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
                        <div className={`flex flex-gap-small flex-wrap`}>
                            { item.link &&
                                <Button as={`a`} className={`button`} href={item.link} target={`_blank`}>
                                    Open Link
                                </Button>
                            }
                            { loggedIn &&
                                <>
                                    <NewsDialog onClose={onClose} newsItem={item} />
                                    <ConfirmDialog buttonContent={<><Delete16Filled/> Verwijderen</>} title={`Nieuwsitem Verwijderen?`} description={`Weet u zeker dat dit nieuwsitem moet worden verwijderd?`} onConfirm={deleteItem}/>
                                </>
                            }
                        </div>
                    </CardFooter>
                </Card>
            </>
        );
    }

}

export default NewsItem;