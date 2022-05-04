import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../utils/api";
import ErrorPage from "./ErrorPage";

const User = () => {
  const { username } = useParams();
  const [currentUser, setCurrentUser] = useState({});

  const [error, setError] = useState(null);

  useEffect(() => {
    getUserProfile(username)
      .then(({ data }) => {
        setCurrentUser(data.user);
      })
      .catch(({ response }) => {
        setError({ status: response.status, message: response.data.msg });
        console.log("welcome to the catch block, we got fun and games");
      });
  }, [username]);

  if (error) {
    return <ErrorPage status={error.status} message={error.message} />;
  }
  return (
    <>
      <img
        className="userProfile__picture"
        src={currentUser.avatar_url}
        alt={`${currentUser.username}'s avatar`}
      />
      <h2 className="userProfile__username">
        {currentUser.username}'s Profile
      </h2>
      <p className="userProfile__name">name: {currentUser.name}</p>

      <p>list of articles by {currentUser.username} </p>
      <p>list of comments by {currentUser.username}</p>
    </>
  );
};

export default User;
