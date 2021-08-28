import { Button, Center, HStack, Text, Box, VStack } from "@chakra-ui/react";
import { useState } from "react";
import _ from "lodash";

function Pokemon({ pokemon, team, addTeammate, oldTeam}) {

  const inTeam = _.has(team, pokemon.name)

  function addToTeam(t) {
    if (_.values(team).length < 6) {
      addTeammate({ ...team, [t.name]: t });
      oldTeam[t.name] = t;
      return oldTeam;
    }else { return team }
  }

  function removeFromTeam(t) {
    addTeammate((te) => {
      _.unset(te, t)
      return te;
    });
    delete oldTeam[t];
    return oldTeam;
  }

  const [render, setRender] = useState("");

  return (
    <VStack spacing="5">
      <Center>
        <Text fontSize="4xl" fontWeight="semibold">
          {pokemon.name}
        </Text>
      </Center>
      <HStack>
        <Button
          size="sm"
          onClick={() =>
            setRender(
              <>
                <Center>
                  <Text fontSize="2xl">---------- Abilities ----------</Text>
                </Center>

                {pokemon.abilities.map((ability) => (
                  <>
                    <Text fontSize="xl">{ability.ability.name}</Text>
                    <Text>
                      This ability is {ability.is_hidden ? "" : "not"} hidden
                    </Text>
                  </>
                ))}
              </>
            )
          }
        >
          My Abilities
        </Button>
        <Button
          size="sm"
          onClick={() =>
            setRender(
              <Box>
                <Text>----------Moves----------</Text>
                {pokemon.moves.map((move) => (
                  <Text fontSize="xl">{move.move.name}</Text>
                ))}
              </Box>
            )
          }
        >
          My Moves
        </Button>
        <Button
          size="sm"
          onClick={() =>
            localStorage.setItem(
              navigator.userAgent,
              JSON.stringify(inTeam? removeFromTeam(pokemon.name) : addToTeam(pokemon))
            )
          }
        >
          {inTeam ? "Remove" : "Add"}
        </Button>
      </HStack>
      {render}
    </VStack>
  );
}

export default Pokemon;
