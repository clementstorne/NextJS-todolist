import { Flex, Heading, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <>
      <Flex p="2rem" direction="column" alignItems="center">
        <Heading as="h1" size="4xl" noOfLines={1} className="tasklist-title">
          TodoList
        </Heading>
        <Text mt="1rem" className="tasklist-slogan">
          La célèbre application de TodoList codée avec Next.js, TypeScript et
          MongoDB
        </Text>
      </Flex>
    </>
  );
};

export default Header;
