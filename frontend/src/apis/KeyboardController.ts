class KeyboardController {
  public backspaceClick(): void {
    console.log("backspace click");
  }

  public enterClick(): void {
    console.log("enter click");
  }

  public keyboardInput(value: string): void {
    console.log("keyboard input:", value);
  }
}
export const keyboardController = new KeyboardController();
