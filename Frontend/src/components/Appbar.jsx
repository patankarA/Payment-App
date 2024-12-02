

export const Appbar = () => {


    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full mr-4 ml-2 font-bold ">
            Payment App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
            <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span class="text-2xl text-white">{"U"}</span>
            </div>  
            </div>
        </div>
    </div>
}