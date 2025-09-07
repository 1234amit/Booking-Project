"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const CustomLink = ({href, children}) => {
    const pathname = usePathname();
    console.log(pathname);
    const active = pathname === href;

  return (
    <div>
        <Link className={active?"text-blue-500":""} href={href}>{children}</Link>
    </div>
  )
}

export default CustomLink