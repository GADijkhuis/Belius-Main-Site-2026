import React from "react";
import {
    Button,
    MessageBar,
    MessageBarActions,
    MessageBarBody, MessageBarIntent,
    MessageBarTitle
} from "@fluentui/react-components";
import { DismissRegular } from "@fluentui/react-icons";
import { motion, AnimatePresence } from "framer-motion";

class MessageBox extends React.Component<{ intent: MessageBarIntent, title: string, message: string, closeButtonFunction: React.MouseEventHandler }> {
    render() {
        const intent = this.props.intent;
        const title = this.props.title;
        const message = this.props.message;
        const closeButtonFunction = this.props.closeButtonFunction;

        return (
            <AnimatePresence>
                {(
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <MessageBar intent={intent}>
                            <MessageBarBody className={`flex flex-wrap`}>
                                <MessageBarTitle>{title}</MessageBarTitle>
                                {message}
                            </MessageBarBody>
                            { closeButtonFunction &&
                                <MessageBarActions>
                                    <Button
                                        as={`a`}
                                        appearance="subtle"
                                        icon={<DismissRegular />}
                                        onClick={closeButtonFunction}
                                    />
                                </MessageBarActions>
                            }

                        </MessageBar>
                    </motion.div>
                )}
            </AnimatePresence>
        );
    }
}

export default MessageBox;
