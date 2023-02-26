import { useEffect, useState } from 'react';
import { CloseCircleSharp, LocateSharp, MenuSharp, MoonSharp, PersonCircleSharp, SunnySharp } from 'react-ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { setIsScreenOnMobile } from '../../redux/features/windowInfo';
import { RootState } from '../../redux/store';

const Nav = () => {
  const [theme, setTheme] = useState<string>(localStorage.theme || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches));

  const { loggedInUserJson } = useSelector((state: RootState) => state.loggedInUserStore)

  const dispatch = useDispatch()

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.theme = theme;
  }, [theme]);

  const handleThemeChange = () => { 
    setTheme(theme === "dark" ? "light" : "dark");
  }

  let Links =[
    { name:"HOME", link:"/"},
    // { name: "ABOUT", link: "/about" },
  ];

  if (loggedInUserJson == null) {
    for (let i = 0; i < Links.length; i++) { 
      if ( Links[i].name === "PREDICTION" || Links[i].name === "STATISTICS") { 
          Links.splice(i, 1)
      }
    }
    Links.push(
      { name: "LOGIN", link: "/login" },
      { name: "REGISTER", link: "/register" }
    )
  } else {
    for (let i = 0; i < Links.length; i++) { 
      if ( Links[i].name === "LOGIN" || Links[i].name === "REGISTER") { 
          Links.splice(i, 1)
      }
    }
    Links.push(
      { name: "PREDICT", link: "/predict" },
      { name: "STATS", link: "/stats" },
      { name: "LOGOUT", link: "/logout" },
      { name: "PROFILE", link: "/profile" },
    )
  }

  let [open, setOpen] = useState(false);

  const toggleMenu = () => {
    if (window.innerWidth <= 767) {
      setOpen(!open)
    }
  }

  const checkSizingIssue = () => {
    if (window.innerWidth > 767) {
      dispatch(setIsScreenOnMobile('medium'))
      if (window.innerWidth > 1080) {
        dispatch(setIsScreenOnMobile('large'))
      }
      if (open) {
        setOpen(false)
      }
    } else {
      dispatch(setIsScreenOnMobile('small'))
    }
  }

  window.onresize = checkSizingIssue


  return (
    <div className='shadow-md w-full fixed top-0 left-0 z-10'>
      <div className='flex items-center justify-between bg-white py-4 md:px-10 px-7'>
        <div className='font-bold text-xl lg:text-2xl cursor-pointer flex items-center text-gray-800'>
          <Link to="/" className='flex items-center'>
            <span className='text-indigo-600 mr-1 pt-2 relative bottom-1'>
              <LocateSharp
                color={'#4b0082'} 
                title="locate"
              />
            </span>
            <span className='text-[#4b0082]'>
              DDoS Detector
            </span>
          </Link>
        </div>
        <div className='flex'>
          <div className='md:absolute md:right-0 md:top-5 mr-6 cursor-pointer' onClick={handleThemeChange}>
            {
              theme === 'dark' ?
                <MoonSharp
                  color={'#048c7f'} 
                  title="dark-mode"
                />
                :
                <SunnySharp
                  color={'#ffa700'} 
                  rotate 
                  title="light-mode"
                  height='24px'
                  width='24px'
                />
            }
          </div>
          <div onClick={toggleMenu} className='text-3xl cursor-pointer md:hidden'>
            {
              open ?
              <CloseCircleSharp
                color={'#fc3d32'} 
                title="close"
              />
                :
              <MenuSharp
                color={'#000000'} 
                title="menu"
              />
            }
          </div>
        </div>

          <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:mr-8 bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-6 transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-490px]'}`}>
            {
              Links.map((link, i)=>(
                <li key={i} className='md:ml-8 text-sm lg:text-xl md:my-0 my-7'>
                  <Link onClick={toggleMenu} to={link.link} className='text-gray-800 hover:text-gray-400 duration-500'>
                    {
                      link.name === 'PROFILE' ? 
                        open ? 
                          <span className='inline-flex align-center w-fit'>
                            <PersonCircleSharp
                              color={'#A459D1'} 
                              title="menu"
                            />
                            <span className='ml-2 text-orange-400 hover:text-purple-400 duration-500'>
                              {loggedInUserJson.username}
                            </span>
                          </span>
                        :
                          <PersonCircleSharp
                            color={'#A459D1'} 
                            title="menu"
                            height='28px'
                            width='28px'
                          />
                      :
                        link.name
                    }
                  </Link>
                </li>
              ))
            }
          </ul>

        
      </div>
    </div>
  )
}

export default Nav