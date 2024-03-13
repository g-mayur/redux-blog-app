import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
// import ReactionButtons from './ReactionButtons';
import { Link } from 'react-router-dom';

const PostExerpt = ({ post }) => {
    return (
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
            <div className='article d-flex flex-column'>
                <h2 className='mb-0 blog-title'>{post.title}</h2>
                <p className='flex-grow-1 blog-description'>{post.body.substring(0, 80)}...</p>
                <div className="postCredit mt-auto d-flex align-items-center">
                    <div className='author-time d-flex flex-column flex-grow-1'>
                        <PostAuthor userId={post.userId} />
                        <TimeAgo timestamp={post.date} />
                    </div>
                    <Link to={`/post/${post.id}`} className='btn btn-primary ml-auto'>View Post </Link>
                </div>
                {/* <ReactionButtons post={post} /> */}
            </div>
        </div>
    );
};

export default PostExerpt;
