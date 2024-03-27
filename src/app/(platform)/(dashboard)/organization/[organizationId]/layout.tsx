import { auth } from '@clerk/nextjs'
import OrgControl from './_components/OrgControl'
import { Metadata } from 'next'
import { startCase } from 'lodash'

export async function generateMetadata(): Promise<Metadata> {
    const { orgSlug } = auth()

    return {
        title: startCase(orgSlug || `organization`)
    }
}

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <OrgControl />
            {children}
        </div>
    )
}

export default OrganizationIdLayout