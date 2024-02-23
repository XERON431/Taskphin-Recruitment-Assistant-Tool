import React, {  useEffect, useState } from 'react'
import Link from 'next/link'

const CreatorNav = () => {

  const [current, setCurrent] = useState("");

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);

  }, [process.browser && window.location.pathname]);
  return (
    <div className='nav flex-column nav-pills'>
         <Link href="/creator">
              
                <p className={`nav-link ${current == "/creator" && "active" }`}>Dashboard</p>
              
            </Link>
            <Link href="/creator/image/create">
              
              <p className={`nav-link ${current == "/creator/image/create" && "active" }`}>Add Candidate</p>
            
          </Link>
    </div>
  )
}

export default CreatorNav;
