export class ResponseHandler {
  static success(){
    return ({
      message: 'success',
      requestCode: 1
    })
  }

  static failed(){
    return ({
      message: 'failed',
      requestCode: 0
    })
  }
}