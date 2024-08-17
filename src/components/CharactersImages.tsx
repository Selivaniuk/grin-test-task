import { Episode } from "@/pages/api/episode";
import { Location } from "@/pages/api/location";
import { CharactersImages } from "@/utils";
import { HStack, SkeletonCircle, Tooltip } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

interface Props {
  characters: Episode["characters"] | Location["residents"];
  charactersImages?: CharactersImages;
  isLoading?: boolean;
}
const CharacterImageList: FC<Props> = ({
  characters,
  charactersImages,
  isLoading,
}) => {
  const router = useRouter();
  const ids = characters.slice(0, 4).map((url) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  });

  if (isLoading) {
    return (
      <HStack>
        <SkeletonCircle size="20" />
        <SkeletonCircle size="20" />
        <SkeletonCircle size="20" />
        <SkeletonCircle size="20" />
      </HStack>
    );
  }
  if (!charactersImages || ids.length === 0) {
    return null;
  }

  return (
    <HStack>
      {ids.map((id) => {
        return (
          <Tooltip key={id} label={charactersImages[id].name}>
            <Link href={`/character/${id}`}>
              <Image
                style={{ borderRadius: "50%" }}
                width={80}
                height={80}
                src={charactersImages[id].url}
                alt={charactersImages[id].name}
              />
            </Link>
          </Tooltip>
        );
      })}
    </HStack>
  );
};

export default CharacterImageList;
