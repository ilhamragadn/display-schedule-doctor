// handle day
const today = new Date();

const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]

const date = today.getDate();
const dayName = days[today.getDay()];
const monthName = months[today.getMonth()];
const year = today.getFullYear();

export const formattedToday = `${dayName}, ${date} ${monthName} ${year}`

export const formattedTimes = (times: string) => {
    const today = new Date(times);
    if (!(today)) return "-";

    return today.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
}

export const formattedDate = (date: string) => {
    if (!date) return "";

    const newDate = new Date(date);
    return newDate.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}