import logo from '../assets/belius-logo.avif';
import bg from '../assets/bg-header.jpg';

const Header = () => {
    return (
        <>
            {/*<img className={`header-bg-image`} src={bg} alt={`bg-image`}/>*/}
            <div className={`header`}>
                <div className={`header-image-container`}>
                    <img className={`header-image`} src={logo} alt={`Belius Logo`}/>
                </div>
            </div>
        </>
    );
}

export default Header;