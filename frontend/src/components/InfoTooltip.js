import success from './../images/popup/tooltip-success.svg';
import error from './../images/popup/tooltip-error.svg';

export default function InfoTooltip({
    isOpen,
    onClose,
    tooltipType = 'error'
}) {
    const variables = {
        success: {
            img: success,
            text: 'Вы успешно зарегистрировались!'
        },
        error: {
            img: error,
            text: 'Что-то пошло не так! Попробуйте ещё раз.'
        }
    };

    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_type_tooltip">
                <button type="button" aria-label="Закрыть попап" className="popup__close" onClick={onClose} />
                <img width={120} height={120} src={variables[tooltipType].img} alt={variables[tooltipType].text}/>
                <p className='popup__title popup__title_in-tooltip'>{variables[tooltipType].text}</p>
            </div>
        </div>
    );
}