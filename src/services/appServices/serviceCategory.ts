import { callGetApi } from "../network"

export const getServiceCategory = async (url: string) => {
    try {
        const response = await callGetApi(url)
        return response;
    } catch (error) {
        console.log(error)
    }
}