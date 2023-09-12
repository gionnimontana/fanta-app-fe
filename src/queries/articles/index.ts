import { useQuery } from "react-query";
import { Article } from "types/articles";
import { apiEndpoints } from "../../constants/apiEndpoints";
import { queryCacheTime } from "../../constants/settings";
import { pb } from "../../helpers/pb";

export function useArticle(leagueId: string | undefined, category: 'results', day?: number) {
    return useQuery(`article-${leagueId}-${category}-${day}`, async () => {
        if (!day) return undefined
        const response = pb.collection('articles').getList(1, 40, {
            filter: `(day='${day}' && league='${leagueId}' && category='${category}')`
        });
        const data = await response as any
        const calendar = data
        if (calendar.items && calendar.items.length > 0) return calendar.items[0] as Article
        return undefined
    }, { cacheTime: queryCacheTime, staleTime: queryCacheTime });
}
  