import Swal, { SweetAlertOptions } from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// 커스텀 가능한거
export const showAlert = (options: SweetAlertOptions) => {
  return Swal.fire(options);
};

// 확인
export const showConfirmationDialog = async (title: string, text: string) => {
  return Swal.fire({
    title,
    text,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "확인",
    cancelButtonText: "취소"
  });
};

// 경고
export const showWarningDialog = (title: string, text: string) => {
  return Swal.fire({
    icon: "warning",
    title,
    text,
    confirmButtonText: "확인"
  });
};

// 성공
export const showSuccessDialog = (title: string) => {
  return Swal.fire({
    icon: "success",
    title,
    confirmButtonText: "확인"
  });
};

// 에러
export const showErrorDialog = (title: string, text: string) => {
  return Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonText: "확인"
  });
};

// 기프티콘 삭제용
export const showConfirmationDialogWithInput = async (
  title: string,
  text: string,
  inputPlaceholder: string,
  inputValue: string
) => {
  return Swal.fire({
    title,
    text,
    input: "text",
    inputPlaceholder,
    inputValidator: (value) => {
      if (value !== inputValue) {
        return "상품명을 정확히 입력하세요.";
      }
    },
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "확인",
    cancelButtonText: "취소"
  });
};
