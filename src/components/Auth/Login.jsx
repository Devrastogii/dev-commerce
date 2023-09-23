import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     async function getData() {
//       const tokenDoc = await axios.get('/login-token');   
//       if(tokenDoc.data === ""){
//         setShow(true);        
//       }

//       else {
//         navigate('/account');   
//       }
//       }          

//     getData();   
//   }, []);

  async function loginform(e) {
    e.preventDefault();

    const showToastErrorMessage = () => {
      toast.error('Please fill all details correctly !! ', {           
          position: toast.POSITION.TOP_RIGHT
      });
    }

    if (email === "" || password === "") {
        showToastErrorMessage()
    }
//       await axios.post("/user-login", { email, password });
//       showDialogBox(false);
//       navigate('/');
//     } else {
//       showDialogBox(true);
//     }
  }  

  return (
    <>

      <div className="flex justify-center font-bold text-2xl mt-10 text-black">
        WELCOME BACK
      </div>

      <div className="flex justify-center mt-2 text-md text-black opacity-60">
        Login to your account and enjoy our free services
      </div>

      <div className="flex justify-center mt-8">
        <form onSubmit={loginform}>
          <label className="block mt-3 text-gray-400">Email Address:</label>
          <input
            type="email"
            className="border border-gray-200 mt-2 w-96 outline-blue-500 pl-2 text-gray-500 rounded-md h-8"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {email === "" && (
            <div className="mt-2 text-sm text-red-500">
              ** Email can't be blank
            </div>
          )}
          <div>
            <label className="block text-gray-400 mt-5">Password:</label>
            <input
              type="password"
              className="border border-gray-200 mt-2 outline-blue-500 pl-2 text-gray-500 rounded-md h-8 w-96"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {password === "" && (
            <div className="mt-2 text-sm text-red-500">
              ** Password can't be blank
            </div>
          )}

          <div className="flex justify-center mt-8">
            <button onClick={loginform} className='font-semibold bg-white border-[1px] border-neutral-800 rounded-xl h-12 flex justify-center items-center text-lg w-60 slide-right hover:text-white hover:border-white'>
              LOGIN
            </button>
          </div>
        </form>
      </div> 

      <ToastContainer theme="dark" />
    </>
  );
};

export default Login;
