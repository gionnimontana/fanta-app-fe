import { LocationInfo } from "../../../components/locationInfo/LocationInfo"
import { useLocation } from "../../../queries/locations"

interface Props {
    locationUrl : string
}

export const LocationWrapper = ({ locationUrl }: Props) => {
    const { data, error, isLoading } = useLocation(locationUrl)
    if (isLoading) return <div>Loading...</div>
    if (error || !data) return <div>Location not found</div>
    return <LocationInfo location={data} />
}