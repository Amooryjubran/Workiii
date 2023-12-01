import { match } from "path-to-regexp";

export function isPathExcluded(currentPath, excludedPaths) {
  return excludedPaths.some((path) => {
    const matcher = match(path);
    return matcher(currentPath);
  });
}
