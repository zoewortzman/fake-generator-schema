type ButtonProps = {
    label:string
    disabled?:boolean
};

export default function Button({ 
    label,
    disabled,

}: ButtonProps){
    return (
        <button onClick={()=> {

        }}
            style={{
            paddingTop: 10,
            paddingBottom:10,
            paddingRight:15,
            paddingLeft:15,
            margin:10,
            backgroundColor:"gray",
            color:"white",
            borderRadius:20,
        }}>
            {label}
        </button>
    )
}