export function focusElement(element, focusedStyle) {
  element.focus();
  element.classList.add(focusedStyle);
}

export function unfocusElement(element, focusedStyle) {
  element.classList.remove(focusedStyle);
}
