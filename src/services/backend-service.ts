// TODO: Migrate to zod for validating
interface ViewsReportResponse {
    count: number;
}

export class BackendService {
    async reportAndGetViewsForPage(pageId: string): Promise<number> {
        try {
            const result = await fetch(
                `https://api.kotleni.pp.ua/views/report?pageId=${pageId}`,
                {method: 'POST'},
            );
            console.log(result.body);
            const data = (await result.json()) as ViewsReportResponse;
            return data.count;
        } catch (error) {
            console.error(error);
        }

        return -1;
    }
}
