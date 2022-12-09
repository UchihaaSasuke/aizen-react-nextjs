import styled from "@emotion/styled";
import { CssBaseline } from "@material-ui/core";

import PokemonInfo from "../components/PokemonInfo";
import PokemonFilter from "../components/PokemonFilter";
import PokemonTable from "../components/PokemonTable";
import store from "../src/store";

const Title = styled.h1`
  text-align: center;
`;
const PageContainer = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1em;
`;
const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
  grid-column-gap: 1rem;
`;

export async function getServerSideProps() {
  const pokemon = await (
    await fetch("http://localhost:3000/pokemon.json")
  ).json();
  return {
    props: {
      pokemon,
    }, // will be passed to the page component as props
  };
}

export default function Home({ pokemon }) {
  store.setPokemon(pokemon);
  return (
    <PageContainer>
      <CssBaseline />
      <Title>Pokemon Search</Title>
      <TwoColumnLayout>
        <div>
          <PokemonFilter />
          <PokemonTable />
        </div>
        {/* {selectedPokemon && <PokemonInfo />} */}
        <PokemonInfo />
      </TwoColumnLayout>
    </PageContainer>
  );
}
