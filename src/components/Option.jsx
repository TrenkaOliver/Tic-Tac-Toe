export default function Option({variable, variableName, updateFunction, isOptions}) {
    return (
        <div className="option-contianer">
            <p>{variableName}:</p> 
            <input
                type="range"
                disabled={!isOptions}
                min={3} 
                max={5} 
                value={variable} 
                step={1} 
                onChange={(e) => updateFunction({ [variableName]: parseInt(e.target.value, 10)})}
            />
            <p>{variable}</p>
        </div>
    );
}