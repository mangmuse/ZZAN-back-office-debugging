import { createClient } from "@/utils/supabase/server";

export const uploadFileToSupabase = async (
  supabase: ReturnType<typeof createClient>,
  bucketName: string,
  fileName: string,
  file: File
) => {
  return await supabase.storage.from(bucketName).upload(fileName, file, { contentType: file.type });
};
