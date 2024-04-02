import { Position } from "nipplejs";

class MouseController {
  private static readonly CONTROLLER_NAME: string = "mouse";

  /**
   * 添加偏移
   * @param x x 軸偏移量
   * @param y y 軸偏移量
   */
  public scrollRelative(x: number, y: number): Promise<Response> {
    const url = `${MouseController.CONTROLLER_NAME}/scroll-relative`;
    const body: Position = {
      x: Math.round(x),
      y: Math.round(y),
    };
    if (body.x === 0 && body.y === 0) {
      return new Promise((resolve) => resolve(new Response()));
    }
    return fetch(url, {
      body: JSON.stringify(body),
      method: "POST",
    });
  }

  public clickRight(): Promise<Response> {
    const url = `${MouseController.CONTROLLER_NAME}/click-right`;
    return fetch(url);
  }

  public clickLeft(): Promise<Response> {
    const url = `${MouseController.CONTROLLER_NAME}/click-left`;
    return fetch(url);
  }

  public doubleClickLeft(): Promise<Response> {
    const url = `${MouseController.CONTROLLER_NAME}/double-click-left`;
    return fetch(url);
  }

  /**
   * 添加偏移
   * @param x x 軸偏移量
   * @param y y 軸偏移量
   */
  public moveRelative(x: number, y: number): Promise<Response> {
    const url = `${MouseController.CONTROLLER_NAME}/move-relative`;
    const body: Position = {
      x: Math.round(x),
      y: Math.round(y),
    };
    if (body.x === 0 && body.y === 0) {
      return new Promise((resolve) => resolve(new Response()));
    }
    return fetch(url, {
      body: JSON.stringify(body),
      method: "POST",
    });
  }
}
export const mouseController = new MouseController();
