interface PeriodProps {
    label: string;
    dateTime: string;
    onChangeDateTime: (value: string) => void;
}

export default function DateTime({
    label,
    dateTime,
    onChangeDateTime,
}: PeriodProps) {
    return (
        <label className="flex flex-col text-grey font-semibold">
            {label}
            <div className="flex flex-row">
                <input
                    className="border-2 border-grey outline-0 py-1 px-2 rounded-8 w-full"
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => onChangeDateTime(e.target.value)}
                />
            </div>
        </label>
    );
}
