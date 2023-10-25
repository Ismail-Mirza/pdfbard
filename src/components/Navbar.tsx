import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'
import { ArrowRight } from 'lucide-react'
import UserAccountNav from './UserAccountNav'
import MobileNav from './MobileNav'
import getUser from '@/lib/getUser'

const Navbar = async() => {
  const user = await getUser()

  return (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-[#14141a] bg-[#14141a] backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 text-white items-center justify-between'>
          <Link
            href='/'
            className='flex z-40 font-semibold'>
            <span>Pdfbard.</span>
          </Link>

          <MobileNav isAuth={!!user} />

          <div className='hidden items-center space-x-4 sm:flex'>
            {!user ? (
              <>
                <Link
                  href='/pricing'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Pricing
                </Link>
                <Link
                  href={"/auth/login/"}
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Sign in
                </Link>
                <Link
                  href={"/auth/login/"}
                  className={buttonVariants({
                    size: 'sm',
                  })}>
                  Get started{' '}
                  <ArrowRight className='ml-1.5 h-5 w-5' />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href='/profile'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Dashboard
                </Link>

                <UserAccountNav
                  name={
                     'Your Account'
                  }
                  email={user.email ?? ''}
                  imageUrl={''}
                />
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
