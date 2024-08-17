import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function ProjectCard({ post }) {
  return (
    <div className='group relative w-full border border-teal-500 rounded-lg overflow-hidden transition-all duration-300 hover:border-2'>
      <Link to={`/project/${post.slug}`} aria-label={`Read more about ${post.title}`}>
        <img
          src={post.image}
          alt={`${post.title} cover`}
          className='h-[260px] w-full object-cover transition-all duration-300 group-hover:h-[200px] z-20'
        />
      </Link>
      <div className='p-3 flex flex-col gap-2'>
        <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
        <span className='text-sm grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-2 md:gap-2 font-medium px-2 py-1 rounded-md'>
          {Array.isArray(post.category) && post.category.map((cat, index) => (
            <Link
              key={index}
              to={`/searchproject?category=${cat}`}
            >
              <Button color='gray' pill size='xs'>
                {cat}
              </Button>
            </Link>
          ))}
        </span>
        <Link
          to={`/project/${post.slug}`}
          className='absolute bottom-[-200px] left-0 right-0 text-teal-500 border border-teal-500 transition-all duration-300 group-hover:bottom-0 hover:bg-teal-500 hover:text-white text-center py-2 rounded-md !rounded-tl-none m-2'
          aria-label={`Read more about ${post.title}`}
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
