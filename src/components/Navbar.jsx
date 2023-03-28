import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-1 z-[100000000000000000000000000000000000000] fixed top-0  ${
        scrolled ? "bg-slate-100/10 backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <div className=' w-full flex justify-between items-center max-w-7xl mx-auto'>
      <div className="z-[1000000] bg-slate-900/50   rounded-lg">
        <Link
          to='/'
          className=' bg-slate-900/50 scale-75 backdrop-blur-lg rounded-lg flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt='logo' className='w-20 h-20 object-contain' />
          <p className='text-white text-[18px] font-bold cursor-pointer flex '>
            Richard &nbsp;
     
          </p>
        </Link>
      </div>
      <div className="z-[1000000] ml bg-slate-900/50 p-1 rounded-lg">
        <ul className=' bg-slate-900/50 scale-75 p-2 backdrop-blur-lg list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        <div className='sm:hidden flex z-[100000000000000000000000000000000000000] flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] z-[100000000000000000000000000000000000000] h-[28px] object-contain'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-indigo-700/30  backdrop-blur-sm absolute top-20 right-0 mx-4 my-2 z-[100000000000000000000000000000000000000] min-w-[140px] rounded-xl`}
          >
            <ul className='list-none flex justify-end  items-start flex-1 z-[100000000000000000000000000000000000000] flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer z-[100000000000000000000000000000000000000]  text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
