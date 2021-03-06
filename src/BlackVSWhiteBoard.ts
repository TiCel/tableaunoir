import { getCanvas, palette } from './main';
import { CSSStyleModifier } from './CSSStyleModifier';

/**
 * This class implements the switch between whiteboard and blackboard
 */
export class BlackVSWhiteBoard {

    static init(): void {
        document.getElementById("canvasBackground").style.backgroundColor = "black";
        document.getElementById("whiteBoardSwitch").onclick = BlackVSWhiteBoard.switch;
        document.getElementById("blackBoardSwitch").onclick = BlackVSWhiteBoard.switch;
    }


    /**
     * switch between whiteboard and blackboard
     */
    static switch(): void {
        const previousBackgroundColor = document.getElementById("canvasBackground").style.backgroundColor;
        const backgroundColor = previousBackgroundColor == "white" ? "black" : "white";

        document.getElementById(backgroundColor + "BoardSwitch").hidden = true;
        document.getElementById(previousBackgroundColor + "BoardSwitch").hidden = false;


        console.log("previous background color was " + previousBackgroundColor);
        console.log("switch to " + backgroundColor + "board")
        palette.switchBlackAndWhite();
        document.getElementById("canvasBackground").style.backgroundColor = backgroundColor;

        if (backgroundColor == "black") {
            CSSStyleModifier.setRule(".magnetText div", "background-color", "rgba(27, 27, 27, 0.9)");
            CSSStyleModifier.setRule("div.magnetText", "background-color", "rgba(64, 64, 64, 0.9)");
            CSSStyleModifier.setRule(".magnetText div", "color", "white");
        }
        else {
            CSSStyleModifier.setRule(".magnetText div", "background-color", "rgba(247, 247, 247, 0.9)");
            CSSStyleModifier.setRule("div.magnetText", "background-color", "rgba(227, 227, 227, 0.9)");
            CSSStyleModifier.setRule(".magnetText div", "color", "black");
        }

        BlackVSWhiteBoard._invertCanvas();
    }


    /**
     * @dsecription invert the colors of the canvas (black becomes white, white becomes black, red becomes...)
     */
    static _invertCanvas(): void {
        const canvas = getCanvas();
        const context = canvas.getContext('2d');

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            // red
            data[i] = 255 - data[i];
            // green
            data[i + 1] = 255 - data[i + 1];
            // blue
            data[i + 2] = 255 - data[i + 2];
        }

        // overwrite original image
        context.putImageData(imageData, 0, 0);
    }

}


