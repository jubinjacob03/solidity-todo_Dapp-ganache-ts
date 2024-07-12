import { NextPage } from "next";
import Head from "next/head";
import {
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Input,
  Box,
  Spacer,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { load } from "../src/funcs";

const Home: NextPage = () => {
  const [input, setInput] = React.useState<string>("");
  const [refresh, setRefresh] = React.useState<boolean>(true);
  const [addressAccount, setAddressAccount] = React.useState<any>(null);
  const [contract, setContract] = React.useState<any>(null);
  const [tasks, setTasks] = React.useState<any[]>([]);
  const toast = useToast();

  const handleInputChange = (e: any) => setInput(e.currentTarget.value);

  const handleAddTask = async () => {
    if (!input) {
      toast({
        title: "Task cannot be empty.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    await contract.createTask(input, { from: addressAccount });
    setInput("");
    setRefresh(true);
  };

  const handleToggled = async (id: number) => {
    await contract.toggleCompleted(id, { from: addressAccount });
    setRefresh(true);
  };

  React.useEffect(() => {
    if (!refresh) return;
    setRefresh(false);
    load().then((e) => {
      setAddressAccount(e.addressAccount);
      setTasks(e.tasks);
      setContract(e.todoContract);
    });
  });

  if (!addressAccount) {
    return (
      <VStack
        minH="100vh"
        justifyContent="center"
        alignItems="center"
        bg="gray.50"
        p={4}
        style={{
          backgroundImage: "url(/background.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Spinner size="xl" />
        <Text mt={4}>Waiting for MetaMask login...</Text>
      </VStack>
    );
  }

  return (
    <VStack
      minH="100vh"
      justifyContent="center"
      alignItems="center"
      bg="gray.50"
      p={4}
      style={{
        backgroundImage: "url(/background.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Head>
        <title>Todo List</title>
        <meta name="description" content="Blockchain TodoList." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <VStack
          spacing={8}
          w="full"
          maxW="xl"
          bg="whiteAlpha.200"
          p={12}
          borderRadius="lg"
          boxShadow="md"
        >
          <Heading as="h1" size="xl" mb={4} color="gray.200">
            Blockchain TODO
          </Heading>
          <HStack w="full">
            <Input
              type="text"
              size="md"
              placeholder="New Task..."
              onChange={handleInputChange}
              value={input}
              bg="gray.100"
              borderRadius={18}
              focusBorderColor="transparent"
            />
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                onClick={handleAddTask}
                colorScheme="purple"
                borderRadius={12}
                _focus={{ boxShadow: "none" }}
              >
                ADD
              </Button>
            </motion.div>
          </HStack>
          <Box w="full">
            <Heading as="h2" size="md" mb={2} color="gray.200">
              TODO
            </Heading>
            {tasks == null ? (
              <Spinner />
            ) : (
              tasks.map((task, idx) =>
                !task[2] ? (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <HStack
                      w="full"
                      py={2}
                      px={4}
                      bg="gray.100"
                      borderRadius={22}
                      mb={2}
                    >
                      <Text>{task[1]}</Text>
                      <Spacer />
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          colorScheme="green"
                          onClick={() => handleToggled(task[0].toNumber())}
                          borderRadius={18}
                          _focus={{ boxShadow: "none" }}
                        >
                          DONE
                        </Button>
                      </motion.div>
                    </HStack>
                  </motion.div>
                ) : null
              )
            )}
          </Box>
          <Box w="full">
            <Heading as="h2" size="md" mb={2} color="gray.200">
              COMPLETED
            </Heading>
            {tasks == null ? (
              <Spinner />
            ) : (
              tasks.map((task, idx) =>
                task[2] ? (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <HStack
                      w="full"
                      py={2}
                      px={4}
                      bg="gray.100"
                      borderRadius={22}
                      mb={2}
                    >
                      <Text>{task[1]}</Text>
                      <Spacer />
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          colorScheme="red"
                          onClick={() => handleToggled(task[0].toNumber())}
                          borderRadius={18}
                          _focus={{ boxShadow: "none" }}
                        >
                          UNDO
                        </Button>
                      </motion.div>
                    </HStack>
                  </motion.div>
                ) : null
              )
            )}
          </Box>
        </VStack>
      </motion.div>
    </VStack>
  );
};

export default Home;
