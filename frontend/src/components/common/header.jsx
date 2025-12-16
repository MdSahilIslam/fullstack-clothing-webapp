import { useEffect, useRef } from 'react';
import Navbar from '../layout/navBar'
import Topbar from '../layout/topbar'

function Header() {
    const head1 = useRef()
    let lastScroll = 0;
    

    useEffect(() => {
            window.addEventListener("scroll",() => {
        let currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            head1.current.classList.remove("scroll-up")
        }

        if (currentScroll> lastScroll && !head1.current.classList.contains("scroll-down")) {
            head1.current.classList.remove("scroll-up");
            head1.current.classList.add("scroll-down")
        };

        if (currentScroll < lastScroll && head1.current.classList.contains("scroll-down")) {
            head1.current.classList.add("scroll-up");
            head1.current.classList.remove("scroll-down")
        };
        lastScroll = currentScroll
    })

    },[head1])


    
    return (
        <>
        <div className='abcd'>
        <div ref={head1} className='header-cosmos border-b bg-white border-gray-200 min-w-full '>
            <Topbar></Topbar>
            <Navbar/>
        </div>
        <div className="h-27 max-w-1"></div>
        </div>
        </>
    )
}

export default Header