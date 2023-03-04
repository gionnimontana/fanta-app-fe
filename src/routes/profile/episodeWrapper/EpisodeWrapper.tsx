import { EpisodeInfo } from "../../../components/episodeInfo/EpisodeInfo"
import { useEpisode } from "../../../queries/episodes"

interface Props {
    urls : string[]
}

export const EpisodeWrapper = ({ urls }: Props) => {
    const { data, error, isLoading } = useEpisode(urls)
    if (isLoading) return <div>Loading...</div>
    if (error || !data) return <div>Episode not found</div>
    return <EpisodeInfo episodes={data} />
}