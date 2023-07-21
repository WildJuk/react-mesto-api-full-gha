import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwner = card.owner === currentUser._id;
  const isLiked = card.likes.some(item => item === currentUser._id);

  function handleClick() {
    onCardClick(card);
  };

  function handleLikeClick() {
    onCardLike(card);
  };

  function handleDeleteClick() {
    onCardDelete(card._id);
  };

  return (
    <li className="element">
      <img
        src={card.link}
        alt={card.name}
        className="element__mask-group"
        onClick={handleClick}
      />
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__button-like-container">
          <button
            type="button"
            aria-label="Иконка лайка на карточке"
            className={`element__like ${isLiked && 'element__like_active'}`}
            onClick={handleLikeClick}
          />
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
      {isOwner &&
        <button
          type="button"
          aria-label="Иконка удаления на карточке"
          className="element__trash"
          onClick={handleDeleteClick}
        />}
    </li>
  )
}