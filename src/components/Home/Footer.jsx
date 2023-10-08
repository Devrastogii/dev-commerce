import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { app } from "../../firebase";

const Footer = () => {
  const date = new Date().getFullYear();

  const [input, change] = useState("");
  const [bool, setBool] = useState(false);
  const [err, seterr] = useState("");

  const [checkLoggedInUser, setLoggedInUser] = useState(null);
  const auth = getAuth(app)

  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser(user);
      } else {
        setLoggedInUser(null);
      }
    });
  }, []);

  function track(e) {
    change(e.target.value);
  }

  function subscribe() {
    if (input === "" || input.indexOf("@") < 0 || input.indexOf(".") < 3) {
      seterr("** Enter your email");
      return false;
    } else {
      setBool(true);
      seterr("");
    }
  }

  const scrollToTop = () => {
    function scrollTop(e) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    const buttonElement = document.getElementById("footer-scroll-btn");
    buttonElement.addEventListener("click", scrollTop);

    return buttonElement.removeEventListener("click", scrollToTop); // After a click this event will be removed and so by clicking anywhere on the page, it will not take me to top
  };

  return (
    <>
      <footer class="text-gray-400 bg-zinc-800 body-font">
        <div class="container px-5 py-12 mx-auto">
          <div class="flex flex-wrap md:text-left text-center order-first">
            <div class="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 class="title-font font-medium text-white tracking-widest text-xl mb-3">
                Get to Know Us
              </h2>
              <nav class="list-none mb-10">
                <li>
                  <a class="text-gray-400 hover:text-white cursor-pointer hover:underline">
                    About Us
                  </a>{" "}
                  <br />
                </li>
                <li>
                  <Link
                    to={"/wishlist"}
                    class="text-gray-400 hover:text-white cursor-pointer hover:underline"
                  >
                    Wishlist
                  </Link>
                </li>
                <li>
                  <a class="text-gray-400 hover:text-white cursor-pointer hover:underline">
                    Press Releases
                  </a>
                </li>
              </nav>
            </div>
            <div class="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 class="title-font font-medium text-white tracking-widest text-xl mb-3">
                Connect with Us
              </h2>
              <nav class="list-none mb-10">
                <li>
                  <a class="text-gray-400 hover:text-white cursor-pointer hover:underline">
                    Facebook
                  </a>
                </li>
                <li>
                  <a class="text-gray-400 hover:text-white cursor-pointer hover:underline">
                    Twitter
                  </a>
                </li>
                <li>
                  <a class="text-gray-400 hover:text-white cursor-pointer hover:underline">
                    Instagram
                  </a>
                </li>
                <li>
                  <a class="text-gray-400 hover:text-white cursor-pointer hover:underline">
                    YouTube
                  </a>
                </li>
              </nav>
            </div>
            <div class="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 class="title-font font-medium text-white tracking-widest text-xl mb-3">
                Let Us Help You
              </h2>
              <nav class="list-none mb-10">
                <li>
                  <button>
                    {" "}
                    <button
                      onClick={() =>
                        navigate("/profile", {
                          state: { email: checkLoggedInUser.email },
                        })
                      }
                      class="text-gray-400 hover:text-white hover:underline cursor-pointer "
                    >
                      Your Account
                    </button>
                  </button>
                </li>
                <li>
                  <a class="text-gray-400 hover:text-white hover:underline cursor-pointer ">
                    Returns Centre
                  </a>
                </li>
                <li>
                  <a class="text-gray-400 hover:text-white hover:underline cursor-pointer ">
                    App Download
                  </a>
                </li>
                <li>
                  <a class="text-gray-400 hover:text-white hover:underline cursor-pointer ">
                    Help Centre
                  </a>
                </li>
              </nav>
            </div>
            <div class="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 class="title-font font-medium text-white tracking-widest text-m mb-3">
                Newsletter
              </h2>
              <div class="flex xl:flex-nowrap md:flex-nowrap lg:flex-wrap flex-wrap justify-center items-end md:justify-start">
                <div class="relative w-40 sm:w-auto xl:mr-4 lg:mr-0 sm:mr-4 mr-2">
                  <label
                    for="footer-field"
                    class="leading-7 text-sm text-gray-400"
                  ></label>
                  <input
                    type="text"
                    id="footer-field"
                    name="footer-field"
                    class="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:bg-transparent focus:ring-2 focus:ring-red-900 focus:border-red-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="Enter you email.."
                    value={input}
                    readOnly={bool}
                    onChange={track}
                    autoComplete="off"
                  />
                </div>

                {bool ? (
                  <button
                    class={`lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white ${
                      bool ? "cursor-not-allowed" : "cursor-pointer"
                    } bg-emerald-500 border-0 py-2 px-6 focus:outline-none hover:bg-emerald-700 rounded`}
                    onClick={subscribe}
                    disabled={bool}
                  >
                    Subscribed <i class="bi bi-check-lg ml-1"></i>
                  </button>
                ) : (
                  <button
                    class="lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                    onClick={subscribe}
                  >
                    Subscribe
                  </button>
                )}
              </div>
              <p class="text-red-500 text-sm mt-2 md:text-left text-center">
                {err}
              </p>
              <p class="text-gray-500 text-sm mt-2 md:text-left text-center">
                By subscribing, you will
                <br class="lg:block hidden" />
                receive notifications of latest products
              </p>
            </div>
          </div>
        </div>
        <div class="bg-zinc-900 bg-opacity-75">
          <div class="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
            <a class="flex title-font font-medium items-center md:justify-start justify-center text-white">
              <button onClick={scrollToTop} id="footer-scroll-btn">
                <span class="ml-3 text-xl">Dev-Commerce</span>
              </button>
            </a>
            <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
              <p class="text-sm text-gray-400 sm:ml-6 sm:mt-0 mt-4">
                © {date} Dev Rastogi
              </p>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
