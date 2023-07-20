import { useRef } from "react";
export default function PopupWithForm({
    name,
    title,
    isOpen,
    onClose,
    submitButtonText,
    onSubmit,
    children
}) {
    const formRef = useRef(null);

    const handleClickClose = () => {
        onClose();
        formRef.current.reset();
    }

    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button type="button" aria-label="Закрыть попап" className="popup__close" onClick={handleClickClose} />
                <h2 className="popup__title">{title}</h2>
                <form
                    ref={formRef}
                    name={name}
                    className={`form form_${name}`}
                    noValidate
                    onSubmit={onSubmit}
                >
                    {children}
                    <button
                        type="submit"
                        className="form__submit-button"
                    >
                        {submitButtonText}
                    </button>
                </form>
            </div>
        </div>
    );
}