
import { OrganizationList } from "@clerk/nextjs"

const OrganizationPage = () => {
    return (
        <OrganizationList hidePersonal afterSelectOrganizationUrl="/organization/:id" afterCreateOrganizationUrl="/organization/:id"/>
    )
}

export default OrganizationPage