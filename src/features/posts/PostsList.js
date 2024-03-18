import { useSelector } from 'react-redux';
import {
    selectAllPosts,
    selectPostsStatus,
    selectPostsError,
} from './postsSlice';
import PostsExerpt from './PostsExerpt';
import "../../styles/blog.css";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const PostsList = () => {
    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(selectPostsStatus);
    const error = useSelector(selectPostsError);

    let content;
    if (postsStatus === 'loading') {
        if (posts.length === 0) {
            content = <>
                <section className='text-center not-found d-flex align-items-center justify-content-center'>
                    <h2 className='mb-0'>Loading...</h2>
                </section>
            </>
        } else {
            content = posts.map((post) => (
                <div className="col col-sm-12 col-md-6 col-lg-4 col-xl-3" key={post.id}>
                    <Skeleton />
                </div>
            ));
        }
    } else if (postsStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
        content = orderedPosts.map((post) => (
            <PostsExerpt key={post.id} post={post} />
        ));
    } else if (postsStatus === 'failed') {
        content = <p>{error}</p>;
    }

    return (
        <section className="posts-list">
            <div className="container-fluid">
                <div className="row g-3">
                    {content}
                </div>
            </div>
        </section>
    );
};

export default PostsList;
