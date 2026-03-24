import {
    Button, Caption1,
    Dialog,
    DialogActions, DialogBody,
    DialogContent,
    DialogSurface,
    DialogTitle,
    DialogTrigger
} from "@fluentui/react-components";
import React, {ReactElement, useState} from "react";

type Props = {buttonContent: ReactElement, title: string, description: string, onConfirm: () => void};

const ConfirmDialog: React.FC<Props> = ({buttonContent, title, description, onConfirm}) => {

        const [isOpen, setIsOpen] = useState(false);

        return (
            <Dialog open={isOpen}>
                <DialogTrigger>
                    <Button as={`a`} className={`button`} onClick={() => setIsOpen(true)}>
                        {buttonContent}
                    </Button>
                </DialogTrigger>
                <DialogSurface>
                    <DialogBody>
                        <DialogTitle>
                            {title}
                        </DialogTitle>
                        <DialogContent>
                            <p>
                                {description}
                            </p>
                        </DialogContent>
                        <DialogActions>
                            <Button as={`a`} className={`button`} onClick={() => setIsOpen(false)}>
                                Annuleren
                            </Button>
                            <Button as={`a`} className={`button`} onClick={() => { setIsOpen(false); onConfirm(); }}>
                                Ok
                            </Button>
                        </DialogActions>
                    </DialogBody>
                </DialogSurface>
            </Dialog>
        );

    // return (
    //     <Dialog>
    //         <DialogTrigger>
    //             <div style={{display: "flex"}}>
    //
    //             </div>
    //         </DialogTrigger>
    //         <DialogSurface>
    //             <DialogTitle>{title}</DialogTitle>
    //             <DialogContent>
    //                 <div className={`dialog-content-container`}>
    //                     {description}
    //                 </div>
    //             </DialogContent>
    //             <DialogActions>
    //                 <DialogTrigger disableButtonEnhancement>
    //                     <Button as={"a"} appearance="secondary">Annuleren</Button>
    //                 </DialogTrigger>
    //                 <DialogTrigger>
    //                     <Button as={"a"} appearance="primary" style={{backgroundColor: buttonColor}} onClick={onConfirm}>
    //                         {buttonText}
    //                     </Button>
    //                 </DialogTrigger>
    //             </DialogActions>
    //         </DialogSurface>
    //     </Dialog>
    // );
}

export default ConfirmDialog;