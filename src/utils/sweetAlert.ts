import Swal, { SweetAlertOptions } from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// 커스텀 가능한거
export const displayAlert = (options: SweetAlertOptions) => {
  return Swal.fire(options);
};

// 확인
export const displayConfirmationDialog = async (title: string, text: string) => {
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
export const displayWarningDialog = (title: string, text: string) => {
  return Swal.fire({
    icon: "warning",
    title,
    text,
    confirmButtonText: "확인"
  });
};

// 성공
export const displaySuccessDialog = (title: string) => {
  return Swal.fire({
    icon: "success",
    title,
    confirmButtonText: "확인"
  });
};

// 에러
export const displayErrorDialog = (title: string, text: string) => {
  return Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonText: "확인"
  });
};

// 기프티콘 삭제용

export const displayConfirmationDialogWithInput = async (
  title: string,
  text: string,
  inputPlaceholder: string,
  inputValue: string
) => {
  return Swal.fire({
    title,
    html: text.replace("\n", "<br />"),
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

// 포인트 추가 폼
export const displayAddPointsDialog = async (nickname: string) => {
  const { value: formValues } = await Swal.fire({
    title: "포인트 추가",
    html: `
      <input id="points" class="swal2-input" placeholder="추가할 포인트" type="number" min="1" />
      <input id="reason" class="swal2-input" placeholder="추가 사유" type="text" />
    `,
    confirmButtonText: "추가",
    focusConfirm: false,
    preConfirm: () => {
      const points = (document.getElementById("points") as HTMLInputElement).value;
      const reason = (document.getElementById("reason") as HTMLInputElement).value;
      if (!points || !reason) {
        Swal.showValidationMessage("모든 필드를 입력해주세요.");
        return false;
      }
      return { points, reason };
    },
    icon: "info",
    inputAttributes: {
      autocapitalize: "off"
    }
  });

  return formValues;
};
