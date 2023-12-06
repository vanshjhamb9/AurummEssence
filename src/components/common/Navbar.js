import React, { useEffect, useState, useRef } from "react";
import { AiOutlineClose, AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate,useNavigate, matchPath, useLocation, useParams } from "react-router-dom";


import logo from "../../assets/Logo/1.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiConnector";
import { ProductEndpoints, categories, subCategories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constrants";
import ProfileDropdown from "../core/Auth/ProfileDropDown";
import useOnClickOutside from "../../hooks/useOnClickOutside"; 
import searchBar from "./searchBar";
import { FaSearch } from "react-icons/fa";
import { logout } from "../../services/operations/authAPI";
import { VscSignOut } from "react-icons/vsc";

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}


function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const navMenuRef = useRef(null);
  const dispatch = useDispatch();
  const [catalogOpen, setCatalogOpen] = useState(false)
  const path = useParams()

  const [subLinks, setSubLinks] = useState([]);
  const [subSubLinks, setSubSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNavbarMap, setShowNavbarMap] = useState(false);
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const [showDropdown, setShowDropdown] = useState(false);
  const [categoryId , setCategoryId] = useState([]);
  const [input, setInput] = useState("");
  const [subCategoryId, setSubCategoryId] = useState([]);
  const [product, setProduct] = useState("");
  const [productListVisible, setProductListVisible] = useState(false);

  const navigate = useNavigate();

  useOnClickOutside(ref, () => setOpen(false))
  useOnClickOutside(ref, () => {
    // Hide the product list when clicking outside the search bar
    setProductListVisible(false);
  });


  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);

      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setCategoryId(res.data.data._id);
        setSubLinks(res.data.data);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }

      setLoading(false);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Fetch subSubLinks when subLinks change
    const fetchSubCategoryDetails = async (subCategoryId) => {
      setLoading(true);

      try {
        const bodyData = {
          subCategoryId: subCategoryId,
        };
        const res = await apiConnector("POST", ProductEndpoints.PRODUCT_SUBCATEGORIES_API, bodyData);
        setSubSubLinks(res.data.data.selectedCategory);
      } catch (error) {
        console.log("Could not fetch details of SubCategories.", error);
      }

      setLoading(false);
    };

    // Fetch subLinks details when subLinks change
    if (subLinks.length > 0) {
      subLinks.forEach((subLink) => {
        fetchSubCategoryDetails(subLink._id);
      });
    }
  }, [subLinks]);
  const fetchData = async (value) => {
    setLoading(true);
    try {
      const res = await apiConnector("GET", ProductEndpoints.GET_ALL_PRODUCT_API);
      const productData = res.data.data;

      const results = productData.map((product) => ({
        ...product,
        visible: product.productName.toLowerCase().includes(value.toLowerCase()),
        invisible: !product.productName.toLowerCase().includes(value.toLowerCase()),
      }));

      setProduct(results);
    } catch (error) {
      console.log("Could not fetch Products.", error);
    }
    setLoading(false);
  };
  console.log("Result of Product is " ,product)
  useEffect(() => {
    fetchData(input); // Fetch data when the component mounts and when input changes
  }, [input]);

  const handleSearch = (value) => {
    setInput(value);
    setProductListVisible(true);
    fetchData(value);
  };

  const clearSearch = () => {
    setInput("");
    setProductListVisible(false);
  };
  // Debounced fetchData
  const debouncedFetchData = debounce(fetchData, 300);  // waits 300ms after typing stops

  useEffect(() => {
    fetchData(input); // Fetch data when the component mounts and when input changes
  }, [input]);

  const handleChange = (value) => {
    setInput(value);
    fetchData(value)
    debouncedFetchData(value);
  }


  useEffect(() => {
    const fetchCategoryDetails = async (categoryId) => {
        setLoading(true);
        try {
            const bodyData = {
                categoryId: categoryId
            };
            const res = await apiConnector("POST", ProductEndpoints.PRODUCT_CATEGORIES_API, bodyData);
            // console.log(res);
            setSubLinks(res.data.data.selectedCategory);
        } catch (error) {
            console.log("Could not fetch details of Categories.", error);
        }
        setLoading(false);
    };
    
    if (subLinks.length > 0) {
        subLinks.forEach(subLink => {
            fetchCategoryDetails(subLink._id);
        });
    }
 }, [subLinks]);

 useEffect(() => {
  const fetchSubCategoryDetails = async (subCategoryId) => {
      setLoading(true);
      try {
          const bodyData = {
              subCategoryId : subCategoryId
          };
          const res = await apiConnector("POST", ProductEndpoints.PRODUCT_SUBCATEGORIES_API, bodyData);
          console.log("Under sub categ" ,res);
          setSubSubLinks(res.data.data.selectedCategory);
      } catch (error) {
          console.log("Could not fetch details of Categories.", error);
      }
      setLoading(false);
  };
  
  if (subSubLinks.length > 0) {
      subSubLinks.forEach(subSubLink => {
          fetchSubCategoryDetails(subSubLink._id);
      });
  }
}, [subSubLinks]);

    console.log("Product is -: ", subLinks);
    console.log("Details of Product is -: ", subSubLinks);

  const handleCatalogClick = () => {
    setShowDropdown(!showDropdown);
  };

  const matchRoute = (route) => {
    return matchPath(route, location.pathname);
  };

  console.log("Links are " ,subLinks)
  return (
    <div
      className={`flex h-20 items-center mt-14 justify-center border-b-[1px] border-brown-700  bg-bistre 
       transition-all duration-200 z-50 overflow-visible `}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={42} loading="lazy" />
        </Link>
        {/* Navigation links */}
        {/* Navigation links */}
<nav className="hidden md:block ">

   

  <ul className="flex gap-x-6 text-richblack-25 ">
  {/* search bar */}
  <div className="relative">
      <div className="input relative flex w-[290px] gap-7 items-center text-xl p-7 rounded-xl bg-peach-500 h-10 self-baseline">
        <FaSearch className="w-[40px] text-bistre" />
        <input
          className="w-full bg-peach-500 text-bistre placeholder:text-bistre outline-none"
          placeholder="Type to search ..."
          value={input}
          onChange={(e) => {
            handleChange(e.target.value);
            setProductListVisible(true);
          }}
        />
        {input && (
          <AiOutlineClose onClick={() => setInput('')} className="cursor-pointer" />
        )}
      </div>
      {productListVisible && (
        <div className="absolute left-[50%] top-[50%] border-2 border-peach-300  z-[1000] flex w-[300px] translate-x-[-50%] flex-col rounded-lg bg-bistre text-peach-600 transition-all duration-300 translate-y-[1.65em] p-4 lg:w-[400px] mx-auto text-center " ref={ref}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <p>Results found: {product.filter(item => item.visible).length}</p>
              <ul className="">
                {product.map((item, index) => (
                  <li onClick={() => {
                  navigate(
                    `/products/${item._id}`
                  )
                  console.log(item._id)
                }} key={index} className={`{${productListVisible && item.visible ? 'visible' : 'invisible'} cursor-pointer hover:text-pure-greys-300 }`}>
                    {item.productName}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  
    {NavbarLinks.map((link, index) => (
      <li className="mt-4 " key={index}>
        {link.title === "Shop by Concern" ? (
          <>
            <div
              className={`group relative flex cursor-pointer items-center gap-1 ${
                matchRoute("/catalog/:catalogName")
                  ? "text-yellow-25"
                  : "text-richblack-25"
              }`}
            >
              <p>{link.title}</p>
              <BsChevronDown />
              <div className={`invisible absolute left-[50%] top-[50%] border-2 border-peach-300  z-[1000] flex w-[800px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-bistre text-peach-600  opacity-0 transition-all duration-300  group-hover:visible group-hover:translate-y-[1.65em] p-4 group-hover:opacity-100 lg:w-[900px] mx-auto text-center`}>
                <div className={`absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-bistre  border-t-2 border-l-2 border-peach-300`}></div>
                {loading ? (
                  <p className="text-center">Loading...</p>
                ) : subLinks.length ? (
                  <>
                    {subLinks
                      ?.filter(
                        (subLink) => subLink?.subCategory?.length > 0
                      )
                      ?.map((subLink, i) => (
                        <div key={i}>
                          <Link
                            to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                            className="rounded-lg bg-transparent py-4 pl-4 hover:text-yellow-5"
                            onClick={() => setOpen(false)}
                          >
                            <p>{subLink.name}</p>
                            <ul>
                              <li>{}</li>
                            </ul>
                            {/* Render subcategories for the current category */}
                            {subSubLinks.length > 0 && subSubLinks[i]?.selectedCategory._id === subLink._id && (
                              <ul>
                                {subSubLinks[i]?.selectedCategory.subCategory.map((subSubLink, j) => (
                                  <li key={j}>
                                    <Link to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}>
                                      {subSubLink.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </Link>
                        </div>
                      ))}
                  </>
                ) : (
                  <p className="text-center">No Products Found</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <Link to={link?.path}>
            <p
              className={`${
                matchRoute(link?.path)
                  ? "text-yellow-25"
                  : "text-richblack-25"
              }`}
            >
              {link.title}
            </p>
          </Link>
        )}
      </li>
    ))}
  </ul>
</nav>

        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.ADMIN && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className={`rounded-[8px] border bg-peach-300 text-bistre border-peach-50  px-[12px] py-[8px]`}>
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className={`rounded-[8px] border bg-peach-300 text-bistre border-peach-50 px-[12px] py-[8px]`}>
                Sign up
              </button>
            </Link>
          )}
          {token !== null && (
          <div className="flex space-x-2 h-10   ">
          <ProfileDropdown  />
          <div
            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
            }}
            className="flex w-full items-center cursor-pointer gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-bistre hover:text-richblack-25"
          >
          <VscSignOut />
          Logout
          </div>
          </div> )}
        </div>


        <div>
        
      {/* Rest of your code... */}
      <button className="relative md:hidden sm:block xs:block  ">
      <div className="flex items-center gap-x-3">
      <div>
      {
        token !== null && 
          <ProfileDropdown />
      }
      </div>
      <div className="duration-200 transition-transform" onClick={() => setOpen(true)}>
      <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
      </div>
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-2xl border-[2px]  border-richblack-600 bg-richblack-800"
          ref={ref}
        >
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              setOpen(false)
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            Logout
          </div>
          <ul className="flex flex-col gap-x-6 w-[270px] transition-all duration-300 ease-in-out  text-richblack-25 items-start space-y-6 rounded-2xl p-6 mx-auto">
      {NavbarLinks.map((link, index) => (
        <li key={index}>
          {link.title === "Shop by Concern" ? (
            <div
              className={`group relative flex flex-col cursor-pointer w-full text-2xl items-center gap-1 border-b-[1px] border-richblack-25 p-4 ${
                matchRoute("/catalog/:catalogName")
                  ? "text-yellow-25"
                  : "text-richblack-25"
              }`}
              ref={navMenuRef}
            >
            <div className="flex gap-x-4 items-center justify-between transition-all duration-200 mr-4 ease-in-out w-full">
              <button onClick={() => setCatalogOpen(!catalogOpen)}>{link.title}</button>
              <BsChevronDown onClick={() => setCatalogOpen(!catalogOpen)} className={`${catalogOpen ? ("rotate-180 "): ("rotate-0")} duration-200 ease-linear transition-all`} />
              </div>
              {catalogOpen && (
                <div className={`dropdown-menu bg-bistre border-2 w-full border-peach-600  p-7 rounded-3xl
              `}>
                  {loading ? (
                    <p className="text-center">Loading...</p>
                  ) : subLinks.length ? (
                    <div >
                      {subLinks
                        ?.filter((subLink) => subLink?.products?.length > 0)
                        ?.map((subLink, i) => (
                          <Link className={`rounded-lg  ${matchRoute("catalog/blockchain" ? "text-richblack-900 "
                  : "text-richblack-25")} `}

                            to={`/catalog/${subLink.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            key={i}
                            onClick={() => setOpen(false)}
                          >
                            <p onClick={() => setCatalogOpen(false)} className={`w-full border-b-[1.5px] border-richblack-500 p-3  ${
                  location.pathname == `/catalog/${subLink.name}`
                    ? "text-yellow-25"
                    : "text-richblack-25"
                }`} >{subLink.name}</p>
                          </Link>
                        ))}
                    </div>
                  ) : (
                    <p className="text-center">No Courses Found</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <Link to={link?.path} onClick={() => setCatalogOpen(false)}>
              <p onClick={() => setOpen(false)}
                className={`border-b-[1px] border-richblack-25 p-2 ${
                  matchRoute(link?.path)
                    ? "text-yellow-25"
                    : "text-richblack-25"
                }`}
              >
                {link.title}
              </p>
              
            </Link>
            
          ) }
        </li>
        ))}
        
          {user && user?.accountType !== ACCOUNT_TYPE.ADMIN && (
            <li>
            <Link to="/dashboard/cart" className="relative">
             <div className={`flex flex-row-reverse items-center gap-2 border-b-[1px] border-richblack-25 p-2 ${
                  location.pathname == "/dashboard/cart"
                    ? "text-yellow-25"
                    : "text-richblack-25"
                } `}>
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" /> Cart </div>
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
            </li>
          )}
          {token === null && (
            <li className="flex gap-x-5  " onClick={() => setOpen(false)}>
            <Link to="/login" >
              <button className={`rounded-[8px] border ${location.pathname !== "/" ? "border-richblack-700 bg-richblack-800 text-richblack-900" : "bg-peach-300 text-bistre border-peach-50 "} px-[12px] py-[8px
              ${
                  location.pathname == "/login"
                    ? "text-yellow-25 border-yellow-25"
                    : "text-richblack-25"
                } `}>
                Log in
              </button>
            </Link>

            <Link to="/signup">
              <button className={`rounded-[8px]border ${location.pathname !== "/" ? "border-richblack-700 bg-richblack-800 text-richblack-900" : "bg-peach-300 text-bistre border-peach-50 "} px-[12px] py-[8px]
              ${
                  location.pathname == "/signup"
                    ? "text-yellow-25 border-yellow-25"
                    : "text-richblack-25"
                } `}>
                Sign up
              </button>
            </Link>
            </li>) }
        
        

      
    
      
    </ul>

        </div>
      )}
    </button>
      {/* {showNavbarMap && <NavMenu/>} */}
    </div>
    </div>
    </div>
   
  )
}

export default Navbar