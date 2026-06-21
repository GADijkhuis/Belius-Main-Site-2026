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
import {addBlogCategoryItem, updateBlogCategoryItem} from "../../handlers/BlogHandler";
import {BlogCategoryModel} from "../../models/BlogCategoryModel";

type Props = {
    blogCategoryItem?: BlogCategoryModel;
    onClose: () => void;
    isAdmin?: boolean;
};

const BlogCategoryDialog: React.FC<Props> = ({ blogCategoryItem: propItem, onClose, isAdmin = false }) => {
    const isEdit = propItem !== undefined;

    const initialItem: BlogCategoryModel = propItem || {
        id: -1,
        name: "",
        image_url: "",
    };

    const [blogCategoryItem, setBlogCategoryItem] = useState<BlogCategoryModel>(initialItem);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const baseId = useId();

    const fieldIds = {
        name: `${baseId}-name`,
        image_url: `${baseId}-image_url`,
    } as const;

    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const url = await uploadImageToDatabase(file);

        if (url) {
            setBlogCategoryItem(prev => ({
                ...prev,
                image_url: url
            }));
        }
    };

    const saveBlogCategoryItem = async () => {
        setIsLoading(true);
        const result = isEdit ? await updateBlogCategoryItem(blogCategoryItem) : await addBlogCategoryItem(blogCategoryItem);
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
                        onClick={ () => isAdmin && setIsOpen(true) } >
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
                                <Label htmlFor={fieldIds.name}>Titel</Label>
                                <Input
                                    id={fieldIds.name}
                                    value={blogCategoryItem.name}
                                    onChange={(e) =>
                                        setBlogCategoryItem({ ...blogCategoryItem, name: e.target.value })
                                    }
                                />
                            </div>

                            <div className={`flex flex-column`}>
                                <Label htmlFor={fieldIds.image_url}>Afbeelding</Label>
                                <Input
                                    id={fieldIds.image_url}
                                    value={blogCategoryItem.image_url ?? ""}
                                    onChange={(e) =>
                                        setBlogCategoryItem({ ...blogCategoryItem, image_url: e.target.value })
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
                        <Button as={`a`} className="button" appearance="primary" onClick={saveBlogCategoryItem} disabled={isLoading}>
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

export default BlogCategoryDialog;