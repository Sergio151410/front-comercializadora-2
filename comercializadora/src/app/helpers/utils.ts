import Swal from "sweetalert2";

export default class Utils {
  constructor() {}
  static showCustomNotification(title, text, type) {
    Swal.fire({
      title: title,
      text: text,
      icon: type,
      timer: 2000,
      showConfirmButton: false
    });
  }
  static showSuccessNotification(text) {
    Swal.fire({
      title: "Exito",
      text: text,
      icon: "success",
      timer: 1500,
      showConfirmButton: false
    });
  }
  static showErrorNotification(text) {
    Swal.fire({
      title: "Error",
      text: text,
      icon: "error",
      timer: 1500,
      showConfirmButton: false
    });
  }
  static showWarningNotification(text) {
    Swal.fire({
      title: "Advertencia",
      text: text,
      icon: "warning",
      timer: 1500,
      showConfirmButton: false
    });
  }
  static showInformationNotification(title, text) {
    Swal.fire({
      title: title,
      text: text,
      icon: "info",
      timer: 1500,
      showConfirmButton: false
    });
  }
  static showCancelNotification(text) {
    Swal.fire({
      title: "Cancelado",
      text: text,
      icon: "error",
      timer: 1500,
      showConfirmButton: false
    });
  }
  static getApiUrl() {
    return "http://localhost:8080/api/";
  }
}
