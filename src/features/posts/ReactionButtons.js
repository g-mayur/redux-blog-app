import { useDispatch } from 'react-redux';
import { reactionAdded } from './postsSlice';
import { FaThumbsUp, FaThumbsDown, FaHeart, FaMugHot, FaGift } from "react-icons/fa6";

const reactionEmoji = {
  thumbsUp: <FaThumbsUp />,
  wow: <FaThumbsDown />,
  heart: <FaHeart />,
  rocket: <FaMugHot />,
  coffee: <FaGift />,
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton d-flex align-items-center gap-2 px-3 py-1"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });

  return <div className='mt-3 d-flex align-items-center gap-3'>{reactionButtons}</div>;
};

export default ReactionButtons;
