import { useState, useContext, useEffect } from "react";
import { patchCommentVotes } from "../utils/api";
import { UserContext } from "../contexts/user";
import { Link } from "react-router-dom";
import { deleteComment } from "../utils/api";

const Comment = ({ comment, comments, setComments }) => {
  const { loggedInUser } = useContext(UserContext);

  const [localVote, setLocalVote] = useState(0);

  // patchCommentVotes needs fixing - patch request only upvotes

  const handleVotes = (clickDirection) => {
    setLocalVote((currentValue) => {
      return currentValue + clickDirection;
    });
    patchCommentVotes(comment.comment_id, 1);
  };

  return (
    <li className="commentCard" key={comment.comment_id}>
      <p>
        <strong>
          <Link to={`/users/${comment.author}`}>{comment.author}</Link>
        </strong>{" "}
        at {comment.created_at}
      </p>
      <p>{comment.body}</p>
      <p>{comment.votes + localVote} votes</p>

      {!loggedInUser.username ||
      loggedInUser.username === comment.author ? null : (
        <>
          <button
            onClick={() => {
              handleVotes(1);
            }}
          >
            upvote this comment
          </button>
          <button
            onClick={() => {
              handleVotes(-1);
            }}
          >
            downvote this comment
          </button>
        </>
      )}

      {loggedInUser.username === comment.author ? (
        <button
          onClick={() => {
            deleteComment(comment.comment_id);
          }}
        >
          delete comment
        </button>
      ) : null}
    </li>
  );
};

export default Comment;
