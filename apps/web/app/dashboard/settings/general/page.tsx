import {redirect} from 'next/navigation'
import { APP_ROUTES } from "@/config/routes"
import { getSession } from "../../actions"
import { GeneralInformation } from '@/components/pages/Dashboard/Settings/General/GeneralInformation'

export default async function Page() {
    const {success, error, data} = await getSession()

    if (!success || error) {
        return redirect(APP_ROUTES.auth.signup)
    }

    return (
        <div className='py-10 max-w-7xl'>
            {data && <GeneralInformation data={data} />}
        </div>
    )
}
