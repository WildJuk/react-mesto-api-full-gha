export default function HeaderSubmenu({ email, isMobileHeaderOpen, onSignOut }) {
    return (
        <div className={`header__submenu ${!isMobileHeaderOpen ? 'header__submenu_hidden' : ''}`}>
            <p className='header__link header__link_submenu'>{email}</p>
            <button
                onClick={onSignOut}
                className='header__link header__link_submenu header__button-logout'
            >
                Выйти
            </button>
        </div>
    )
}