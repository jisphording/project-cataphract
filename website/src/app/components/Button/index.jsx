export default function Button() 
{
    function handleClick() 
    {
        alert('Button clicked');
        console.log('Button clicked');
    }

    return (
        <button>Click me</button>
    );
}