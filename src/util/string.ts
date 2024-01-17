export abstract class StringUtil {
  static camelCase(str: string): string {
    let words = str.split("-");
    if (words.length === 1) {
      words = str.split("_");
    }
    const capitalized = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalized.join("");
  }

  static lowerCase(str: string): string {
    str = this.camelCase(str);
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  static snakeCase(str: string): string {
    return str.replace(/([A-Z])/g, "_$1").toLowerCase();
  }

  static kebabCase(str: string): string {
    return str.replace(/([A-Z])/g, "-$1").toLowerCase();
  }
}
