type InputProps = {
    placeholder:string
};

export default function Input({ 
    placeholder,

}: InputProps){
    return (
        <input style={{
            padding:20,
            margin: 10,
        }}
            type="text"
            placeholder={placeholder}>
        </input>
    )
}