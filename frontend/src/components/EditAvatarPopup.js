import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({
    isOpen,
    onClose,
    onUpdateAvatar
}) {

    const inputAvatarRef = useRef(null);

    function handleSubmit(event) {
        event.preventDefault();

        onUpdateAvatar({
            avatar: inputAvatarRef.current.value
        });
    };

    return (
        <PopupWithForm
            name="avatar-edit"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClose}
            submitButtonText={'Сохранить'}
            onSubmit={handleSubmit}
        >
            <input
                required
                id="avatar"
                type="url"
                name="userAvatar"
                className="form__input form__input_name_profile-avatar"
                placeholder="Ссылка на изображение"
                ref={inputAvatarRef}
            />
            <p className="form__input-error avatar-error" />
        </PopupWithForm>
    );
}