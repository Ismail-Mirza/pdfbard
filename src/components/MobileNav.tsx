'use client'

import { ArrowRight, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Hanko } from "@teamhanko/hanko-elements";
const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL;



const MobileNav = ({ isAuth }: { isAuth: boolean }) => {
  const [isOpen, setOpen] = useState<boolean>(false)
  const router = useRouter();


  const toggleOpen = () => setOpen((prev) => !prev)

  const pathname = usePathname()

  useEffect(() => {
    if (isOpen) toggleOpen()
  }, [pathname,isOpen])
  const [hanko, setHanko] = useState<Hanko>();
 
  useEffect(() => {
    import("@teamhanko/hanko-elements").then(({ Hanko }) =>
      setHanko(new Hanko(hankoApi ?? ""))
    );
  }, []);

  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      toggleOpen()
    }
  }
  const logout = async () => {
    try {
      await hanko?.user.logout();
      router.push("/auth/login");
      router.refresh();
      return;
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className='sm:hidden'>
      <Menu
        onClick={toggleOpen}
        className='relative z-50 h-5 w-5 text-zinc-700'
      />

      {isOpen ? (
        <div className='fixed animate-in slide-in-from-top-5 fade-in-20 inset-0 z-0 w-full'>
          <ul className='absolute bg-white border-b border-zinc-200 shadow-xl grid w-full gap-3 px-10 pt-20 pb-8'>
            {!isAuth ? (
              <>
                <li>
                  <Link
                    onClick={() =>
                      closeOnCurrent('/sign-up')
                    }
                    className='flex items-center w-full font-semibold text-green-600'
                    href='/sign-up'>
                    Get started
                    <ArrowRight className='ml-2 h-5 w-5' />
                  </Link>
                </li>
                <li className='my-3 h-px w-full bg-gray-300' />
                <li>
                  <Link
                    onClick={() =>
                      closeOnCurrent('/sign-in')
                    }
                    className='flex items-center w-full font-semibold'
                    href='/sign-in'>
                    Sign in
                  </Link>
                </li>
                <li className='my-3 h-px w-full bg-gray-300' />
                <li>
                  <Link
                    onClick={() =>
                      closeOnCurrent('/pricing')
                    }
                    className='flex items-center w-full font-semibold'
                    href='/pricing'>
                    Pricing
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    onClick={() =>
                      closeOnCurrent('/profile')
                    }
                    className='flex items-center w-full font-semibold'
                    href='/profile'>
                    Dashboard
                  </Link>
                </li>
                <li className='my-3 h-px w-full bg-gray-300' />
                <li>
                  <button
                    onClick={logout}
                    className='flex items-center w-full font-semibold'
                    >
                    Sign out
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default MobileNav
