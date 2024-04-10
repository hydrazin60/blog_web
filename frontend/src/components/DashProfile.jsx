import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, TextInput, Modal } from "flowbite-react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"; // Import Firebase storage functions
import { app } from "../firebase"; // Import initialized Firebase app
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  signoutSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../redux/user/userSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function DashProfile() {
  const [showhidepassword, setshowhidepassword] = useState(true);
  const { currentUser , error , loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef(null);
  const dispatch = useDispatch();
  const [updateUserError, setUpdateUserError] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteUserAlert, setDeleteUserAlert] = useState(null);
  const [signoutAlert, setSignoutAlert] = useState(false); // State for sign-out confirmation

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
    try {
      setImageFileUploadError(null);
      setImageFileUploading(true);
      const storage = getStorage(app); // Initialize Firebase Storage
      const fileName = new Date().getTime() + imageFile.name; // Fix typo in Date object
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageFileUploadError(
            "Could not upload image (File must be less than 2MB)"
          );
          setImageFileUploadProgress(null);
          setImageFile(null);
          setImageFileUrl(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUrl(downloadURL);
            setFormData({ ...formData, profilePicture: downloadURL });
            setImageFileUploading(false);
            setImageFileUploading(false);
          });
        }
      );
    } catch (error) {
      console.error("Error uploading image:", error);
      setImageFileUploadError("Error uploading image");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes anyone");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait for image to upload");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");

        // Display success message for 4 seconds
        setTimeout(() => {
          setUpdateUserSuccess(null);
        }, 4000);
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleSignout = async () => {
    if (!signoutAlert) {
      // If sign-out confirmation is not shown, show it
      setSignoutAlert(true);
      return;
    }
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
    setSignoutAlert(false); // Reset sign-out confirmation state
  };

  const passwordshoworhide = () => {
    setshowhidepassword(!showhidepassword);
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
        setDeleteUserAlert(data.message);
      } else {
        dispatch(deleteUserSuccess(data));
        setDeleteUserAlert("User account deletedddd");
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      setDeleteUserAlert(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Your Profile</h1>
      <form onSubmit={handleSubmit} className="flex  flex-col">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          className="hidden"
        />
        <div
          className=" relative w-32 h-32 cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress !== null && (
            <CircularProgressbar
              value={imageFileUploadProgress}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62 ,152 ,199) , ${
                    imageFileUploadProgress / 100
                  }`,
                },
              }}
            />
          )}
           <img
            src={imageFileUrl || currentUser.profilePicture}
            alt=" _upload _profile picture"
          
            className={`rounded-full w-full h-full object-cover border-8 border-lightgray ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
             
          /> 
          

        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}

        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          className="mb-4"
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          className="mb-4"
          onChange={handleChange}
        />
        <TextInput
          type={showhidepassword ? "text" : "password"}
          id="password"
          placeholder="**************"
          className="mb-4"
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone='purpleToBlue' outline disabled={loading || imageFileUploading}>
          {loading ? 'Loading....'  : ' Update'}
        </Button>

       {
        currentUser.isAdmin && (
           <Link to={'/create-post'} >
           <Button type="button" gradientDuoTone='purpleToPink'
          className="w-full">
            Create Post
          </Button>
           </Link>
        )
      }

      </form>

      <button onClick={passwordshoworhide} style={{ margin: "1rem" }}>
        {" "}
        {showhidepassword ? "Show!" : "Hide!"}{" "}
      </button>

      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer" onClick={() => setShowModal(true)}>
          Delete Account
        </span>
        <span onClick={handleSignout} className="cursor-pointer">
          Sign Out !
        </span>
      </div>

      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}

      {deleteUserAlert && (
        <Alert color="success" className="mt-5">
          {deleteUserAlert}
        </Alert>
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
        className="flex items-center justify-center"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Sign-out confirmation modal */}
      <Modal
        show={signoutAlert}
        onClose={() => setSignoutAlert(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to sign out?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleSignout}>
                Yes, sign out
              </Button>
              <Button color="gray" onClick={() => setSignoutAlert(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Alert, Button, TextInput, Modal } from "flowbite-react";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage"; // Import Firebase storage functions
// import { app } from "../firebase"; // Import initialized Firebase app
// import { CircularProgressbar } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import {
//   updateStart,
//   updateSuccess,
//   updateFailure,
//   signoutSuccess,
//   deleteUserStart,
//   deleteUserSuccess,
//   deleteUserFailure,
// } from "../redux/user/userSlice";
// import { HiOutlineExclamationCircle } from "react-icons/hi";

// export default function DashProfile() {
//   const [showhidepassword, setshowhidepassword] = useState(true);
//   const { currentUser } = useSelector((state) => state.user);
//   const [imageFile, setImageFile] = useState(null);
//   const [imageFileUrl, setImageFileUrl] = useState(null);
//   const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
//   const [imageFileUploadError, setImageFileUploadError] = useState(null);
//   const [formData, setFormData] = useState({});
//   const filePickerRef = useRef(null);
//   const dispatch = useDispatch();
//   const [updateUserError, setUpdateUserError] = useState(null);
//   const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
//   const [imageFileUploading, setImageFileUploading] = useState(false); ///
//   const [showModal, setShowModal] = useState(false);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       setImageFileUrl(URL.createObjectURL(file));
//     }
//   };
//   useEffect(() => {
//     if (imageFile) {
//       uploadImage();
//     }
//   }, [imageFile]);

//   const uploadImage = async () => {
//     try {
//       setImageFileUploadError(null); ///
//       setImageFileUploading(true); ///
//       const storage = getStorage(app); // Initialize Firebase Storage
//       const fileName = new Date().getTime() + imageFile.name; // Fix typo in Date object
//       const storageRef = ref(storage, fileName);
//       const uploadTask = uploadBytesResumable(storageRef, imageFile);

//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           setImageFileUploadProgress(progress.toFixed(0));
//         },
//         (error) => {
//           setImageFileUploadError(
//             "Could not upload image (File must be less than 2MB)"
//           );
//           setImageFileUploadProgress(null);
//           setImageFile(null);
//           setImageFileUrl(null); //
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             setImageFileUrl(downloadURL);
//             setFormData({ ...formData, profilePicture: downloadURL });
//             setImageFileUploading(false); ///
//             setImageFileUploading(false);
//           });
//         }
//       );
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       setImageFileUploadError("Error uploading image");
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUpdateUserError(null);
//     setUpdateUserSuccess(null);
//     if (Object.keys(formData).length === 0) {
//       setUpdateUserError("No changes anyone");

//       return;
//     }
//     if (imageFileUploading) {
//       setUpdateUserError("Please wait for image to upload");
//       return;
//     }
//     try {
//       dispatch(updateStart());
//       const res = await fetch(`/api/user/update/${currentUser._id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         dispatch(updateFailure(data.message));
//         setUpdateUserError(data.message);
//       } else {
//         dispatch(updateSuccess(data));
//         setUpdateUserSuccess("User's profile updated successfully"); ///

//         // Display success message for 4 seconds
//         setTimeout(() => {
//           setUpdateUserSuccess(null);
//         }, 4000);
//       }
//     } catch (error) {
//       dispatch(updateFailure(error.message));
//       setUpdateUserError(error.message);
//     }
//   };
//   /// signout function
//   const handleSignout = async () => {
//     try {
//       const res = await fetch("/api/user/signout", {
//         method: "POST",
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         console.log(data.message);
//       } else {
//         dispatch(signoutSuccess());
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const passwordshoworhide = () => {
//     setshowhidepassword(!showhidepassword);
//   };

//   /// user account delete
//   const handleDeleteUser = async () => {
//     setShowModal(false);
//     try {
//       dispatch(deleteUserStart());
//       const res = await fetch(`/api/user/delete/${currentUser._id}`, {
//         method: "DELETE",
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         dispatch(deleteUserFailure(data.message));
//       } else {
//         dispatch(deleteUserSuccess(data));
//       }
//     } catch (error) {
//       dispatch(deleteUserFailure(error.message));
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-3 w-full">
//       <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
//       <form onSubmit={handleSubmit} className="flex  flex-col">
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           ref={filePickerRef}
//           // style={{ display: "none" }}
//           className="hidden"
//         />
//         <div
//           className=" relative w-32 h-32 cursor-pointer shadow-md overflow-hidden rounded-full"
//           onClick={() => filePickerRef.current.click()}
//         >
//           {imageFileUploadProgress !== null && (
//             <CircularProgressbar
//               value={imageFileUploadProgress}
//               text={`${imageFileUploadProgress}%`}
//               strokeWidth={5}
//               styles={{
//                 root: {
//                   width: "100%",
//                   height: "100%",
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                 },
//                 path: {
//                   stroke: `rgba(62 ,152 ,199) , ${
//                     imageFileUploadProgress / 100
//                   }`,
//                 },
//               }}
//             />
//           )}
//           <img
//             src={imageFileUrl || currentUser.profilePicture}
//             alt="user"
//             className={`rounded-full w-full h-full object-cover border-8 border-lightgray ${
//               imageFileUploadProgress &&
//               imageFileUploadProgress < 100 &&
//               "opacity-60"
//             }`}
//           />
//         </div>
//         {imageFileUploadError && (
//           <Alert color="failure">{imageFileUploadError}</Alert>
//         )}

//         <TextInput
//           type="text"
//           id="username"
//           placeholder="username"
//           defaultValue={currentUser.username}
//           className="mb-4"
//           onChange={handleChange}
//         />
//         <TextInput
//           type="email"
//           id="email"
//           placeholder="email"
//           defaultValue={currentUser.email}
//           className="mb-4"
//           onChange={handleChange}
//         />
//         <TextInput
//           type={showhidepassword ? "text" : "password"}
//           id="password"
//           placeholder="**************"
//           // defaultValue="**************"
//           className="mb-4"
//           onChange={handleChange}
//         />
//         <Button type="submit" gradientDuoTone="purpleToBlue" outline>
//           Update
//         </Button>
//       </form>

//       <button onClick={passwordshoworhide} style={{ margin: "1rem" }}>
//         {" "}
//         {showhidepassword ? "Show!" : "Hide!"}{" "}
//       </button>

//       <div className="text-red-500 flex justify-between mt-5">
//         <span className="cursor-pointer" onClick={() => setShowModal(true)}>
//           Delete Account
//         </span>
//         <span onClick={handleSignout} className="cursor-pointer">
//           Sign Out !
//         </span>
//       </div>

//       {updateUserSuccess && (
//         <Alert color="success" className="mt-5">
//           {updateUserSuccess}
//         </Alert>
//       )}
//       {updateUserError && (
//         <Alert color="failure" className="mt-5">
//           {updateUserError}
//         </Alert>
//       )}

//       <Modal
//         show={showModal}
//         onClose={() => setShowModal(false)}
//         popup
//         size="md"
//       >
//         <Modal.Header />
//         <Modal.Body>
//           <div className="text-center">
//             <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
//             <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
//               Are you sure you want to delete your account?
//             </h3>
//             <div className="flex justify-center gap-4">
//               <Button color="failure" onClick={handleDeleteUser}>
//                 Yes, I'm sure
//               </Button>
//               <Button color="gray" onClick={() => setShowModal(false)}>
//                 No, cancel
//               </Button>
//             </div>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }
