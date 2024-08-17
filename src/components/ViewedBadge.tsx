import { useViewedPagesStore } from "@/store/viewedPagesStore";
import { ViewedPageKey } from "@/store/viewedPagesStore/store";
import { Badge } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

interface Props {
  page: ViewedPageKey;
  id: number;
}

const ViewedBadge: FC<Props> = ({ page, id }) => {
  const { isViewedPage } = useViewedPagesStore();
  const [isViewed, setIsViewed] = useState<boolean>(false);

  useEffect(() => {
    setIsViewed(isViewedPage(page, id));
  }, [page, id, isViewedPage]);

  if (!isViewed) return null;
  return <Badge>Viewed</Badge>;
};

export default ViewedBadge;
