class MouseController {
  // public moveTo(x: number, y: number) {}
  // public getCurrentPosition() {}
  public rightClick(): void {
    console.log("right click");
  }
  public leftClick(): void {
    console.log("left click");
  }
  public moveAmount(xAmount: number, yAmount: number): void {
    console.log("mover amount:", xAmount, yAmount);
  }
}
export const mouseController = new MouseController();
