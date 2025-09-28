function Failed({ startOver }: { startOver: () => void } ) {
    return (
        <>
            <p>Oh no! You stopped focusing and your creature has died.</p>
            <button className="restart-button" onClick={startOver}>
                Hatch a New Egg
            </button>
        </>
    );
}

export default Failed;