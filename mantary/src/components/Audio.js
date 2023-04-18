import {Howl, Howler} from 'howler';

export function Audio(f, musicEnabled) {

    const {
        registerConsumeCoinCallback,
        registerJumpCallback
    } = f;

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
        const coinSound = new Howl({
            src: [ './audio/coin10.wav']
        });
        const jumpSound = new Howl({
            src: [ './audio/jump3.wav'],
            volume: 0.25
        });
        registerConsumeCoinCallback(() => coinSound.play());
        registerJumpCallback(() => jumpSound.play());
    }

    return { start };
};