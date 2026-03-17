import {Title1} from "@fluentui/react-components";
import AboutImage from "../assets/AboutImage.webp";

const About = () => {
    return (
        <>
            <Title1>Over Belius</Title1>
            <div id={`about`} className="flex flex-wrap-reverse flex-gap-medium flex-align-stretch">
                <div className="about-text">
                    <p>
                        Belius zeilen wil het zeilen voor met name jeugd bevorderen. Samen met de zeilers zoeken we naar wat het beste voor de zeiler en het team is. Denk bijvoorbeeld aan trainingsvormen of begeleiding tijdens trainingen.
                        Plezier staat altijd voorop. Naast trainingen begeleiden wij de zeilers tijdens wedstrijden of evenementen.
                        In het voorjaar bespreken we, met de zeilers en ouders, de wedstrijdkalender en overleggen wij waar we als Belius zeilteam aan deelnemen.
                        Natuurlijk staat het een ieder vrij om zelfstandig naar andere wedstrijden en evenementen te gaan. Mocht de zeiler alleen de trainingen willen bijwonen, dan is dat ook geen probleem.
                        Zolang we maar plezier beleven in het zeilen, dat is de basis en vandaaruit gaan we verder ontwikkelen.
                    </p>
                </div>
                <div className="about-image">
                    <img src={AboutImage} alt="About Image" />
                </div>

            </div>

        </>
    );
}

export default About;