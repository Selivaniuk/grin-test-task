import { LocationFilter } from "@/pages/api/location";
import { locationDimensions, locationTypes } from "@/utils/filterValues";
import { HStack, Select } from "@chakra-ui/react";
import { ChangeEvent, FC } from "react";

interface Props {
  handleChangeFilter: (value: string | null, key: keyof LocationFilter) => void;
  filterValue?: LocationFilter;
}
const LocationFilters: FC<Props> = ({ filterValue, handleChangeFilter }) => {
  const handleInputChange = (
    event: ChangeEvent<HTMLSelectElement>,
    key: keyof LocationFilter
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
        value={filterValue?.type ?? ""}
        onChange={(e) => handleInputChange(e, "type")}
        placeholder="Type"
      >
        {locationTypes.map((type) => (
          <option key={type}>{type}</option>
        ))}
      </Select>
      <Select
        value={filterValue?.dimension ?? ""}
        onChange={(e) => handleInputChange(e, "dimension")}
        placeholder="Dimension"
      >
        {locationDimensions.map((dimension) => (
          <option key={dimension}>{dimension}</option>
        ))}
      </Select>
    </HStack>
  );
};

export default LocationFilters;
