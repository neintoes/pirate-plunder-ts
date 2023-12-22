namespace SpriteKind {
    export const Treasure = SpriteKind.create();
    export const Hitbox = SpriteKind.create();
    export const EnemyProjectile = SpriteKind.create();
}

class GameManager {
    private playerSprite: PlayerSprite;
    private fortManager: FortManager;
    // private overlapManager: OverlapManager;

    constructor() {
        this.initialisePlayer();
        this.setupLevel(tilemap`level`);
        this.fortManager = new FortManager(this.playerSprite);
        // this.overlapManager = new OverlapManager(this.playerSprite);
        this.onUpdates();
        this.onUpdateIntervals();
    }

    private initialisePlayer(): void {
        info.setScore(0);
        info.setLife(3);
        this.playerSprite = new PlayerSprite();
        scene.cameraFollowSprite(this.playerSprite);
    }

    private setupLevel(level: tiles.TileMapData): void {
        tiles.setCurrentTilemap(level);
        
    }

    private onUpdates(): void {
        game.onUpdate(function (): void {
            this.playerSprite.shipMotion();
        })
    }

    private onUpdateIntervals(): void {
        return
    }
}