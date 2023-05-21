import ItemNotFound from "../../assets/kids_emotions.png";

const NoItem = () => {
  return (
    <>
      <div className="cart__boundry w-full p-4">
        <img src={ItemNotFound} alt="empty" />
        <div className="info__text">
          <p className="text-2xl text-white">No results found!</p>
          <p className="text-sm font-light">
            We couldn't find what you searched for Try searching again
          </p>
        </div>
      </div>
    </>
  );
};

export default NoItem;
