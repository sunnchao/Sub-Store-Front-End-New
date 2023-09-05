declare namespace APIRes {
  type Response<T> = {
    status: "success";
    data: T;
  };
  type Error = {
    status: "failed";
    error: {
      code: string;
      details: string;
      message: string;
      type: string;
    };
  };
}
