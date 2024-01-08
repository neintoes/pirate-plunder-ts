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