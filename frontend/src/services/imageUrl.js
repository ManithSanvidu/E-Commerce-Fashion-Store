import { API_URL } from "./api";

const fallbackSvg = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">
    <rect width="600" height="800" fill="#171717"/>
    <text x="50%" y="50%" fill="#737373" font-family="Arial, sans-serif" font-size="28" text-anchor="middle">No image</text>
  </svg>`
);

export const fallbackImage = `data:image/svg+xml,${fallbackSvg}`;

export const getImageUrl = (imagePath) => {
  if (!imagePath || typeof imagePath !== "string") return fallbackImage;

  const trimmedPath = imagePath.trim();
  if (!trimmedPath) return fallbackImage;

  if (/^(https?:)?\/\//i.test(trimmedPath) || /^(data|blob):/i.test(trimmedPath)) {
    return trimmedPath;
  }

  const normalizedPath = trimmedPath.startsWith("/") ? trimmedPath : `/${trimmedPath}`;
  return `${API_URL.replace(/\/$/, "")}${normalizedPath}`;
};
