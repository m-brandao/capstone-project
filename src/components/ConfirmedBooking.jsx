import {
  Box,
  Center,
  Container,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import React from "react";

import "../styles/ConfirmedBooking.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function ConfirmedBooking() {
  return (
    <Container id="confirmation-book" maxW="container.xl" centerContent>
      <Stack direction={["row", "column"]}>
        <Box>
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            {" "}
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />{" "}
            <path
              className="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>

          <Box>
            <Center>
              <Heading as={"h1"} size={"4xl"}>
                All done!
              </Heading>
            </Center>
            <Center pt={"10px"}>
              <Text as={"p"}>We can’t wait to serve you. See you soon</Text>
            </Center>
            <Center mt={"10px"}>
              <ChakraLink id="go-back" as={ReactRouterLink} to={"/"}>
                <FontAwesomeIcon icon={faArrowLeft} size="xs" /> Back home
              </ChakraLink>
            </Center>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
}
