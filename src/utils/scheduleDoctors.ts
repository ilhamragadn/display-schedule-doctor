import { useEffect, useState } from "react";
import { UseTokenAPIContext } from "../contexts/TokenAPIContext";
import { baseUrl, username } from "./api";

export interface Schedules {
    id: string;
    dokterId: number;
    dokterName: string;
    dayEn: string;
    beginTime: string;
    endTime: string;
    quota: number;
    dpjp: string;
    photo: string;
}

export const UseListSchedule = () => {
    const { tokenAPI } = UseTokenAPIContext();
    const [allSchedules, setAllSchedules] = useState<Schedules[]>([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            if (!tokenAPI) {
                console.log("Token tidak tersedia.");
                return;
            }

            const headersAPI = new Headers();
            headersAPI.append("x-username", username);
            headersAPI.append("x-token", tokenAPI);

            try {
                const response = await fetch(`${baseUrl}/jpref/daily`, {
                    method: "GET",
                    headers: headersAPI,
                    redirect: "follow",
                });

                const data = await response.json();

                if (data?.response) {
                    setAllSchedules(data.response);
                    console.log("List Jadwal\n", data.response);
                } else {
                    console.error("Gagal ambil data jadwal:", data);
                }
            } catch (error) {
                console.error(error)
            }
        }

        fetchDoctors()
    }, [tokenAPI]);

    return allSchedules;
}