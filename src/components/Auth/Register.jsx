import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore"
// import { collection, getDocs } from "firebase/firestore"

const Register = () => {
  // const [name, setName] = useState("");
  // const [phone, setPhone] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [cpassword, setCPassword] = useState("");

  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    cpassword: ""
  })

  // Firestore Collection

  const usersCollection = collection(db, "user-data")

//   const navigate = useNavigate();

// //   useEffect(() => {
// //     async function getData() {
// //       const tokenDoc = await axios.get('/login-token');   
// //       if(tokenDoc.data !== ""){
// //         alert('Already logged in !!!');    
// //         navigate('/account')    
// //       }      
// //       }          

// //     getData();   
// //   }, []);

  let name, value;

  const postData = (e) => {
    name = e.target.name
    value = e.target.value

    setUserData({...userData, [name]:value})
  }

  // const data = await getDocs(usersCollection) - to get all entries
  // setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
 
  async function userRegistration(e) {
    e.preventDefault();

    const {name, phone, email, password, cpassword} = userData

    const showToastErrorMessage = () => {
      toast.error('Please fill all details correctly !! ', {           
          position: toast.POSITION.TOP_RIGHT
      });
    }
//     try {
      // if (
      //   name === "" ||
      //   phone === "" ||
      //   email === "" ||  
      //   password === "" ||
      //   cpassword === "" ||    
      //   password !== cpassword ||
      //   phone.length !== 10
      // ) {
      //   showToastErrorMessage()
      // }
      
              
        // const res = await axios.post("https://dev-ecommerce-11aab-default-rtdb.firebaseio.com/userDataRecord.json", {
        //   name,
        //   phone,
        //   email,
        //   password,
        // });

        await addDoc(usersCollection, {name, phone, email, password})

//         // if(res.data !== "Account already present !! Please login"){
//         //     navigate('/');
//         //     showDialogBox(false);         
//         // }
        
//         // else {
//         //   alert('"Account already present !! Please login')
//         // }
        
//       }

//       else {
//         showDialogBox(true);
//       }
//     } catch (error) {
//       console.log(error);
//       alert("Registration failed");
//     }
  }

  return (
    <>

    <div className="flex justify-center font-bold text-2xl mt-10 text-black">
        CREATE YOUR ACCOUNT
      </div>

      <div className="flex justify-center mt-2 text-md text-black opacity-60">
        Fill your details and get started
      </div>

      <div className="flex justify-center mt-8">
        <form onSubmit={userRegistration} method="POST">
          <div className="grid grid-cols-2 gap-12">
            <div>
              <label className="block text-gray-400">Name:</label>
              <input
                type="text"
                className="border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8"
                value={userData.name}
                onChange={postData}
                name="name"
              />
              {userData.name === "" && (
                <div className="mt-2 text-sm text-red-500">
                  ** Name can't be blank
                </div>
              )}
            </div>
            <div>
              <label className="block text-gray-400">Phone Number:</label>
              <input
                type="number"
                className="border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8"
                value={userData.phone}
                onChange={postData}   
                name="phone"            
              />
              {userData.phone === "" && (
                <div className="mt-2 text-sm text-red-500">
                  ** Phone Number can't be blank
                </div>
              )}
            </div>
          </div>
          <label className="block mt-3 text-gray-400">Email Address:</label>
          <input
            type="email"
            className="border border-gray-200 mt-2 w-full outline-blue-500 pl-2 text-gray-500 rounded-md h-8"
            value={userData.email}
            onChange={postData}
            name="email"
          />
          {userData.email === "" && (
            <div className="mt-2 text-sm text-red-500">
              ** Email can't be blank
            </div>
          )}
          <div className="grid grid-cols-2 gap-12 mt-3">
            <div>
              <label className="block text-gray-400">Password:</label>
              <input
                type="password"
                className="border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8"
                value={userData.password}
                onChange={postData}
                name="password"
              />             
            </div>
            <div>
              <label className="block text-gray-400">Confirm Password:</label>
              <input
                type="password"
                className="border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8"
                value={userData.cpassword}
                onChange={postData}
                name="cpassword"
              />       
            </div>
          </div>

          {userData.password !== userData.cpassword && (
            <div className="mt-2 text-sm text-red-500">
              ** Passwords do not match
            </div>
          )}

          <div className="flex justify-center mt-8">
            <button onClick={userRegistration}                 
              className='font-semibold bg-white border-[1px] border-neutral-800 rounded-xl h-12 flex justify-center items-center text-lg w-60 slide-right hover:text-white hover:border-white'
            >
              REGISTER
            </button>
          </div>
          </form>
        
      </div>         

      <ToastContainer theme="dark" />    
    </>
  );
};

export default Register;
