import {Button, Subtitle1, Title2} from "@fluentui/react-components";

const Footer = () => {
    return (
        <>
            <div className={`flex flex-wrap-reverse`}>
                <div className={`flex-1`}>
                    <ul>

                    </ul>
                    <Subtitle1 className={`text-no-margin`}>Email</Subtitle1>
                    <Button as={`a`} href={`mailto:bernhold@belius.nl`} target="_blank" appearance={`subtle`} rel="noopener noreferrer">bernhold@belius.nl</Button>
                </div>
                <div className={`flex-1`}>
                    <b className={`text-no-margin`} >Snel naar: </b>
                    <ul>
                        <li>Start</li>
                        <li>News</li>
                        <li>Over</li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Footer;