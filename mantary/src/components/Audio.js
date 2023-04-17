import {Howl, Howler} from 'howler';

export function Audio(f, musicEnabled) {

    const {
        registerConsumeCoinCallback
    } = f;

    let coinSound = null;

    function coinConsumed() {
        coinSound.play();
    };

    function start() {
        Howler.mobileAutoEnable = false;
        new Howl({
            src: [
                './audio/juhani_junkala_chiptune_adventures_1_stage_1.ogg',
                './audio/juhani_junkala_chiptune_adventures_1_stage_1.mp3'
            ],
            autoplay: musicEnabled,
            loop: true,
            volume: 0.25,
        });
        coinSound = new Howl({
            src: [ './audio/coin10.wav']
        });
        registerConsumeCoinCallback(coinConsumed);
    }

    return { start };
};