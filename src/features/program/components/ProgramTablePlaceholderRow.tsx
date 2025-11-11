export default function ProgramTablePlaceholderRow({ index }: { index: number }) {
    return (
        <tr
            className={`${index % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]"} animate-pulse h-[50px]`}
        >
            <td className="px-[30px]">
                <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
            </td>
            <td className="px-[30px]">
                <div className="h-5 w-1/2 bg-gray-300 rounded"></div>
            </td>
            <td className="py-[16px] flex gap-2">
                <div className="h-5 w-[60px] bg-gray-300 rounded-full"></div>
            </td>
        </tr>
    );
}
