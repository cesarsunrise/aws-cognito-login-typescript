export const errorResponse = (err: Error | string) => {
  let message = "Internal Server Error";
  if (err) {
    if (err instanceof Error) {
      message = err.message || message;
    } else {
      message = err;
    }
  }
  return {
    message,
    errors: [
      {
        message,
      },
    ],
  };
};
