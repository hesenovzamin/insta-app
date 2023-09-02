

function Story(props) {
    return (
        <div className="h-14 w-14 p-[1.5px] border-red-500 border-2 rounded-full object-contain cursor-pointer">
            <img className="rounded-full hover:scale-110 transition transfrom duration-200 ease-out" src={props.img} />
            <p className="text-xs w-14 truncate text-center">{props.username}</p>
        </div>
    )
}

export default Story;