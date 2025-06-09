interface PeriodProps {
    label: string;
    date: string;
    onChangeDate: (value: string) => void;
}

export default function Date({
    label,
    date,
    onChangeDate,
}: PeriodProps) {
    return (
        <label className="flex flex-col text-grey font-semibold">
            {label}
            <div className="flex flex-row">
                <input
                    className="border-2 border-grey outline-0 py-1 px-2 rounded-8 w-full"
                    type="date"
                    value={date}
                    onChange={(e) => onChangeDate(e.target.value)}
                />
            </div>
        </label>
    );
}
