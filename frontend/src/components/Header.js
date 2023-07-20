import { useState } from 'react';
import logo from './../images/header/logo.svg';
import { useLocation, Link } from 'react-router-dom';
import HeaderSubmenu from './HeaderSubmenu';
import burger from './../images/header/burger.svg';
import burgerOpen from './../images/header/burger_open.svg';

export default function Header({ loggedIn, onSignOut, email }) {
    const location = useLocation();
    const [isMobileHeaderOpen, setIsMobileHeaderOpen] = useState(false);

    return (
        <header className={`header ${loggedIn ? 'header_loggedIn' : ''}`}>
            <div className={`header__container ${loggedIn ? 'header__container_loggedIn' : ''}`}>
                <img src={logo} alt="Логотип страницы Mesto" className="header__logo" />
                {
                    loggedIn &&
                    <button
                        className='header__button-submenu'
                        onClick={
                            () => setIsMobileHeaderOpen(prevState => !prevState)
                        }
                    >
                        <img
                            src={isMobileHeaderOpen ? burgerOpen : burger}
                            width={isMobileHeaderOpen ? 20 : 24}
                            height={isMobileHeaderOpen ? 20 : 18}
                        />
                    </button>
                }
            </div>
            {!loggedIn
                ? <>
                    {
                        location.pathname === '/sign-up' &&
                        <Link className='header__link' to="/sign-in">Войти</Link>
                    }
                    {
                        location.pathname === '/sign-in' &&
                        <Link className='header__link' to="/sign-up">Зарегистрироваться</Link>
                    }
                </>
                : <>
                    <HeaderSubmenu
                        email={email}
                        isMobileHeaderOpen={isMobileHeaderOpen}
                        onSignOut={onSignOut}
                    />
                </>
            }
        </header>
    )
}