import { NewsModel } from "../../models/NewsModel";
import React, { ReactElement, useId, useState } from "react";
import {
    Button,
    Dialog, DialogActions,
    DialogBody,
    DialogContent,
    DialogSurface,
    DialogTitle,
    DialogTrigger,
    Input,
    Label
} from "@fluentui/react-components";
import { uploadImageToDatabase } from "../../handlers/DatabaseHandler";

type Props = {
    newsItem?: NewsModel;
    button: ReactElement;
    onClose: () => void;
};

const NewsDialog: React.FC<Props> = ({ newsItem: propItem, button, onClose }) => {
    const isEdit = propItem !== undefined;

    const initialItem: NewsModel = propItem || {
        id: 0,
        created_at: new Date(),
        title: "",
        description: "",
        category: "",
        image_url: "",
        link: "",
        date: new Date()
    };

    const [newsItem, setNewsItem] = useState<NewsModel>(initialItem);

    const baseId = useId();

    const fieldIds = {
        title: `${baseId}-title`,
        description: `${baseId}-description`,
        category: `${baseId}-category`,
        image_url: `${baseId}-image_url`,
        link: `${baseId}-link`,
    } as const;

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

    const saveNewsItem = () => {
        console.log(newsItem);
        onClose();
    };

    return (
        <Dialog>
            <DialogTrigger disableButtonEnhancement>
                {button}
            </DialogTrigger>

            <DialogSurface className="dialog">
                <DialogBody>
                    <DialogTitle>
                        Nieuwsitem {isEdit ? "bewerken" : "toevoegen"}
                    </DialogTitle>

                    <DialogContent>
                        <form className="flex flex-column flex-gap-medium">
                            <div className={`flex flex-column`}>
                                <Label htmlFor={fieldIds.title}>Titel</Label>
                                <Input
                                    id={fieldIds.title}
                                    value={newsItem.title}
                                    onChange={(e) =>
                                        setNewsItem({ ...newsItem, title: e.target.value })
                                    }
                                />
                            </div>

                            <div className={`flex flex-column`}>
                                <Label htmlFor={fieldIds.description}>Beschrijving</Label>
                                <Input
                                    id={fieldIds.description}
                                    value={newsItem.description ?? ""}
                                    onChange={(e) =>
                                        setNewsItem({ ...newsItem, description: e.target.value })
                                    }
                                />
                            </div>

                            <div className={`flex flex-column`}>
                                <Label htmlFor={fieldIds.category}>Category</Label>
                                <Input
                                    id={fieldIds.category}
                                    value={newsItem.category ?? ""}
                                    onChange={(e) =>
                                        setNewsItem({ ...newsItem, category: e.target.value })
                                    }
                                />
                            </div>

                            <div className={`flex flex-column`}>
                                <Label htmlFor={fieldIds.link}>Link</Label>
                                <Input
                                    id={fieldIds.link}
                                    value={newsItem.link ?? ""}
                                    onChange={(e) =>
                                        setNewsItem({ ...newsItem, link: e.target.value })
                                    }
                                />
                            </div>

                            <div className={`flex flex-column`}>
                                <Label htmlFor={fieldIds.image_url}>Afbeelding</Label>
                                <Input
                                    id={fieldIds.image_url}
                                    value={newsItem.image_url ?? ""}
                                    onChange={(e) =>
                                        setNewsItem({ ...newsItem, image_url: e.target.value })
                                    }
                                />

                                <input type="file" accept="image/*" onChange={handleImageUpload} />
                            </div>
                        </form>
                    </DialogContent>

                    <DialogActions>
                        <DialogTrigger>
                            <Button className="button">Sluiten</Button>
                        </DialogTrigger>

                        <Button className="button" appearance="primary" onClick={saveNewsItem}>
                            Opslaan
                        </Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
};

export default NewsDialog;