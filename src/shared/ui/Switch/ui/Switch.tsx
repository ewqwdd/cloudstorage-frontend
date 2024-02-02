import HStack from "../../HStack";

export interface SwitchProps<T extends string[]> {
  values: T;
  current: T[number];
  onValueChange?: (elem: T[number]) => void;
  className?: string;
}

export default function Switch<T extends string[]>({
  current,
  values,
  onValueChange,
  className,
}: SwitchProps<T>) {
  return (
    <HStack className={className}>
      {values.map((elem) => (
        <button
          key={elem}
          className={
            (elem !== current
              ? "bg-cyan-900 text-slate-100 border-cyan-950 border-b-4"
              : "bg-cyan-800 text-slate-300") + " text-lg font-medium p-3"
          }
          onClick={() => onValueChange?.(elem)}
        >
          {elem}
        </button>
      ))}
    </HStack>
  );
}
