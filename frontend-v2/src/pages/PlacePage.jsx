import { useEffect, useState, useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingWidget from "../BookingWidget";
import { UserContext } from "../UserContext";
import Rate from "../Rate";
import '../Loading.css';
import { useNavigate } from "react-router-dom"

export default function PlacePage() {
  const navigate = useNavigate();
  const { ready, user } = useContext(UserContext);
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [rate, setRate] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // const token = localStorage.getItem("token");

    // if (!id) {
    //   return;
    // }
    // axios.get(`/places/${id}`).then((response) => {
    //   setPlace(response.data);
    // });
    // axios.get(`/feedback/${id}`).then((response) => {
    //   setFeedbacks(response.data[0].feedback.reverse());
    //   setRate(response.data[0].rating);
    // });
    // axios.get("/wishlist").then((response) => {
    //   setWishlist(response.data[0].wishlist.map((obj) => obj.place._id));
    // });
    const token = localStorage.getItem("token");

    if (!token) {
      // alert("You must be logged in to view this information.");
      navigate("/login")
      return;
    }

    if (!id) {
      return;
    }

    axios.get(`/place/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPlace(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch place:", error);
        alert("Failed to fetch place.");
    });

    axios.get(`/place/${id}/feedback`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.data && response.data.length > 0) {
        const feedbacks = response.data.reverse();
        const totalRate = feedbacks.reduce((sum, feedback) => sum + feedback.rate, 0);
        const averageRate = totalRate / feedbacks.length;
        setFeedbacks(feedbacks);
        setRate(averageRate);
      } else {
        setFeedbacks([]);
        setRate(0);
      }
    })
    .catch((error) => {
      console.error("Failed to fetch feedback:", error);
      alert("Failed to fetch feedback.");
    });

  axios
    .get("/wishlist", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const placeIds = response.data?.places
          .map((obj) => obj.id);
      setIsFavorite(placeIds?.includes(id));
    })
    .catch((error) => {
      console.error("Failed to fetch wishlist:", error);
      alert("Failed to fetch wishlist.");
    });
  }, [id]);

  if (!ready) {
    // return "Loading...";
    return (
      // <h1 className="px-10 sm:px-20 pt-3 font-semibold text-xl">Loading...</h1>
      <div className="loading-container">
      <div className="spinner"></div>
      <h1 className="loading-text">Loading...</h1>
    </div>
  );
  }

  if (!place) return "";

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // JavaScript months are 0-based.
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  async function addWishlist(ev, place) {
    const token = localStorage.getItem("token");
    await axios.post(`/wishlist/${place._id}`,null,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setWishlist((prevWishlist) => [...prevWishlist, place._id]);
    setIsFavorite(true);
  }

  async function removeWishlist(ev, place) {
    const token = localStorage.getItem("token");

    ev.preventDefault();
    await axios.delete(`/wishlist/${place._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setWishlist((prevWishlist) =>
      prevWishlist.filter((id) => id !== place._id)
    );
    setIsFavorite(false);
  }

  return (
    <div className="pt-3 rounded-2xl md:w-full lg:w-2/3 m-auto px-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">{place.title}</h1>
          <div className="flex items-end py-2">
            <span className="material-symbols-outlined text-2xl pr-1">
              star
            </span>
            {rate !== 0 && (
              <h1 className="text-2xl font-semibold">{rate.toPrecision(2)}</h1>
            )}
            {rate === 0 && <h1 className="text-2xl font-semibold">-</h1>}
            <h1 className="text-xl text-gray-400">/5</h1>
            <h1 className="font-semibold px-1">
              {" "}
              - {feedbacks.length} reviews
            </h1>
          </div>
        </div>
        {!isFavorite && ( // Nếu không yêu thích
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-14 h-14 text-red-500 hover:fill-current cursor-pointer"
                onClick={(ev) => addWishlist(ev, place)}
            >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
        )}
        {isFavorite && (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-14 h-14 text-red-500 fill-current cursor-pointer"
                onClick={(ev) => removeWishlist(ev, place)}
            >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
        )}
      </div>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check-in: {place.checkIn}
          <br />
          Check-out: {place.checkOut}
          <br />
          Max number of guests: {place.maxGuests}
          <br />
          Feature:
          {place.perks.map((perk) => (
            <li key={perk} className="ml-2 capitalize">
              {perk}
            </li>
          ))}
        </div>
        <div className="z-0">
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
          {place.extraInfo}
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Review</h2>
          <div className="flex items-end py-2">
            <span className="material-symbols-outlined text-2xl pr-1">
              star
            </span>
            {rate !== 0 && (
              <h1 className="text-2xl font-semibold">{rate.toPrecision(2)}</h1>
            )}
            {rate === 0 && <h1 className="text-2xl font-semibold">-</h1>}
            <h1 className="text-xl text-gray-400">/5</h1>
            <h1 className="font-semibold px-1">
              {" "}
              - {feedbacks.length} reviews
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {feedbacks.length > 0 &&
              feedbacks.map((feedback) => (
                <div key={feedback._id} className="py-5">
                  <div className="flex">
                    <img
                      className="h-16 border-2 rounded-full my-auto"
                      src="https://i.pinimg.com/originals/39/a4/71/39a47159059f38a954d77e5dcae6f0db.jpg"
                      alt="avatar"
                    />
                    <div className="pl-3">
                      <h1 className="font-semibold capitalize">
                        {feedback.user.firstName + " " + feedback.user.lastName}
                      </h1>
                      <h1 className="text-sm text-gray-500">
                        {feedback.user.email}
                      </h1>
                      <Rate rating={feedback.rate} />
                      <h1 className="text-gray-500 text-sm">
                        {formatDate(feedback.date)}
                      </h1>
                    </div>
                  </div>
                  <div className="pt-5">
                    <h1>{feedback.comment}</h1>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
