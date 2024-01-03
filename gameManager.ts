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
    private playerSprite: PlayerSprite;
    private fortManager: FortManager;
    private overlapManager: OverlapManager;
    private treasureCollected: number = 0;
    private treasureSpawner: TreasureSpawner;
    // GH1
    public treasureOnboard: number = 0;
    public treasureCounter: TreasureCounter;
    // end GH1

    constructor() {
        this.initialisePlayer();
        this.setupLevel(tilemap`level`);
        this.fortManager = new FortManager(this.playerSprite);
        this.treasureSpawner = new TreasureSpawner(this.playerSprite);
        this.overlapManager = new OverlapManager(this);
        this.onUpdates();
        this.onUpdateIntervals();
        // GH1
        this.treasureCounter = new TreasureCounter(this);
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
        // GH1
        for(let i = 0; i < 3; i++) {
            let tile = tilesAdvanced.getAllWallTiles()._pickRandom();
            new Port(tile);
        }
    }

    private onUpdates(): void {
        game.onUpdate(function (): void {
            this.playerSprite.shipMotion();
            this.fortManager.fortFire();
            sprites.allOfKind(SpriteKind.Treasure).forEach((treasure: Treasure) => {
                console.log(treasure._hitbox.width)
            });
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
    }

    // lag issue?
    // private onDestroyedEvents(): void {
    //     sprites.onDestroyed(SpriteKind.Treasure, (treasure: Treasure) => {
    //         treasure.hitbox.destroy();
    //     })
    //     sprites.onDestroyed(SpriteKind.Port, (port: Port) => {
    //         port.hitbox.destroy();
    //     })
    // }
}

