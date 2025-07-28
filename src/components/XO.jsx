export default function XO({isRed}) {
    return (
        <div className="xo-container">
            {isRed ? (
                <p className="red">X</p>
            ) : (
                <p className="blue">O</p>
            )}
        </div>
    )
}