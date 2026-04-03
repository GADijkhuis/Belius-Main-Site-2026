import {Text, Caption1, Caption2, Card, CardHeader, CardPreview, Button, CardFooter} from "@fluentui/react-components";
import {Delete16Filled} from "@fluentui/react-icons"
import React from "react";
import NewsDialog from "./BlogDialog";
import ConfirmDialog from "../assets/ConfirmDialog";
import {BlogModel} from "../../models/BlogModel";
import {deleteBlogItem} from "../../handlers/BlogHandler";

class BlogItem extends React.Component<{blogItem: BlogModel, loggedIn: boolean, onClose: () => void}> {
    render() {
        const item = this.props.blogItem;
        const loggedIn = this.props.loggedIn;
        const onClose = this.props.onClose;

        const deleteItem = () => {
            deleteBlogItem(item).then(() => {
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
                                    <NewsDialog onClose={onClose} blogItem={item} />
                                    <ConfirmDialog buttonContent={<><Delete16Filled/> Verwijderen</>} title={`Blog item Verwijderen?`} description={`Weet u zeker dat dit blog item moet worden verwijderd?`} onConfirm={deleteItem}/>
                                </>
                            }
                        </div>
                    </CardFooter>
                </Card>
            </>
        );
    }

}

export default BlogItem;