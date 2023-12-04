export function keyDownLikeButton(event: React.KeyboardEvent<HTMLElement>) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    event.currentTarget.click()
  }
}