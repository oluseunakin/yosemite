import {
  ChakraProvider,
  SimpleGrid,
  Text,
  Center,
  Flex,
  Input,
  Heading,
  Container,
  Button,
  HStack,
  VStack,
  Divider,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Pokemon from "./Component/Pokemon";
import _ from "lodash";

function App() {
  const [large] = useMediaQuery("(min-width: 768px)")
  const [search, setSearch] = useState("");
  let oldTeam = localStorage.getItem(navigator.userAgent)
    ? JSON.parse(localStorage.getItem(navigator.userAgent))
    : {};
  const api = "https://pokeapi.co/api/v2/pokemon/";
  const [content, setContent] = useState([]);
  const [team, addTeammate] = useState(oldTeam);
  
  useEffect(() => {
    fetch(api).then((response) => {
      response.json().then((r) => {
        r.results.forEach((poke, i) => {
          fetch(poke.url).then((response) =>
            response
              .json()
              .then((pokemon) => setContent((c) => c.concat(pokemon)))
          );
        });
      });
    });
  }, []);

  return (
    <ChakraProvider>
      <Flex direction="column" p="10">
        <SimpleGrid columns={{ md: 2, sm: 1 }} mb="70">
          <Center>
            <Heading>Welcome Hero</Heading>
          </Center>
          <HStack>
            <Input
              placeholder="Search for Pokemon"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              onClick={async () => {
                const response = await (await fetch(`${api}${search}`)).json();
                setContent(c => [].concat(response));
              }}
            >
              Search
            </Button>
          </HStack>
        </SimpleGrid>
        <SimpleGrid columns={{ md: 3, sm: 1 }} spacing="5">
          <Container>
            {!_.isEmpty(team) ? (
              <>
                <Text fontSize="4xl" style={{textAlign : 'center'}}> My Team</Text>
                {_.values(team).map((t, i) => {
                  return (
                  <Pokemon
                    key={i}
                    pokemon={t}
                    team={team}
                    addTeammate={addTeammate}
                    oldTeam={oldTeam}
                  />
                )})}
              </>
            ) : (
              <Center>
                <Text>You don't have any pokemon in your team. </Text>
              </Center>
            )}
          </Container>
          {large?<Center h='400px'><Divider orientation='vertical'/></Center> : <Divider />}
          
          <VStack>
            <Text fontSize="4xl" style={{textAlign : 'center'}}> Pokemons</Text>
            {content.map((c, i) => (
              <Pokemon
                key={i}
                pokemon={c}
                addTeammate={addTeammate}
                team={team}
                oldTeam={oldTeam}
              />
            ))}
          </VStack>
        </SimpleGrid>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
