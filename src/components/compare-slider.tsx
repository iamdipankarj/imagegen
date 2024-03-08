import { cn } from "@/lib/utils";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

interface CompareSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  original: string;
  restored: string;
}

export const CompareSlider = ({
  original,
  restored,
  className
}: CompareSliderProps) => {
  return (
    <ReactCompareSlider
      className={cn("flex w-full", className)}
      itemOne={<ReactCompareSliderImage src={original} alt="original photo" />}
      itemTwo={<ReactCompareSliderImage src={restored} alt="restored photo" />}
      portrait
    />
  );
};
