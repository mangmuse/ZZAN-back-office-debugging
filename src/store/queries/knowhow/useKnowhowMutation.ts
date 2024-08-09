import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchKnowhow } from "@/apis/knowhow";
import { TStatusResponse } from "@/types/index.type";
import { TKnowhow } from "@/types/knowhow.type";

const useKnowhowMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync: updateKnowhow } = useMutation<TStatusResponse, Error, Partial<TKnowhow>>({
    mutationFn: (updatedKnowhow) => patchKnowhow(updatedKnowhow),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["knowhows"]
      });
      router.push("/knowhow");
    }
  });

  return { updateKnowhow };
};

export default useKnowhowMutation;
