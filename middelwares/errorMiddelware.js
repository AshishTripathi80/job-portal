const errorMiddelware = (err, req, res, next) => {
  console.log(err);
  const defailtErrors = {
    statusCode: 500,
    message: err,
  };
  // missing field error
  if (err.name === "ValidationError") {
    defailtErrors.status = 400;
    defailtErrors.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }

  // duplicate error
  if(err.code && err.code===11000){
    defailtErrors.statusCode=400;
    defailtErrors.message=`${Object.keys(
        err.keyValue
    )} field has to be unique`;
  }

  res.status(defailtErrors.statusCode).json({ message: defailtErrors.message });
};

export default errorMiddelware;
