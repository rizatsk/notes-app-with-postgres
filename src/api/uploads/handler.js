class UploadsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUploadImageHandler = this.postUploadImageHandler.bind(this); // bind untuk mengikat this agar isinya tetap sama tidak berubah
  }

  async postUploadImageHandler(request, h) {
    const { data } = request.payload;
    this._validator.validateImageHeaders(data.hapi.headers);

    const fileLocation = await this._service.writeFile(data, data.hapi);

    const response = h.response({
      status: 'success',
      data: {
        // fileLocation: `http://${process.env.HOST}:${process.env.PORT}/upload/images/${filename}`,
        fileLocation,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = UploadsHandler;
