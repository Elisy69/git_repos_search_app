export function getLangColor(language: string | null) {
  switch (language) {
    case "JavaScript":
      return "text-yellow-500";
    case "Assembly":
      return "text-green-500";
    case "C":
      return "text-amber-400";
    case "C++":
      return "text-amber-600";
    case "Python":
      return "text-blue-500";
    case "TypeScript":
      return "text-cyan-500";
    case "Rust":
      return "text-red-500";
    case "Ruby":
      return "text-red-200";
    case "Java":
      return "text-amber-400";
    default:
      return "";
  }
}
