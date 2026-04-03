import React, { useId, useState } from "react";
import {
    Button, Caption1,
    Dialog, DialogActions,
    DialogBody,
    DialogContent,
    DialogSurface,
    DialogTitle,
    DialogTrigger,
    Input,
    Label, Spinner
} from "@fluentui/react-components";
import { uploadImageToDatabase } from "../../handlers/DatabaseHandler";
import {Add16Filled} from "@fluentui/react-icons";
import {BlogModel} from "../../models/BlogModel";
import {addBlogItem, updateBlogItem} from "../../handlers/BlogHandler";

type Props = {
    blogItem?: BlogModel;
    onClose: () => void;
};

const BlogDialog: React.FC<Props> = ({ blogItem: propItem, onClose }) => {
    const isEdit = propItem !== undefined;

    const initialItem: BlogModel = propItem || {
        id: -1,
        created_at: new Date(),
        title: "",
        description: "",
        category: "",
        image_url: "",
        link: "",
        date: new Date()
    };

    const [blogItem, setBlogItem] = useState<BlogModel>(initialItem);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

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
            setBlogItem(prev => ({
                ...prev,
                image_url: url
            }));
        }
    };

    const saveBlogItem = async () => {
        setIsLoading(true);
        const result = isEdit ? await updateBlogItem(blogItem) : await addBlogItem(blogItem);
        setIsLoading(false);

        if (!result) return;

        if (result.error) {
            setError(result.error);
            return;
        }

        setIsOpen(false);

        onClose();
    };

    return (
        <Dialog open={isOpen}>
            <DialogTrigger disableButtonEnhancement>
                <Button as={`a`}
                        className={`button`}
                        onClick={ () => setIsOpen(true) } >
                    { isEdit ? <>Bewerken</> : <>Blog item toevoegen <Add16Filled/></> }
                </Button>
            </DialogTrigger>

            <DialogSurface className="dialog">
                <DialogBody>
                    { error && <Caption1>{ error }</Caption1> }
                    <DialogTitle>
                        Blog item {isEdit ? "bewerken" : "toevoegen"}
                    </DialogTitle>

                    <DialogContent>
                        <form className="flex flex-column flex-gap-medium">
                            <div className={`flex flex-column`}>
                                <Label htmlFor={fieldIds.title}>Titel</Label>
                                <Input
                                    id={fieldIds.title}
                                    value={blogItem.title}
                                    onChange={(e) =>
                                        setBlogItem({ ...blogItem, title: e.target.value })
                                    }
                                />
                            </div>

                            <div className={`flex flex-column`}>
                                <Label htmlFor={fieldIds.description}>Beschrijving</Label>
                                <Input
                                    id={fieldIds.description}
                                    value={blogItem.description ?? ""}
                                    onChange={(e) =>
                                        setBlogItem({ ...blogItem, description: e.target.value })
                                    }
                                />
                            </div>

                            <div className={`flex flex-column`}>
                                <Label htmlFor={fieldIds.category}>Categorie</Label>
                                <Input
                                    id={fieldIds.category}
                                    value={blogItem.category ?? ""}
                                    onChange={(e) =>
                                        setBlogItem({ ...blogItem, category: e.target.value })
                                    }
                                />
                            </div>

                            <div className={`flex flex-column`}>
                                <Label htmlFor={fieldIds.link}>Link</Label>
                                <Input
                                    id={fieldIds.link}
                                    value={blogItem.link ?? ""}
                                    onChange={(e) =>
                                        setBlogItem({ ...blogItem, link: e.target.value })
                                    }
                                />
                            </div>

                            <div className={`flex flex-column`}>
                                <Label htmlFor={fieldIds.image_url}>Afbeelding</Label>
                                <Input
                                    id={fieldIds.image_url}
                                    value={blogItem.image_url ?? ""}
                                    onChange={(e) =>
                                        setBlogItem({ ...blogItem, image_url: e.target.value })
                                    }
                                />
                            </div>
                            <div className={`file-input-wrapper`} >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                                <svg className="file-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12M8 8l4-4 4 4" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <p>Upload een afbeelding</p>
                            </div>
                        </form>
                    </DialogContent>

                    <DialogActions>
                        <Button as={`a`} className="button" onClick={() => setIsOpen(false)}>
                            Sluiten
                        </Button>
                        <Button as={`a`} className="button" appearance="primary" onClick={saveBlogItem} disabled={isLoading}>
                            Opslaan
                        </Button>
                        {
                            isLoading && <Spinner size={`extra-tiny`}/>
                        }
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
};

export default BlogDialog;