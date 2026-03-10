import logo from '../assets/belius-logo.avif';

const Header = () => {
    return (
        <>
            <div className={`header`}>
                <div className={`header-image-container`}>
                    <img className={`header-image`} src={logo} alt={`Belius Logo`}/>
                </div>
            </div>
        </>
    );
}

export default Header;