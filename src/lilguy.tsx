/// <reference types="chrome"/>

import mon from './assets/creature.gif';
import dead from './assets/dead.gif';
    
type LilGuyProps = {
    health: number;
    /** Called when the user requests to lower health. Optional for display-only usage. */
    onLowerHealth?: (amount?: number) => void;
    setHealth: (health: number) => void;
};

function LilGuy({ health, onLowerHealth }: LilGuyProps) {
    const currentImage = health > 0 ? mon : dead;

    function handleLower() {
        if (onLowerHealth) onLowerHealth(100);
    }

    return (
        <div>
            <img src={currentImage} alt="Lil Guy" />

            <div>Health: {health}</div>
            <button onClick={handleLower} disabled={health <= 0} aria-label="Lower health">
                Lower health
            </button>
        </div>
    );
}

export default LilGuy;