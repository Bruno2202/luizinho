interface PeriodProps {
    label: string;
    startDate: string;
    endDate: string;
    onChangeStart: (value: string) => void;
    onChangeEnd: (value: string) => void;
}

export default function Period({
    label,
    startDate,
    endDate,
    onChangeStart,
    onChangeEnd,
}: PeriodProps) {
    return (
        <label className="flex flex-col text-grey font-semibold">
            {label}
            <div className="flex flex-row">
                <p className="flex items-center justify-center p-2 rounded-l-8 bg-grey h-full text-white">
                    De:
                </p>
                <input
                    className="border-2 border-grey outline-0 py-1 px-2"
                    type="date"
                    value={startDate}
                    onChange={(e) => onChangeStart(e.target.value)}
                />
                <p className="flex items-center justify-center p-2 bg-grey h-full text-white">
                    até:
                </p>
                <input
                    className="border-2 rounded-r-8 border-grey outline-0 py-1 px-2"
                    type="date"
                    value={endDate}
                    onChange={(e) => onChangeEnd(e.target.value)}
                />
            </div>
        </label>
    );
}
