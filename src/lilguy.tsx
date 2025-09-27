/// <reference types="chrome"/>

import mon from './assets/creature.gif';
import dead from './assets/dead.gif';
import egg from './assets/egg.gif';
    
type LilGuyProps = {
    health: number;
    creatureState: 'ready' | 'egg' | 'alive' | 'dead';
    /** Called when the user requests to lower health. Optional for display-only usage. */
    onLowerHealth?: (amount?: number) => void;
};

function LilGuy({ onLowerHealth, creatureState }: LilGuyProps) {
    const currentImage = creatureState === 'dead' ? dead : creatureState === 'alive' ? mon : egg;

    function handleLower() {
        if (onLowerHealth) onLowerHealth(100);
    }

    return (
        <div>
            <img src={currentImage} alt="Lil Guy" />

            <button onClick={handleLower} disabled={creatureState === 'dead'} aria-label="Lower health">
                Lower health
            </button>
        </div>
    );
}

export default LilGuy;