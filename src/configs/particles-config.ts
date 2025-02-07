import { Texture } from 'pixi.js';

export const getCoinParticleConfig = (texture: Texture) => {

    return {
        lifetime: {
            min: 2,
            max: 2
        },
        frequency: 0.01,
        emitterLifetime: 1.9,
        maxParticles: 15,
        addAtBack: false,
        autoUpdate: true,
        pos: {
            x: 0,
            y: 0
        },
        behaviors: [
            {
                type: 'alpha',
                config: {
                    alpha: {
                        list: [
                            {
                                time: 0,
                                value: 1
                            },
                            {
                                time: 0.7,
                                value: 1
                            },
                            {
                                time: 1,
                                value: 0.001
                            }
                        ]
                    }
                }
            },
            {
                type: 'moveSpeedStatic',
                config: {
                    min: 100,
                    max: 100
                }
            },
            {
                type: "moveAcceleration",
                config: {
                    accel: {
                        x: 0,
                        y: 1000
                    },
                    minStart: 300,
                    maxStart: 300,
                    rotate: false
                }
            },
            {
                type: "scale",
                config: {
                    scale: {
                        list: [
                            {
                                time: 0,
                                value: 0.5
                            },
                            {
                                time: 0.05,
                                value: 1
                            },
                            {
                                time: 1,
                                value: 0
                            }
                        ]
                    },
                    // minMult: 1
                }
            },
            {
                type: "rotationStatic",
                config: {
                    min: 190,
                    max: 350
                }
            },
            { type: 'textureSingle', config: { texture } },
            {
                type: 'spawnShape',
                config: {
                    type: 'torus',
                    data: {
                        x: 0,
                        y: 0,
                        radius: 10,
                        innerRadius: 0,
                        affectRotation: false
                    }
                }
            }
        ],
    }
}
