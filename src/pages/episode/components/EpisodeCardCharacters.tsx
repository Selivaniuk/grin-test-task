import { Episode } from "@/pages/api/episode";
import { HStack } from "@chakra-ui/react";
import Image from "next/image";
import { FC } from "react";

export type CharactersImages = Record<string, { url: string; name: string }>;

interface Props {
  characters: Episode["characters"];
  charactersImages?: CharactersImages;
}
const EpisodeCardCharacters: FC<Props> = ({ characters, charactersImages }) => {
  const ids = characters.slice(0, 4).map((url) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  });

  if (!charactersImages) {
    return null;
  }

  return (
    <HStack>
      {ids.map((id) => {
        return (
          <Image
            key={id}
            width={80}
            height={80}
            src={charactersImages[id].url}
            alt={charactersImages[id].name}
          />
        );
      })}
    </HStack>
  );
};

export default EpisodeCardCharacters;
