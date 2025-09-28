function Failed({ startOver }: { startOver: () => void } ) {
    return (
        <>
            <p>Oh no! Your creature has run out of health and passed away.</p>
            <button className="restart-button" onClick={startOver}>
                    Restart
            </button>
        </>
    );
}

export default Failed;