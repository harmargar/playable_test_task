import { gameConfig } from '../configs/game-config';

export const goToCtaGuard = (count: number): boolean => {
    return count === gameConfig.margeCount;
};
