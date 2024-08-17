import { CharacterFilter } from "@/pages/api/character";
import {
  characterGenders,
  characterSpecies,
  characterStatuses,
} from "@/utils/filterValues";
import { HStack, Select } from "@chakra-ui/react";
import { ChangeEvent, FC } from "react";

interface Props {
  handleChangeFilter: (value: any, key: keyof CharacterFilter) => void;
  filterValue: CharacterFilter;
}
const CharacterFilters: FC<Props> = ({ filterValue, handleChangeFilter }) => {
  const handleInputChange = (
    event: ChangeEvent<HTMLSelectElement>,
    key: keyof CharacterFilter
  ) => {
    const value = event.target.value;
    if (value) {
      return handleChangeFilter(value, key);
    }
    handleChangeFilter(null, key);
  };

  return (
    <HStack>
      <Select
        value={filterValue.gender ?? ""}
        onChange={(e) => handleInputChange(e, "gender")}
        placeholder="Gender"
      >
        {characterGenders.map((gender) => (
          <option key={gender}>{gender}</option>
        ))}
      </Select>

      <Select
        value={filterValue.status ?? ""}
        onChange={(e) => handleInputChange(e, "status")}
        placeholder="Status"
      >
        {characterStatuses.map((status) => (
          <option key={status}>{status}</option>
        ))}
      </Select>

      <Select
        value={filterValue.species ?? ""}
        onChange={(e) => handleInputChange(e, "species")}
        placeholder="Species"
      >
        {characterSpecies.map((species) => (
          <option key={species}>{species}</option>
        ))}
      </Select>
    </HStack>
  );
};

export default CharacterFilters;
