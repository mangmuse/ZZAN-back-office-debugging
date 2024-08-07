import { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CustomInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, name, type = "text", value, onChange, required = false }, ref) => {
    return (
      <div className="mb-4">
        <Label className="block text-gray-700">{label}</Label>
        <Input
          ref={ref}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          required={required}
        />
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
