

export function Balance({value}){
    return <div className="flex mt-1 ml-2">
        <div className="text-lg ">
            Your balance
        </div>
        <div className="ml-4 text-lg">
            Rs {value}
        </div>
        
    </div>
}