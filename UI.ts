// GH1
class TreasureCounter extends TextSprite {
    private gameManager: GameManager;

    constructor(gameManager: GameManager) {
        super(gameManager.playerSprite.treasureOnboard.toString(), 3, 0, 8, 0, 0, 0, 0, 0);
        this.gameManager = gameManager;
        this.z = 10;
        this.setFlag(SpriteFlag.RelativeToCamera, true);
    }

    public updateText(): void {
        this.setText(this.gameManager.playerSprite.treasureOnboard.toString());
        this.right = 160;
        this.bottom = 120;
    }
}
// end GH1

// GH2
class MinimapDisplay {
    public minimapOpen: boolean = false;
    private minimapObject: minimap.Minimap;
    private minimapSprite: Sprite;

    constructor() {
        this.minimapObject = minimap.minimap(MinimapScale.Eighth, 2, 15);
        this.minimapSprite = sprites.create(minimap.getImage(this.minimapObject));
        this.minimapSprite.z = 100;
        this.minimapSprite.setFlag(SpriteFlag.RelativeToCamera, true);
        this.minimapSprite.setFlag(SpriteFlag.Invisible, true);
        this.registerDisplayToggleControl();
    }

    private registerDisplayToggleControl(): void {
        controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
            if (this.minimapOpen) {
                this.minimapSprite.setFlag(SpriteFlag.Invisible, true);
                this.minimapOpen = false;
            } else {
                this.minimapSprite.setFlag(SpriteFlag.Invisible, false);
                this.minimapOpen = true;
            }
        });
    }

    public update(): void {
        if (this.minimapOpen) {
            this.minimapObject = minimap.minimap(MinimapScale.Eighth, 2, 15);
            for (let ship of sprites.allOfKind(SpriteKind.Player)) {
                minimap.includeSprite(this.minimapObject, ship, MinimapSpriteScale.Double);
            };
            for (let fort of sprites.allOfKind(SpriteKind.Enemy)) {
                minimap.includeSprite(this.minimapObject, fort, MinimapSpriteScale.Double);
            };
            for (let port of sprites.allOfKind(SpriteKind.Port)) {
                minimap.includeSprite(this.minimapObject, port, MinimapSpriteScale.Double);
            };
            this.minimapSprite.setImage(minimap.getImage(this.minimapObject))
        }
    }
}
// end GH2