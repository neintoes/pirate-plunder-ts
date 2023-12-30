namespace SpriteKind {
    export const Treasure = SpriteKind.create();
    export const Hitbox = SpriteKind.create();
    export const EnemyProjectile = SpriteKind.create();
}

class GameManager {
    private playerSprite: PlayerSprite;
    private fortManager: FortManager;
    private overlapManager: OverlapManager;
    // GH1
    private treasureCollected: number = 0;
    private treasureSpawner: TreasureSpawner;
    // end GH1

    constructor() {
        this.initialisePlayer();
        this.setupLevel(tilemap`level`);
        this.fortManager = new FortManager(this.playerSprite);
        this.overlapManager = new OverlapManager(this);
        this.onUpdates();
        this.onUpdateIntervals();
        // GH1
        this.treasureSpawner =  new TreasureSpawner();
        // end GH1
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
            this.fortManager.fortFire();
        })
    }

    private onUpdateIntervals(): void {
        game.onUpdateInterval(2000, () => {
            this.fortManager.fortSpawning();
            this.treasureSpawner.treasureSpawning();
        });
    }
}