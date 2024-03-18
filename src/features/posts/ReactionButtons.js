import { useDispatch } from 'react-redux';
import { reactionAdded } from './postsSlice';
import { FaThumbsUp, FaThumbsDown, FaHeart, FaMugHot, FaGift } from "react-icons/fa6";

const reactionEmoji = {
  thumbsUp: <FaThumbsUp color='#007bff' />,
  wow: <FaThumbsDown color='#fd7e14' />,
  heart: <FaHeart color='#dc3545' />,
  rocket: <FaMugHot color='#6c757d' />,
  coffee: <FaGift color='#ffc107' />,
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className={`reactionButton d-flex align-items-center gap-2 px-3 py-1 ${name}`}
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });

  return <div className='d-flex flex-wrap align-items-center gap-3 mt-3'>{reactionButtons}</div>;
};

export default ReactionButtons;
