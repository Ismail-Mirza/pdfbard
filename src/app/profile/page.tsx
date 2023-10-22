import Dashboard from '@/components/Dashboard'
import getUser from '@/lib/getUser';
import { getUserSubscriptionPlan } from '@/lib/stripe';
import { redirect } from 'next/navigation';


const Page = async () => {
    const user = await getUser();
    console.log(user)
    if (!user || !user.id) redirect('/auth/login?origin=profile')

    const subscriptionPlan = await getUserSubscriptionPlan()
    return (
    <>
      <Dashboard subscriptionPlan={subscriptionPlan} />
    </>
  )
}

export default Page
