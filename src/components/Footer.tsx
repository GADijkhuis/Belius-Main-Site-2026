import {Link, Subtitle1} from "@fluentui/react-components";
import {Envelope, Facebook, Instagram} from "react-bootstrap-icons";

const Footer = () => {
    return (
        <>
            <div className={`flex flex-col-phone`}>
                <div className={`flex-1`}>
                    <ul className={`ul-no-list`}>
                        <li>
                            <Subtitle1 className={`text-no-margin`}>Contact</Subtitle1>
                        </li>
                        <li>
                            <Link appearance={`subtle`} href={`mailto:bernhold@belius.nl`}>bernhold@belius.nl</Link>
                        </li>
                        <li>
                            <div className={`flex flex-gap-small`}>
                                <Link appearance={`subtle`} target={`_blank`} href={`https://www.instagram.com/belius_zeilen/`} className={`link-social`}><Instagram/></Link>
                                <Link appearance={`subtle`} target={`_blank`} href={`https://www.facebook.com/profile.php?id=61587201730424`} className={`link-social`}><Facebook/></Link>
                                <Link appearance={`subtle`} target={`_blank`} href={`mailto:bernhold@belius.nl`} className={`link-social`}><Envelope/></Link>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className={`flex-1`}>
                    <ul className={`ul-no-list`}>
                        <li>
                            <Subtitle1 className={`text-no-margin`}>Wedstrijden volgen</Subtitle1>
                        </li>
                        <li>

                        </li>
                    </ul>
                </div>
                <div className={`flex-1`}>
                    <ul className={`ul-no-list`}>
                        <li>
                            <Subtitle1 className={`text-no-margin`}>Snel naar</Subtitle1>
                        </li>
                        <li>
                            <Link appearance={`subtle`} href={`#`}>Home</Link>
                        </li>
                        <li>
                            <Link appearance={`subtle`} href={`#news`}>Nieuws</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Footer;