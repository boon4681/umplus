import Avatar from "./Avatar"

export default (props: {
    rank: {
        rank: number,
        profile: string,
        id: number,
        total: number
    }
}) => {
    const { profile, rank, id, total } = props.rank
    return (
        <div className="w-full flex items-center space-x-2 px-4 hover:bg-[#F1F3F4] cursor-pointer">
            <div className="min-w-[16px]">
                {rank}.
            </div>
            <Avatar size={40} image={profile}></Avatar>
            <div>
                {id}
            </div>
            <div className="text-green-600 w-full text-right">
                {total}
            </div>
        </div>
    )
}