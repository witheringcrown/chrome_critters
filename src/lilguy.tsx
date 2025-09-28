/// <reference types="chrome"/>

import mon from './assets/creature.gif';
import dead from './assets/dead.gif';
import egg from './assets/egg.gif';
import scrambled from './assets/cracked.png';

type LilGuyProps = {
    imageState : 'mon' | 'dead' | 'egg' | 'scrambled';
    tint?: string;
};

function LilGuy({ imageState, tint }: LilGuyProps) {
    const currentImage = imageState === 'dead' ? dead : imageState === 'mon' ? mon : imageState === 'scrambled' ? scrambled : egg;

    return (
        <div>
            <img src={currentImage} alt="Lil Guy" style={{ filter: `drop-shadow(0 0 5px ${tint})` }} />
        </div>
    );
}

export default LilGuy;