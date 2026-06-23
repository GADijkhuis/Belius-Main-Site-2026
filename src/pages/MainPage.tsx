import Header from "../components/Header";
import About from "../components/About";
import Footer from "../components/Footer";
import News from "../components/News";
import Line from "../components/assets/Line";
import {useEffect, useState} from "react";
import {isUserLoggedIn} from "../handlers/UserHandler";
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
                    <div className={`page-section`}>
                        <BlogCategory />
                        <Line/>
                    </div>
                }
                <div className={`page-section`}>
                    <News />
                    <Line/>
                </div>
                <About />
                <Line/>
                <Footer />
            </div>
        </>
    );
}

export default MainPage;