namespace SpriteKind {
    export const Treasure = SpriteKind.create();
    export const Hitbox = SpriteKind.create();
    export const EnemyProjectile = SpriteKind.create();
    export const TreasureHitbox = SpriteKind.create();
    // GH1
    export const Port = SpriteKind.create();
    export const PortHitbox = SpriteKind.create();
    // end GH1
}

class GameManager {
    public playerSprite: PlayerSprite;
    // GH1
    public treasureCounter: TreasureCounter;
    // end GH1
    private fortManager: FortManager;
    private overlapManager: OverlapManager;
    private treasureCollected: number = 0;
    private treasureSpawner: TreasureSpawner;
    // GH2
    private minimapDisplay: MinimapDisplay;
    // end GH2

    constructor() {
        this.initialisePlayer();
        this.setupLevel(tilemap`level`);
        this.fortManager = new FortManager(this.playerSprite);
        this.treasureSpawner = new TreasureSpawner(this.playerSprite);
        this.overlapManager = new OverlapManager(this);
        // GH1
        this.treasureCounter = new TreasureCounter(this);
        // end GH1
        // GH2
        this.minimapDisplay = new MinimapDisplay();
        // end GH2
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
        // GH1
        for(let i = 0; i < 3; i++) {
            let tile = tilesAdvanced.getAllWallTiles()._pickRandom();
            new Port(tile);
        }
        // end GH1
    }

    private onUpdates(): void {
        game.onUpdate(function (): void {
            this.playerSprite.shipMotion();
            this.fortManager.fortFire();
            // GH1
            this.treasureCounter.updateText();
            // end GH1
        })
    }

    private onUpdateIntervals(): void {
        game.onUpdateInterval(2000, () => {
            this.fortManager.fortSpawning();
            this.treasureSpawner.treasureSpawning();
        });
        // GH2
        game.onUpdateInterval(100, () => {
            this.minimapDisplay.update();
        });
        // end GH2
    }
}

