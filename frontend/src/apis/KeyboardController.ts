class KeyboardController {
  private static readonly CONTROLLER_NAME = "keyboard";

  public clickBackspace(): Promise<Response> {
    const url = `${KeyboardController.CONTROLLER_NAME}/click-backspace`;
    return fetch(url);
  }

  public clickEnter(): Promise<Response> {
    const url = `${KeyboardController.CONTROLLER_NAME}/click-enter`;
    return fetch(url);
  }

  public input(value: string): Promise<Response> {
    const url = `${KeyboardController.CONTROLLER_NAME}/input?message=${value}`;
    return fetch(url);
  }
}
export const keyboardController = new KeyboardController();
