import '../styles/header.style.scss';

import Link from 'next/link';
import Image from 'next/image';

import logo from '@/assets/logo.png';

export default function Header() {
    return (
        <header id='header'>
            <div className="inner">
                <h1 className='logo'>
                    <Link href='/'>
                        <Image src={logo} alt='logo' />
                    </Link>
                </h1>
            </div>
        </header>
    )
}