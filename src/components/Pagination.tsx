import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Flex, IconButton, Tooltip, Text } from "@chakra-ui/react";

interface Props {
  currentPage?: number;
  changePage: (page: number) => void;
  pageCount?: number;
}

const Pagination: React.FC<Props> = ({
  changePage,
  pageCount = 0,
  currentPage = 1,
}) => {
  const onPrevPage = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 1) {
      return;
    }
    changePage(prevPage);
  };

  const onNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage > pageCount) return;
    changePage(nextPage);
  };

  const gotoPage = (page: number) => {
    if (page > pageCount || page < 1) {
      return;
    }
    changePage(page);
  };

  const canPrevPage = currentPage > 1;
  const canNextPage = currentPage < pageCount;

  if (pageCount < 1) {
    return null;
  }

  return (
    <Flex alignItems="center" gap={8}>
      <Flex>
        <Tooltip label="First Page">
          <IconButton
            aria-label="First Page"
            onClick={() => gotoPage(1)}
            isDisabled={!canPrevPage}
            icon={<ArrowLeftIcon h={3} w={3} />}
            mr={4}
          />
        </Tooltip>
        <Tooltip label="Previous Page">
          <IconButton
            aria-label="Previous Page"
            onClick={onPrevPage}
            isDisabled={!canPrevPage}
            icon={<ChevronLeftIcon h={6} w={6} />}
          />
        </Tooltip>
      </Flex>

      <Flex alignItems="center">
        <Text flexShrink="0">
          Page{" "}
          <Text fontWeight="bold" as="span">
            {currentPage}
          </Text>{" "}
          of{" "}
          <Text fontWeight="bold" as="span">
            {pageCount}
          </Text>
        </Text>
      </Flex>

      <Flex>
        <Tooltip label="Next Page">
          <IconButton
            aria-label="Next Page"
            onClick={onNextPage}
            isDisabled={!canNextPage}
            icon={<ChevronRightIcon h={6} w={6} />}
          />
        </Tooltip>
        <Tooltip label="Last Page">
          <IconButton
            aria-label="Last Page"
            onClick={() => gotoPage(pageCount)}
            isDisabled={!canNextPage}
            icon={<ArrowRightIcon h={3} w={3} />}
            ml={4}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default Pagination;
