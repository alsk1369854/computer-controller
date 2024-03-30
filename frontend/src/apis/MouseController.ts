class MouseController {
  // public moveTo(x: number, y: number) {}
  // public getCurrentPosition() {}
  public rightClick(): void {
    console.log("right click");
  }
  public leftClick(): void {
    console.log("left click");
  }

  /**
   * 添加偏移
   * @param x x 軸偏移量
   * @param y y 軸偏移量
   */
  public addOffset(x: number, y: number): void {
    console.log("add offset :", x, y);
  }
}
export const mouseController = new MouseController();
