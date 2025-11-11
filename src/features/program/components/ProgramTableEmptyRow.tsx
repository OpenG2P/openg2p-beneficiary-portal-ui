export default function ProgramTableEmptyRow({ index }: { index: number }) {
    return (
        <tr
            className={`${index % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]"} h-[50px]`}
        >
            <td className="px-[30px]">
                <div className="h-5 w-3/4 bg-none"></div>
            </td>
            <td className="px-[30px]">
                <div className="h-5 w-1/2 bg-none"></div>
            </td>
            <td className="py-[16px] flex">
                <div className="h-5 w-[60px] bg-none"></div>
            </td>
        </tr>
    );
}
