import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { connect } from "react-redux";

import store from "../store";
import { setUser } from "../actions";

function Settings() {
  const [formState, setFormState] = React.useState({ name: "" });

  const handleInputChange = (event) => {
    const { name } = event.target;
    setFormState((state) => {
      return {
        ...state,
        name: event.target.value,
      };
    });
  };

  const handleClick = () => {
    console.log("formStateformStateformState", formState);
    store.dispatch(setUser(formState.name));
  };
  // !!! if (!name) show name form
  const { user } = store.getState();
  console.log("wehey\n\n", { user });
  return (
    <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
      <Stack p="4">
        <Heading fontSize={"4xl"}>New User</Heading>
        <Text fontSize={"lg"} color={"gray.600"}>
          give us some deetsyy
        </Text>
      </Stack>
      <Box bg="gray.100" p={8}>
        <Stack spacing={4}>
          <FormControl id="name">
            <FormLabel>name</FormLabel>
            <Input
              name="name"
              type="name"
              value={formState.name}
              onChange={handleInputChange}
            />
          </FormControl>
          {/* <pre dangerouslySetInnerHTML={formState}></pre> */}
          <Stack spacing={10}>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={handleClick}
            >
              OK
            </Button>
            <h1>state.user.name: {user.name}</h1>
            <h1>{__dirname}</h1>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}

const mapStateToProps = function (state) {
  return {
    user: { ...state.user },
  };
};

export default connect(mapStateToProps)(Settings);
