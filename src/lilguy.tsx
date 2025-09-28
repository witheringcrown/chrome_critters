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
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <img
                src={currentImage}
                alt="Lil Guy"
                style={{ display: 'block', width: '100%', height: 'auto' }}
            />
            {tint && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: tint,
                        // 💡 Use the image as a mask so the tint matches visible pixels only
                        WebkitMaskImage: `url(${currentImage})`,
                        WebkitMaskRepeat: 'no-repeat',
                        WebkitMaskSize: 'contain',
                        maskImage: `url(${currentImage})`,
                        maskRepeat: 'no-repeat',
                        maskSize: 'contain',
                        pointerEvents: 'none',
                    }}
                />
            )}
        </div>
    );
}

export default LilGuy;