import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";

type Props = {
  deafaultOption: string;
  allOptions: string[];
  value: string;
  onChange: (value: string) => void;
};

const Budgetdropdown = ({ deafaultOption, allOptions, value, onChange }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='border-gray-300 border-[1px] w-[80%] cursor-pointer text-sm'>
        <div className="cursor-pointer flex justify-center items-center gap-2 mt-2 rounded-md">
          <p className="leading-7">{value || deafaultOption}</p>
          <IoIosArrowDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[160px] rounded-md">
        {allOptions.map((option, key) => (
          <DropdownMenuItem
            key={key}
            onClick={() => onChange(option)}
            className='cursor-pointer w-[240px] py-[6px] px-3'
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
 
export default Budgetdropdown