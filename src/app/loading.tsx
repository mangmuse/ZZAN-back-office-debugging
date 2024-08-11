import LoadingSpinner from "@/components/LoadingSpinner";

function loading() {
  return (
    <div className="flex justify-center items-center w-full h-full ">
      <LoadingSpinner color="text-gray-50" />;
    </div>
  );
}

export default loading;
