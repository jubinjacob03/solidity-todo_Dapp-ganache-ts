import type { NextPage } from 'next';
import Head from 'next/head';
import { VStack, HStack, Heading, Text, Button, Input, Box, Spacer, Spinner, useToast } from '@chakra-ui/react';
import React from 'react';
import { load } from '../src/funcs';

const Home: NextPage = () => {
  const [input, setInput] = React.useState<string>('');
  const [refresh, setRefresh] = React.useState<boolean>(true);
  const [addressAccount, setAddressAccount] = React.useState<any>(null);
  const [contract, setContract] = React.useState<any>(null);
  const [tasks, setTasks] = React.useState<any[]>([]);
  const toast = useToast();

  // Handlers
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
    setInput('');
    setRefresh(true);
  };

  const handleToggled = async (id: number) => {
    await contract.toggleCompleted(id, { from: addressAccount });
    setRefresh(true);
  };

  // React useEffect
  React.useEffect(() => {
    if (!refresh) return;
    setRefresh(false);
    load().then((e) => {
      setAddressAccount(e.addressAccount);
      setTasks(e.tasks);
      setContract(e.todoContract);
    });
  });

  return (
    <VStack minH="100vh" justifyContent="center" alignItems="center" bg="gray.50" p={4} >
      <Head>
        <title>Todo List</title>
        <meta name="description" content="Blockchain TodoList." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack spacing={8} w="full" maxW="lg" bg="whiteAlpha.400" p={8} borderRadius="lg" boxShadow="md">
        <Heading as="h1" size="xl" mb={4} color="teal.600">
          Blockchain TodoList
        </Heading>
        <HStack w="full">
          <Input
            type="text"
            size="md"
            placeholder="New Task..."
            onChange={handleInputChange}
            value={input}
            bg="gray.100"
          />
          <Button onClick={handleAddTask} colorScheme="teal">
            ADD
          </Button>
        </HStack>
        <Box w="full">
          <Heading as="h2" size="md" mb={2} color="teal.500">
            To-Do
          </Heading>
          {tasks == null ? (
            <Spinner />
          ) : (
            tasks.map((task, idx) =>
              !task[2] ? (
                <HStack key={idx} w="full" p={2} bg="gray.100" borderRadius="md" mb={2}>
                  <Text>{task[1]}</Text>
                  <Spacer />
                  <Button size="sm" colorScheme="green" onClick={() => handleToggled(task[0].toNumber())}>
                    DONE
                  </Button>
                </HStack>
              ) : null
            )
          )}
        </Box>
        <Box w="full">
          <Heading as="h2" size="md" mb={2} color="teal.500">
            Tasks Done
          </Heading>
          {tasks == null ? (
            <Spinner />
          ) : (
            tasks.map((task, idx) =>
              task[2] ? (
                <HStack key={idx} w="full" p={2} bg="gray.100" borderRadius="md" mb={2}>
                  <Text>{task[1]}</Text>
                  <Spacer />
                  <Button size="sm" colorScheme="red" onClick={() => handleToggled(task[0].toNumber())}>
                    UNDONE
                  </Button>
                </HStack>
              ) : null
            )
          )}
        </Box>
      </VStack>
    </VStack>
  );
};

export default Home;
