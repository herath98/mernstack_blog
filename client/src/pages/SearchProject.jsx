import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function SearchProject() {
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        sort: 'desc',
        categories: '',
    });

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortFromUrl = urlParams.get('sort');
        const categoriesFromUrl = urlParams.getAll('category');

        if (searchTermFromUrl || sortFromUrl || categoriesFromUrl.length > 0) {
            setSidebarData({
                searchTerm: searchTermFromUrl || '',
                sort: sortFromUrl || 'desc',
                categories: categoriesFromUrl.join(', ') || '',
            });
        }

        const fetchPosts = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/project/getproject?${searchQuery}`);
            if (!res.ok) {
                setLoading(false);
                return;
            }
            const data = await res.json();
            setPosts(data.posts);
            setLoading(false);
            setShowMore(data.posts.length === 9);
        };
        fetchPosts();
    }, [location.search]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setSidebarData({ ...sidebarData, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('sort', sidebarData.sort);

        // Split the categories input by commas and trim whitespace
        const categoriesArray = sidebarData.categories.split(',').map((cat) => cat.trim());

        categoriesArray.forEach((category) => {
            if (category) urlParams.append('category', category);
        });

        const searchQuery = urlParams.toString();
        navigate(`/searchproject?${searchQuery}`);
    };

    const handleShowMore = async () => {
        const numberOfPosts = posts.length;
        const startIndex = numberOfPosts;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/project/getproject?${searchQuery}`);
        if (!res.ok) {
            return;
        }
        const data = await res.json();
        setPosts([...posts, ...data.posts]);
        setShowMore(data.posts.length === 9);
    };

    return (
        <div className='flex flex-col'>
            <div className='p-8 border-gray-500'>
                <form className='flex flex-row justify-end gap-4' onSubmit={handleSubmit}>
                    <div className='flex gap-4 justify-between'>
                        <label className='whitespace-nowrap font-semibold'>
                            Search Term:
                        </label>
                        <TextInput
                            placeholder='Search...'
                            id='searchTerm'
                            type='text'
                            value={sidebarData.searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex justify-items-start gap-2'>
                        <label className='font-semibold'>Sort:</label>
                        <Select
                            onChange={handleChange}
                            value={sidebarData.sort}
                            id='sort'
                            className='form-select'
                        >
                            <option value='desc'>Latest</option>
                            <option value='asc'>Oldest</option>
                        </Select>
                    </div>
                    <div className='flex gap-4 justify-between'>
                        <label className='whitespace-nowrap font-semibold'>
                            Categories :
                        </label>
                        <TextInput
                            placeholder='e.g., reactjs, nextjs, javascript'
                            id='categories'
                            type='text'
                            value={sidebarData.categories}
                            onChange={handleChange}
                        />
                    </div>
                    <Button type='submit' outline gradientDuoTone='purpleToPink'>
                        Apply Filters
                    </Button>
                </form>
            </div>
            <div className='w-full'>
                <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5'>
                    Posts results:
                </h1>
                <div className='p-7 flex flex-col gap-4'>
                    {!loading && posts.length === 0 && (
                        <p className='text-xl text-gray-500'>No posts found.</p>
                    )}
                    {loading && <p className='text-xl text-gray-500'>Loading...</p>}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3'>
                        {!loading &&
                            posts &&
                            posts.map((post) => (
                                <div key={post._id}>
                                    <PostCard post={post} />
                                </div>
                            ))}
                    </div>
                    {showMore && (
                        <button
                            onClick={handleShowMore}
                            className='text-teal-500 text-lg hover:underline p-7 w-full'
                        >
                            Show More
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
