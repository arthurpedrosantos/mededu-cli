import { Color } from "../colors/color";

export abstract class Log {
  public static info(message: string): void {
    console.log(`${Color.BgYellow}${Color.Reset}`, message);
  }

  public static error(message: string): void {
    console.log(`${Color.BgRed}${Color.Reset}`, message);
  }

  public static success(message: string): void {
    console.log(`${Color.BgGreen}${Color.Reset}`, message);
  }
}
