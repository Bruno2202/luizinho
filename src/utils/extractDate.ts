export function extractDate(dateString: string): { day: string, month: string, year: string } {
    if (!dateString) return { day: "", month: "", year: "" };

    const date = new Date(dateString + "T00:00:00");
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    const month = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(date);

    return { day, month, year };
}
