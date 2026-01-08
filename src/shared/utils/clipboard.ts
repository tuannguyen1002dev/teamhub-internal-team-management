// shared/utils/copyToClipboard.ts
export default function copyToClipboard(text: string): Promise<boolean> {
  return navigator.clipboard.writeText(text)
    .then(() => true)
    .catch(() => false)
}
