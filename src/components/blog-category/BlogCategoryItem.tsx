import {Text, Caption1, Caption2, Card, CardHeader, CardPreview, Button, CardFooter} from "@fluentui/react-components";
import {Delete16Filled} from "@fluentui/react-icons"
import React from "react";
import NewsDialog from "./BlogCategoryDialog";
import ConfirmDialog from "../assets/ConfirmDialog";
import {BlogModel} from "../../models/BlogModel";
import {deleteBlogCategoryItem, deleteBlogItem} from "../../handlers/BlogHandler";
import {BlogCategoryModel} from "../../models/BlogCategoryModel";
import BlogCategoryDialog from "./BlogCategoryDialog";
import {navigateToPage} from "../../handlers/RouteHandler";

class BlogCategoryItem extends React.Component<{blogCategoryItem: BlogCategoryModel, loggedIn: boolean, onClose: () => void}> {
    render() {
        const item = this.props.blogCategoryItem;
        const loggedIn = this.props.loggedIn;
        const onClose = this.props.onClose;

        const deleteItem = () => {
            deleteBlogCategoryItem(item).then(() => {
                this.props.onClose();
            });
        }

        return (
            <>
                <Card className={`news-item`}>
                    {
                        item.image_url ?
                            <CardPreview>
                                <img className={`news-item-img`} src={item.image_url} alt={item.name} />
                            </CardPreview>
                            : null
                    }
                    <CardHeader
                        header={
                            <>
                                <Text weight="semibold">
                                    {item.name}
                                </Text>
                            </>
                        }
                    />
                    <CardFooter>
                        <div className={`flex flex-gap-small flex-wrap`}>
                            { item.id &&
                                <Button as={`a`} className={`button`} target={`_blank`} onClick={() => navigateToPage(`blog/${item.id}`)}>
                                    Open Categorie
                                </Button>
                            }
                            { loggedIn &&
                                <>
                                    <BlogCategoryDialog onClose={onClose} blogCategoryItem={item} />
                                    <ConfirmDialog buttonContent={<><Delete16Filled/> Verwijderen</>} title={`Blog categorie Verwijderen?`} description={`Weet u zeker dat dit blog category moet worden verwijderd?`} onConfirm={deleteItem}/>
                                </>
                            }
                        </div>
                    </CardFooter>
                </Card>
            </>
        );
    }

}

export default BlogCategoryItem;