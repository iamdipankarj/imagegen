import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface SelectProps extends HTMLAttributes<HTMLLabelElement> {
  value: string | number
  options: Array<string | number>
  onValueChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  disabled?: boolean
  description: string
  label: string
}

export function Select({
  className,
  label,
  onValueChange,
  options,
  description,
  disabled = false,
  value,
  ...props
}: SelectProps) {
  return (
    <label className={cn("form-control w-full space-y-4 block")} {...props}>
      <div className="text-sm mb-1">
        <span className="label-text font-semibold">{label}</span>
      </div>
      <select value={value} onChange={onValueChange} className="select w-full select-bordered disabled:bg-zinc-200 disabled:border-none" disabled={disabled}>
        {options.map((item, index) => (
          <option value={item} key={index}>{item}</option>
        ))}
      </select>
      <div className="text-sm label-text-alt whitespace-break-spaces">
        {description}
      </div>
    </label>
  )
}
