export const smartNotification = (message: string) => {
  const event = new CustomEvent('smartNotification', {
    detail: {
      message,
    }
  });
  window.dispatchEvent(event);
};