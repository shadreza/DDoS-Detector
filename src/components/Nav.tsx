import { useEffect, useState } from 'react';
import { CloseCircleSharp, LocateSharp, MenuSharp, MoonSharp, SunnySharp } from 'react-ionicons';
import { Link } from "react-router-dom";

const Nav = () => {
  const [theme, setTheme] = useState<string>(localStorage.theme || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches));

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
      {name:"HOME",link:"/"},
      {name:"PREDICTION",link:"/predict"},
      {name:"STATISTICS",link:"/stats"},
      {name:"ABOUT",link:"/about"},
      {name:"LOGIN",link:"/login"},
      {name:"REGISTER",link:"/register"},
    ];
  let [open,setOpen]=useState(false);

  return (
    <div className='shadow-md w-full fixed top-0 left-0 z-10'>
      <div className='flex items-center justify-between bg-white py-4 md:px-10 px-7'>
        <div className='font-bold text-2xl cursor-pointer flex items-center text-gray-800'>
          <Link to="/" className='flex items-center'>
            <span className='text-3xl text-indigo-600 mr-1 pt-2 relative bottom-1'>
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
                  // rotate 
                  title="dark-mode"
                />
                :
                <SunnySharp
                  color={'#ffa700'} 
                  rotate 
                  title="light-mode"
                />
            }
          </div>
          <div onClick={() => setOpen(!open)} className='text-3xl cursor-pointer md:hidden'>
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

        <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:mr-8 bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-490px]'}`}>
          {
            Links.map((link)=>(
              <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
                <Link to={link.link} className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</Link>
              </li>
            ))
          }
        </ul>

        
      </div>
    </div>
  )
}

export default Nav