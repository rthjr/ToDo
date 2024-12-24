
import Link from 'next/link';
import Image from 'next/image';
import Menu from './Menu/Menu';

const Header = () => {
    return (
        <div className='w-full h-full flex justify-between items-center sticky top-0 right-0 z-50'>
            <div className='text-2xl font-bold'>
                <Link href="/">
                    <Image src="/logo/rthjr.png" alt="website logo" width={300} height={300} />
                </Link>
            </div>

            <Menu />
        </div>
    );
}

export default Header;