export function extractDateTime(datetimeStr: string): { day: string, month: string, year: string, hour: string } {
    if (!datetimeStr) return { day: "", month: "", year: "", hour: "" };

    const date = new Date(datetimeStr);
    if (isNaN(date.getTime())) return { day: "", month: "", year: "", hour: "" };

    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const month = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(date);
    const hour = date.toTimeString().slice(0, 5);

    return { day, month, year, hour };
}
