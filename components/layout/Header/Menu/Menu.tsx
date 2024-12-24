import React from 'react'
import Link from 'next/link'

const Menu = () => {
    return (
        <div className='flex space-x-4'>
            {/* Base */}

            <Link className="group relative inline-block focus:outline-none focus:ring" href="/">
                <span
                    className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                ></span>

                <span
                    className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75"
                >
                    Home
                </span>
            </Link>

            {/* Hover */}

            <Link className="group relative inline-block focus:outline-none focus:ring" href="/">
                <span
                    className="absolute inset-0 translate-x-0 translate-y-0 bg-yellow-300 transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"
                ></span>

                <span
                    className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest"
                >
                    History
                </span>
            </Link>
        </div>
    )
}

export default Menu