export default function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup_type_image-full ${card ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_type_image">
            <button type="button" aria-label="Закрыть попап" className="popup__close" onClick={onClose} />
            <figure className="popup__image-group">
                <img src={card?.link} alt={card?.name} className="popup__image" />
                <figcaption className="popup__caption">{card ? card.name : ''}</figcaption>
            </figure>
            </div>
        </div>
    );
}