import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div className='group relative w-full border border-teal-500 rounded-lg overflow-hidden transition-all duration-300 hover:border-2'>
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt='post cover'
         className='h-[260px] w-full object-cover transition-all duration-300  group-hover:scale-110 z-20'
        />
      </Link>
      <div className='p-3 flex flex-col gap-2'>
        <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
        <span className='italic text-sm mb-16'>{post.category}</span>
        <Link
          to={`/post/${post.slug}`}
          className=' absolute  bottom-0 left-0 right-0 text-teal-500 border border-teal-500 transition-all duration-300 group-hover:bottom-0 hover:bg-teal-500 hover:text-white text-center py-2 rounded-md !rounded-tl-none m-2'
        >
          Read 
        </Link>
      </div>
    </div>
  );
}