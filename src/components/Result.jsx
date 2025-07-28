export default function Result({isGame, isRed, isDraw}) {
    
    return (
        !isGame && <div className="results">
            <div className="result-text">
                {!isDraw ? (
                    <>                        
                        {!isRed ? (
                            <p className="red">Red</p>
                            ) : (
                            <p className="blue">Blue</p>
                        )}
                        <p>has won</p>
                    </>
                ) : (
                    <p>Draw</p>
                )}
            </div>
        </div>
    );
}