import { useQuery } from "react-query";
import { Article } from "types/articles";
import { apiEndpoints } from "../../constants/apiEndpoints";
import { queryCacheTime } from "../../constants/settings";

export function useArticle(category: 'results', day?: number) {
    return useQuery(`article-${category}-${day}`, async () => {
        let endPoint = apiEndpoints.Articles + `?filter=(day=${day})`
        const response = await fetch(endPoint)
        const data = await response.json()
        const calendar = data
        if (calendar.items && calendar.items.length > 0) return calendar.items[0] as Article
        return undefined
    }, { cacheTime: queryCacheTime, staleTime: queryCacheTime });
}
  