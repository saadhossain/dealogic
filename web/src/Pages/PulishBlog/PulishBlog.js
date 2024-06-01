import JoditEditor from 'jodit-react';
import { React, useContext, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthProvider';
import useUser from '../../hooks/UseUser/useUser';

const PulishBlog = ({ placeholder }) => {

    //Text Editor Start
    const editor = useRef(null);
    const [content, setContent] = useState('');
    console.log(content);
    //Text Editor Ends
    //Get the Logged in user information from the context
    const { user } = useContext(AuthContext);
    const { loggedInUser } = useUser(user?.email);
    //Set all Input Values
    const [blogDetails, setBlogDetails] = useState();
    //Handle Input Values
    const handleValues = (e) => {
        e.preventDefault();
        const field = e.target.name;
        const value = e.target.value;
        const updatedDetails = { ...blogDetails };
        updatedDetails[field] = value;
        setBlogDetails(updatedDetails);
    };
    //Handle add /sell product functionality
    const handlePublishBlog = (e) => {
        e.preventDefault();
        const productImage = e.target.productImage.files[0];
        const formData = new FormData();
        formData.append('image', productImage);
        //Set Product Image to the IMGBB Server
        fetch('https://api.imgbb.com/1/upload?key=12bce7cbd26e6938d46594532d6a3147', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                const blogImage = data.data.url;
                //Product Detailed info
                const articleInfo = {
                    ...blogDetails,
                    description: content,
                    blogImage,
                    authorImage: loggedInUser?.profileImage,
                    authorName: loggedInUser?.fullName,
                    authorEmail: loggedInUser?.email,
                    publishedOn: new Date(),
                };
                console.log(articleInfo);
                //Save New Product to the Database
                fetch('https://dealogic-server-omega.vercel.app/blogs', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(articleInfo)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.acknowledged) {
                            toast.success('New Article Added Successfully...');
                            e.target.reset();
                        }
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));

    };
    return (
        <div className='w-full flex flex-col p-6 rounded-lg bg-slate-50 text-gray-700 shadow-xl'>
            <div className='relative'>
                <h1 className='text-xl lg:text-4xl font-bold text-dealogic mb-10'>Publish A Article</h1>
                <div className='border-2 border-dealogic w-20 absolute top-7 lg:top-8 left-40 lg:left-72'></div>
            </div>
            <form onSubmit={handlePublishBlog}>
                <div className="space-y-4">
                    {/* Blog Information Section */}
                    <h3 className='text-2xl font-semibold text-dealogic'>Article Information</h3>
                    <div>
                        <label htmlFor="blogTitle" className="mb-2 text-lg font-semibold">Article Title</label>
                        <input onBlur={handleValues} type="text" name="blogTitle" id="blogTitle" placeholder="Enter Article Title" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" required />
                    </div>
                    <div>
                        <label htmlFor="productImage" className="mb-2 text-lg block font-semibold">Image</label>
                        <input type="file" name="productImage" id="productImage" className="w-full px-3 py-2" required />
                        <label htmlFor="regularPrice" className="mb-2 text-lg">Image Dimension: <span className='font-semibold'>450px by 300px</span></label>
                    </div>
                    {/* <div>
                        <label htmlFor="description" className="mb-2 text-lg block">Article Details</label>
                        <textarea onBlur={handleValues} name="description" id="description" rows="3" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" placeholder=' Details Article' ></textarea>
                    </div> */}
                    {/* Text Editor Starts */}
                    <label htmlFor="blogTitle" className="my-2 text-lg font-semibold">Article Details</label>
                    <JoditEditor
                        ref={editor}
                        value={content}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={newContent => { }}
                    />
                    {/* Text Editor Ends */}
                </div>
                <div className='flex justify-center my-5'>
                    <button type='submit' className='bg-dealogic duration-500 ease-in-out hover:bg-secondary text-white font-semibold py-3 px-10 rounded'> Publish Blog</button>
                </div>
            </form>
        </div>
    );
};

export default PulishBlog;