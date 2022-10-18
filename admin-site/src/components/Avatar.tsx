
export default (props: { image: string, size: number, color?: string }) => {
    return (
        <div>
            <div
                className='m-1 overflow-hidden'
                style={{
                    backgroundColor: props.color ? props.color : '#6BCAFF',
                    width: props.size,
                    height: props.size,
                    borderRadius: props.size
                }}>
                <img
                    style={{
                        width: props.size,
                        height: props.size,
                    }}
                    src={props.image} alt=""
                />
            </div>
        </div>
    )
}