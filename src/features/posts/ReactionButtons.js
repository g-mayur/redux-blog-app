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
    const count = post.reactions[name];
    let formattedCount;
    if (count >= 100000) {
      formattedCount = (count / 100000).toFixed(1) + 'L';
    } else if (count >= 1000) {
      formattedCount = (count / 1000).toFixed(1) + 'K';
    } else {
      formattedCount = count.toString();
    }
    return (
      <button
        key={name}
        type="button"
        className={`reactionButton position-relative d-flex justify-content-center align-items-center px-3 py-2 gap-2 ${name}`}
        onClick={() => dispatch(reactionAdded({ postId: post.id, reaction: name }))}
      >
        {emoji} <span className='count'>{formattedCount}</span>
      </button>
    );
  });

  return <div className='d-flex flex-wrap align-items-center gap-3 mt-3'>{reactionButtons}</div>;
};

export default ReactionButtons;
