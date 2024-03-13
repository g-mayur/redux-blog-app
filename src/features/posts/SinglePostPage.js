import { useSelector } from 'react-redux';
import { selectPostById } from './postsSlice';

import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

import { useParams, Link } from 'react-router-dom';

const SinglePostPage = () => {
    const { postId } = useParams();

    const post = useSelector((state) => selectPostById(state, Number(postId)));

    if (!post) {
        return (
            <div className="container-fluid">
                <div className="row g-3">
                    <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <section className='text-center not-found d-flex align-items-center justify-content-center'>
                            <h2>No Post Found</h2>
                        </section>
                    </div>
                </div>
            </div>
        );
    }

    // Repeat {post.body} 20 times
    const repeatedBody = Array.from({ length: 20 }, () => post.body);
    return (
        <div className="container-fluid">
            <div className="row g-3">
                <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div className='article details d-flex flex-column'>
                        <h2 className='mb-0 blog-title'>{post.title}</h2>
                        <div className='author-time d-flex flex-column flex-grow-1'>
                            <PostAuthor userId={post.userId} />
                            <TimeAgo timestamp={post.date} />
                        </div>
                        <p className='flex-grow-1 blog-description'>{repeatedBody}</p>
                        <div className="postCredit mt-auto d-flex align-items-center">
                            <Link to={`/post/edit/${post.id}`} className='btn btn-primary ml-auto'>Edit Post </Link>
                        </div>
                        <ReactionButtons post={post} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SinglePostPage;
