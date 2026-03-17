import {NewsModel} from "../../models/NewsModel";
import React, {ReactElement} from "react";
import {
    Button,
    Dialog, DialogActions,
    DialogBody,
    DialogContent,
    DialogSurface,
    DialogTitle,
    DialogTrigger, Input, Label,
    useId
} from "@fluentui/react-components";
import {uploadImageToDatabase} from "../../handlers/DatabaseHandler";

class NewsDialog extends React.Component<{newsItem: NewsModel | undefined, button: ReactElement, onClose: () => void}> {
    render() {
        const isNew = this.props.newsItem !== undefined;

        const item = this.props.newsItem || {
            id: 0,
            created_at: new Date(),
            title: ``,
            description: ``,
            category: ``,
            image_url: ``,
            link: ``,
            date: new Date()
        } as NewsModel;

        const [newsItem, setNewsItem] = React.useState<NewsModel>(item);
        const baseId = useId();

        const fieldIds = {
            title: `${baseId}-title`,
            description: `${baseId}-description`,
            category: `${baseId}-category`,
            image_url: `${baseId}-image_url`,
            link: `${baseId}-link`,
        } as const;

        const saveNewsItem = () => {

        }

        const handleImageUpload = async (
            e: React.ChangeEvent<HTMLInputElement>
        ) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const url = await uploadImageToDatabase(file);

            if (url) {
                setNewsItem(prev => ({
                    ...prev,
                    image_url: url
                }));
            }
        };

        return (
            <>
                <Dialog>
                    <DialogTrigger disableButtonEnhancement>
                        { this.props.button }
                    </DialogTrigger>
                    <DialogSurface className={`dialog`}>
                        <DialogBody>
                            <DialogTitle>
                                Nieuwsitem { isNew ? `bewerken` : `toevoegen` }
                            </DialogTitle>
                            <DialogContent>
                                <form className={`flex flex-column flex-gap-medium`}>
                                    <div>
                                        <Label htmlFor={fieldIds.title}>Titel</Label>
                                        <Input id={fieldIds.title} type={`text`} value={newsItem.title} onChange={(e) => setNewsItem({...newsItem, title: e.target.value})} />
                                    </div>

                                    <div>
                                        <Label htmlFor={fieldIds.description}>Beschrijving</Label>
                                        <Input id={fieldIds.description} type={`text`} value={newsItem.description ?? ``} onChange={(e) => setNewsItem({...newsItem, description: e.target.value})} />
                                    </div>

                                    <div>
                                        <Label htmlFor={fieldIds.category}>Category</Label>
                                        <Input id={fieldIds.category} type={`text`} value={newsItem.category ?? ``} onChange={(e) => setNewsItem({...newsItem, category: e.target.value})} />
                                    </div>

                                    <div>
                                        <Label htmlFor={fieldIds.link}>Link</Label>
                                        <Input id={fieldIds.link} type={`text`} value={newsItem.link ?? ``} onChange={(e) => setNewsItem({...newsItem, link: e.target.value})} />
                                    </div>

                                    <div>
                                        <Label htmlFor={fieldIds.image_url}>Link naar Afbeelding</Label>
                                        <Input id={fieldIds.image_url} type={`text`} value={newsItem.image_url ?? ``} onChange={(e) => setNewsItem({...newsItem, image_url: e.target.value})} />
                                        <input type="file" accept="image/*" onChange={handleImageUpload} />
                                    </div>
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <DialogTrigger>
                                    <button className={`button`}>
                                        Sluiten
                                    </button>
                                </DialogTrigger>
                                <Button as={`button`} appearance={`primary`} onClick={saveNewsItem}>
                                    Opslaan
                                </Button>
                            </DialogActions>
                        </DialogBody>
                    </DialogSurface>
                </Dialog>
            </>
        );
    }
}