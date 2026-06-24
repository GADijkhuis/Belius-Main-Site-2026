import {Button} from "@fluentui/react-components";

const BackButton = () => {
    return (
        <div>
            <Button as={`a`} className={`button`} onClick={async () => {window.history.back()}}>← Terug</Button>
        </div>
    );
}

export default BackButton;