/// <reference types="chrome"/>

import mon from './assets/creature.gif';
import dead from './assets/dead.gif';
import egg from './assets/egg.gif';
import scrambled from './assets/cracked.png';

type LilGuyProps = {
    imageState : 'mon' | 'dead' | 'egg' | 'scrambled';
};

function LilGuy({ imageState }: LilGuyProps) {
    const currentImage = imageState === 'dead' ? dead : imageState === 'mon' ? mon : imageState === 'scrambled' ? scrambled : egg;

    return (
        <div>
            <img src={currentImage} alt="Lil Guy" />
        </div>
    );
}

export default LilGuy;