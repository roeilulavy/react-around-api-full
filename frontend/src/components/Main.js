import Card from "./Card";
import Spinner from "./Spinner";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  isLoading,
  cards,
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__profile-holder">
          <img
            className="profile__profile-image"
            src={currentUser.avatar}
            alt="User avatar"
          />
          <button
            type="button"
            className="profile__edit-picture"
            onClick={onEditAvatarClick}
          ></button>
        </div>

        <div className="profile__profile-info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__edit-button"
            onClick={onEditProfileClick}
          ></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>

        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlaceClick}
        ></button>
      </section>

      <>{isLoading ? <Spinner /> : null}</>

      <section className="elements">
        {cards.map((card) => {
          return (
            <Card
              card={card}
              key={card._id}
              title={card.name}
              link={card.link}
              likes={card.likes.length}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
