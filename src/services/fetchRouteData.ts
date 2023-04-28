
interface Props {
    lng_start: number;
    lat_start: number;
    lng_finish: number;
    lat_finish: number;
}


export async function FetchRouteData(props: Props): Promise<any> {
    const { lng_start, lat_start, lng_finish, lat_finish } = props

    try {
        const URL = `https://router.project-osrm.org/route/v1/driving/${lng_start},${lat_start};${lng_finish},${lat_finish}`;

        const response = await fetch(URL);

        if (!response.ok) {
            throw new Error('some error with response of osrm.org ');
        }

        return await response.json()
    } catch (err: any) {
        throw new Error(err.message);
    }
}