import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

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
 
  async function userRegistration(e) {
    e.preventDefault();

    const showToastErrorMessage = () => {
      toast.error('Please fill all details correctly !! ', {           
          position: toast.POSITION.TOP_RIGHT
      });
    }
//     try {
      if (
        name === "" ||
        phone === "" ||
        email === "" ||  
        password === "" ||
        cpassword === "" ||    
        password === cpassword ||
        phone.length === 10
      ) {
        showToastErrorMessage()
      }
        
//         // const res = await axios.post("/register", {
//         //   name,
//         //   phone,
//         //   email,
//         //   password,
//         // });

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
        <form onSubmit={userRegistration}>
          <div className="grid grid-cols-2 gap-12">
            <div>
              <label className="block text-gray-400">Name:</label>
              <input
                type="text"
                className="border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {name === "" && (
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}               
              />
              {phone === "" && (
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {email === "" && (
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />             
            </div>
            <div>
              <label className="block text-gray-400">Confirm Password:</label>
              <input
                type="password"
                className="border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8"
                value={cpassword}
                onChange={(e) => setCPassword(e.target.value)}
              />       
            </div>
          </div>

          {password !== cpassword && (
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
