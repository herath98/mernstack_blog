import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase/firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import {signOutSuccess ,updateStart, updateSuccess, updateFailure , deleteUserStart, deleteUserSuccess, deleteUserFailure} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashProfile() {
  const { currentUser,error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imagefileUploadprogress, setImagefileUploadprogress] = useState(0);
  const [imageUploadError, setImageUploadError] = useState('');
  const [imageUploadSuccess, setImageUploadSuccess] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModel, setShowModel] = useState(false);

  const [formData, setFormData] = useState({});

  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageUploadSuccess(true);
    setImageUploadError('');
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
        setImageUploadError('Error while uploading image. File must be less than 2MB.');
        setImageFile(null);
        setImageFileUrl(null);
        setImageUploadSuccess(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageUploadSuccess(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserSuccess(null);
    setUpdateUserError(null);

    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes to update');
      return;
    }
    if (imageUploadSuccess) {
      setUpdateUserError('Please wait while image is being uploaded.');
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("Profile Updated Successfully");
      } else {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };
  const handleDelete = async () => {
    setShowModel(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(deleteUserSuccess(data));
        setUpdateUserSuccess("Profile Deleted Successfully");
      } else {
        dispatch(deleteUserFailure(data.message));
        setUpdateUserError(data.message);
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      }
      else{
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='max-w-lg mx-auto p-3 w-full '>
      <h1 className='my-7 text-center font-semibold text-3xl '>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="file" accept='image/*' hidden onChange={handleImageChange} ref={filePickerRef} />
        <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={() => filePickerRef.current.click()}>
          {imagefileUploadprogress > 0 && (
            <CircularProgressbar
              value={imagefileUploadprogress || 0}
              text={`${imagefileUploadprogress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imagefileUploadprogress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] border-2' ${imagefileUploadprogress && imagefileUploadprogress < 100 && 'opacity-60'} `}
          />
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        <TextInput type='text' id='username' name='username' placeholder='username' defaultValue={currentUser.username} onChange={handleChange} />
        <TextInput type='email' id='email' name='email' placeholder='email' defaultValue={currentUser.email} onChange={handleChange} />
        <TextInput type='password' id='password' name='password' placeholder='************' onChange={handleChange} />
        <Button type='submit' gradientDuoTone='purpleToBlue'>Update</Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span onClick={() => setShowModel(true)} className='hover:underline cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='hover:underline cursor-pointer'>Sign Out</span>
      </div>
      {updateUserError && <Alert color="failure" className='mt-5'>{updateUserError}</Alert>}
      {updateUserSuccess && <Alert color="success" className='mt-5'>{updateUserSuccess}</Alert>}
      {error && <Alert color="failure" className='mt-5'>{error}</Alert>}
      <Modal show={showModel} onClose={() => setShowModel(false)}>
        <Modal.Header>Delete Account</Modal.Header>
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>Are you sure you want to delete your account?</h3>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="failure" onClick={handleDelete} >Delete Account</Button>
          <Button color="gray" onClick={() => setShowModel(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
