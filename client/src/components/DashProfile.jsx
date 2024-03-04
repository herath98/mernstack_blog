
import { Alert, Button, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase/firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
export default function DashProfile() {
  // Get current user data from redux store
  const { currentUser } = useSelector((state) => state.user);
  // Store the selected file from the file input in the state
  const [imageFile, setImageFile] = useState(null);
  // Store the URL of the selected image in the state
  // This will be used to display the selected image before it's uploaded
  const [imageFileUrl, setImageFileUrl] = useState(null);
  // Store the progress of the image upload in the state
  const [imagefileUploadprogress, setImagefileUploadprogress] = useState(null);
  // Store any error during image upload in the state
  const [imageUploadError, setImageUploadError] = useState(null);

  // Create a ref to the file input element
  // We'll use this to programmatically set the input's value
  // when the user wants to upload a new profile image
  const filePickerRef = useRef();
  // Handle change event of the file input element
  // Reset file input value and display the selected image in the profile picture preview
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setImageFile(file); // Update the state with the selected file
      setImageFileUrl(URL.createObjectURL(file)); // Display the selected file as a preview
      
      // Comment:
      // We need to display the selected image as a preview before the user uploads it
      // So we create an object URL from the selected file and set it as the src of the img element
      // We need to revoke the object URL when the component unmounts to avoid memory leaks
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  },
    [imageFile]);
  const uploadImage = async () => {
    // rules_version = '2';

    // Craft rules based on data in your Firestore database
    // allow write: if firestore.get(
    //    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if 
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    setImageUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagefileUploadprogress(progress.toFixed(0));
      },
      (error) => {
        
        setImageUploadError(`Error while uploading image {file must me less than 2MB}`);

        setImagefileUploadprogress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
        });
      }
    )
  };
  return (
    <div className='max-w-lg mx-auto p-3 w-full '>
      <h1 className='my-7 text-center font-semibold text-3xl '>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input type="file" accept='image/*' hidden onChange={handleImageChange} ref={filePickerRef} />
        <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={() =>
          filePickerRef.current.click()}>
            {imagefileUploadprogress && (
              <CircularProgressbar value={imagefileUploadprogress || 0} text={`${imagefileUploadprogress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position:'absolute',
                  top:0,
                  left:0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imagefileUploadprogress / 100})`,

                }, 
              }}
              />
            )}
          <img src={imageFileUrl || currentUser.profilePicture} alt='user'
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] border-2' ${imagefileUploadprogress && imagefileUploadprogress<100 && 'opacity-60'} `}/>

        </div>
        
          {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} />
        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} />
        <TextInput type='password' id='password' placeholder='************' />
        <Button type='submit' gradientDuoTone='purpleToBlue'>Update</Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span className='hover:underline cursor-pointer'>Delete Account</span>
        <span className='hover:underline cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
