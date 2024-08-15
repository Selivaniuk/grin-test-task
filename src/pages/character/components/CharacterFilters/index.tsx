import {
  CharacterFilter,
  characterGenders,
  characterStatuses,
} from "@/pages/api/character";
import { HStack, Select } from "@chakra-ui/react";
import { ChangeEvent, FC } from "react";

interface Props {
  handleChangeFilter: (value: any, key: keyof CharacterFilter) => void;
  initialFilters: CharacterFilter;
}
const CharacterFilters: FC<Props> = ({
  initialFilters,
  handleChangeFilter,
}) => {
  const handleGenderChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value) {
      return handleChangeFilter(value, "gender");
    }
    handleChangeFilter(null, "gender");
  };

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value) {
      return handleChangeFilter(value, "status");
    }
    handleChangeFilter(null, "status");
  };

  return (
    <HStack>
      <Select
        defaultValue={initialFilters.gender ?? undefined}
        onChange={handleGenderChange}
        placeholder="Gender"
      >
        {characterGenders.map((gender) => (
          <option key={gender}>{gender}</option>
        ))}
      </Select>

      <Select
        defaultValue={initialFilters.status ?? undefined}
        onChange={handleStatusChange}
        placeholder="Status"
      >
        {characterStatuses.map((status) => (
          <option key={status}>{status}</option>
        ))}
      </Select>
    </HStack>
  );
};

export default CharacterFilters;
