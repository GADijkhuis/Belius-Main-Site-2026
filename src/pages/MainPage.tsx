import Header from "../components/Header";
import About from "../components/About";
import Footer from "../components/Footer";
import News from "../components/News";
import Line from "../components/assets/Line";
import {useEffect, useState} from "react";
import {isUserAdmin, isUserLoggedIn} from "../handlers/UserHandler";
import BlogCategory from "../components/BlogCategory";

const MainPage = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        isUserLoggedIn().then((r) => setLoggedIn(r));
    }, []);

    return (
        <>
            <Header />
            <div className={`body-container`}>
                { loggedIn &&
                    <>
                        <BlogCategory />
                        <Line/>
                    </>
                }
                <News />
                <Line/>
                <About />
                <Line/>
                <Footer />
            </div>
        </>
    );
}

export default MainPage;